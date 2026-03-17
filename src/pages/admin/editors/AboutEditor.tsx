import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

const AboutEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-about"],
    queryFn: async () => {
      const { data } = await supabase.from("about_section").select("*").single();
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
      const { error } = await supabase.from("about_section").update(form).eq("id", data!.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-about"] }); toast.success("About section updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">About Section</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        {[
          { label: "Heading", key: "heading" },
          { label: "Subheading", key: "subheading" },
          { label: "Image URL", key: "image_url" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
            <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        ))}
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
