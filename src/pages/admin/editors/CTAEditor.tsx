import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

const CTAEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-cta"],
    queryFn: async () => {
      const { data } = await supabase.from("prefooter_cta").select("*").single();
      return data;
    },
  });

  const [form, setForm] = useState({ heading: "", description: "", cta_text: "", cta_link: "" });

  useEffect(() => {
    if (data) setForm({ heading: data.heading || "", description: data.description || "", cta_text: data.cta_text || "", cta_link: data.cta_link || "" });
  }, [data]);

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("prefooter_cta").update(form).eq("id", data!.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cta"] }); toast.success("CTA updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Pre-Footer CTA</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <div><label className="block text-sm font-semibold text-foreground mb-1.5">Heading</label>
          <input value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label className="block text-sm font-semibold text-foreground mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-foreground mb-1.5">CTA Text</label>
            <input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-semibold text-foreground mb-1.5">CTA Link</label>
            <input value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
        </div>
        <button onClick={() => mutation.mutate()} disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors disabled:opacity-50">
          <Save size={16} /> {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CTAEditor;
