import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

const HeroEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hero_section").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({ title: "", subtitle: "", description: "", cta_text: "", cta_link: "", secondary_cta_text: "", secondary_cta_link: "" });

  useEffect(() => {
    if (data) setForm({
      title: data.title || "", subtitle: data.subtitle || "", description: data.description || "",
      cta_text: data.cta_text || "", cta_link: data.cta_link || "",
      secondary_cta_text: data.secondary_cta_text || "", secondary_cta_link: data.secondary_cta_link || "",
    });
  }, [data]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (data?.id) {
        const { error } = await supabase.from("hero_section").update(form).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("hero_section").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-hero"] }); toast.success("Hero updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;
  if (error) return <div className="p-4 text-destructive text-sm rounded-xl bg-destructive/10">Failed to load: {(error as any).message}</div>;

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Hero Section</h2>
      {!data && <p className="text-sm text-amber-500 mb-4">No data yet — fill in the fields and click Save to create the hero section.</p>}
      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Field label="Subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} />
        <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
        <div className="grid grid-cols-2 gap-4">
          <Field label="CTA Text" value={form.cta_text} onChange={(v) => setForm({ ...form, cta_text: v })} />
          <Field label="CTA Link" value={form.cta_link} onChange={(v) => setForm({ ...form, cta_link: v })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Secondary CTA Text" value={form.secondary_cta_text} onChange={(v) => setForm({ ...form, secondary_cta_text: v })} />
          <Field label="Secondary CTA Link" value={form.secondary_cta_link} onChange={(v) => setForm({ ...form, secondary_cta_link: v })} />
        </div>
        <button onClick={() => mutation.mutate()} disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors disabled:opacity-50">
          <Save size={16} /> {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
    {textarea ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    ) : (
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    )}
  </div>
);

export default HeroEditor;
