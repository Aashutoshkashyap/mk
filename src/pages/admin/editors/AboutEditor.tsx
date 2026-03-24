import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

const AboutEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-about"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_section").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({ heading: "", subheading: "", description: "", image_url: "", vision_title: "", vision_text: "", mission_title: "", mission_text: "" });

  useEffect(() => {
    if (data) setForm({
      heading: data.heading || "", subheading: data.subheading || "", description: data.description || "",
      image_url: data.image_url || "", vision_title: data.vision_title || "", vision_text: data.vision_text || "",
      mission_title: data.mission_title || "", mission_text: data.mission_text || "",
    });
  }, [data]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (data?.id) {
        const { error } = await supabase.from("about_section").update(form).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_section").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-about"] }); toast.success("About section updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;
  if (error) return <div className="p-4 text-destructive text-sm rounded-xl bg-destructive/10">Failed to load: {(error as any).message}</div>;

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">About Section</h2>
      {!data && <p className="text-sm text-amber-500 mb-4">No data yet — fill in the fields and click Save to create the about section.</p>}
      <div className="rounded-2xl bg-card border border-border p-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Heading</label>
              <input value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })}
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Subheading</label>
              <input value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })}
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div>
            <ImageUpload 
              label="About Section Image" 
              value={form.image_url} 
              onChange={(url) => setForm({ ...form, image_url: url })} 
              folder="about"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
            className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Vision Title</label>
            <input value={form.vision_title} onChange={(e) => setForm({ ...form, vision_title: e.target.value })}
              className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Mission Title</label>
            <input value={form.mission_title} onChange={(e) => setForm({ ...form, mission_title: e.target.value })}
              className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Vision Text</label>
          <textarea value={form.vision_text} onChange={(e) => setForm({ ...form, vision_text: e.target.value })} rows={3}
            className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Mission Text</label>
          <textarea value={form.mission_text} onChange={(e) => setForm({ ...form, mission_text: e.target.value })} rows={3}
            className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button onClick={() => mutation.mutate()} disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors disabled:opacity-50">
          <Save size={16} /> {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;
