import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Globe, Image as ImageIcon, Link as LinkIcon, Info } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

const SettingsEditor = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    company_name: "",
    logo_url: "",
    favicon_url: "",
  });

  const initialized = useRef(false);
  useEffect(() => {
    if (settings && !initialized.current) {
      initialized.current = true;
      setForm({
        company_name: settings.company_name || "",
        logo_url: settings.logo_url || "",
        favicon_url: settings.favicon_url || "",
      });
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (values: typeof form) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          id: "00000000-0000-0000-0000-000000000000",
          ...values
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Settings updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update settings");
    },
  });

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive flex items-start gap-4">
        <Globe className="h-6 w-6 shrink-0" />
        <div>
          <h3 className="font-bold">Database Error</h3>
          <p className="text-sm opacity-90">Could not load site settings. Make sure to run the migration script.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-primary flex items-center gap-2">
          <Globe className="h-5 w-5 text-brand-blue" />
          Site Settings
        </h2>
        <button
          onClick={() => updateMutation.mutate(form)}
          disabled={updateMutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50"
        >
          <Save size={16} /> {updateMutation.isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              Company Name
            </label>
            <input
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Sharp Edge Business Solutions"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-2">
            <ImageUpload 
              label="Company Logo" 
              value={form.logo_url} 
              onChange={(url) => setForm({ ...form, logo_url: url })} 
              folder="settings"
            />
            <ImageUpload 
              label="Favicon" 
              value={form.favicon_url} 
              onChange={(url) => setForm({ ...form, favicon_url: url })} 
              folder="settings"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-brand-blue/5 border border-brand-blue/10 p-6">
          <h3 className="text-sm font-bold text-brand-blue flex items-center gap-2 mb-3">
            <Info className="h-4 w-4" /> Asset Management Help
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Need to host new images? You can upload your images to a service like <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">Postimages</a> or <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">ImgBB</a> and paste the <strong>Direct Link</strong> here. 
            <br /><br />
            For icons, we recommend using <strong>SVG</strong> format for the best performance and clarity at any size.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor;
