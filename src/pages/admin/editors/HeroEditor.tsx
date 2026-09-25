import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

const HeroEditor = () => {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hero_section").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const defaultHero = {
    title: "Pioneering Nepal's Critical Infrastructure & Modern Landmarks.",
    description: "Tier-1 General Contracting and Civil Infrastructure engineering. From arterial national highway corridors and long-span river bridges to hydraulic river training and civic complexes, MK Engineering and Construction builds with uncompromised precision and Zero-Harm safety standards across Nepal.",
    cta_text: "Explore Our Projects",
    cta_link: "/projects",
    secondary_cta_text: "Engineering Verticals",
    secondary_cta_link: "/services",
    image_url: "/images/hero.jpg"
  };

  const [form, setForm] = useState(defaultHero);

  const initialized = useRef(false);
  useEffect(() => {
    if (data && !initialized.current) {
      initialized.current = true;
      setForm({
        title: data.title || defaultHero.title,
        description: data.description || defaultHero.description,
        cta_text: data.cta_text || defaultHero.cta_text,
        cta_link: data.cta_link || defaultHero.cta_link,
        secondary_cta_text: data.secondary_cta_text || defaultHero.secondary_cta_text,
        secondary_cta_link: data.secondary_cta_link || defaultHero.secondary_cta_link,
        image_url: (data as any).image_url || defaultHero.image_url
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async ({ payload, id }: { payload: typeof form, id?: string }) => {
      const { error } = await supabase
        .from("hero_section")
        .upsert({ 
          ...(id ? { id } : {}),
          ...payload,
          subtitle: "",
        });
      if (error) throw error;
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ["admin-hero"] }); 
      toast.success("Hero updated!"); 
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading && !data) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;
  if (error) return <div className="p-4 text-destructive text-sm rounded-xl bg-destructive/10">Failed to load: {(error as any).message}</div>;

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Hero Section</h2>
      {!data && <p className="text-sm text-amber-500 mb-4">No data yet — fill in the fields and click Save to create the hero section.</p>}
      <div className="rounded-2xl bg-card border border-border p-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Field label="Headline / Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
          </div>
          <div className="space-y-4">
            <ImageUpload
              label="Hero Image (Optional)"
              value={form.image_url}
              onChange={(url) => setForm({ ...form, image_url: url })}
              folder="hero"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary CTA Text" value={form.cta_text} onChange={(v) => setForm({ ...form, cta_text: v })} />
          <Field label="Primary CTA Link" value={form.cta_link} onChange={(v) => setForm({ ...form, cta_link: v })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Secondary CTA Text" value={form.secondary_cta_text} onChange={(v) => setForm({ ...form, secondary_cta_text: v })} />
          <Field label="Secondary CTA Link" value={form.secondary_cta_link} onChange={(v) => setForm({ ...form, secondary_cta_link: v })} />
        </div>
        <button
          onClick={() => mutation.mutate({ payload: {
            title: form.title,
            description: form.description,
            cta_text: form.cta_text,
            cta_link: form.cta_link,
            secondary_cta_text: form.secondary_cta_text,
            secondary_cta_link: form.secondary_cta_link,
            image_url: form.image_url,
          }, id: data?.id })}
          disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors disabled:opacity-50"
        >
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
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={4}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    ) : (
      <input value={value || ""} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    )}
  </div>
);

export default HeroEditor;
