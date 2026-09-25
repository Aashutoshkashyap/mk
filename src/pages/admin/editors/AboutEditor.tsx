import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useRef } from "react";
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

  const defaultAbout = {
    heading: "Engineering Nepal's Infrastructure Since 2018",
    subheading: "Formerly known as M.K. Builders & Construction Company Private Limited",
    description: "MK Construction Company Pvt. Ltd. (formerly M.K. Builders & Construction Company Private Limited) is a premier Class-A licensed contractor certified under ISO 9001:2015. Operating across 32 districts of Nepal, we specialize in high-capacity national highway packages, multi-span river bridges, flood mitigation river training, institutional buildings to Nepal Building Code (NBC), hydropower civil headworks, and municipal bulk water supply networks. Backed by an in-house heavy equipment fleet and over 850 engineers and technicians, we deliver complex infrastructure with total accountability.",
    image_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200",
    vision_title: "Our Strategic Vision",
    vision_text: "To be the most respected and technically capable infrastructure organization in Nepal, setting national benchmarks for quality, engineering discipline, and sustainable construction in every district we serve.",
    mission_title: "Our Operating Mission",
    mission_text: "To engineer enduring national assets through rigorous technical compliance, Zero-Harm safety standards, transparent public-sector partnerships, and continuous investment in heavy machinery and local engineering talent."
  };

  const [form, setForm] = useState(defaultAbout);

  const initialized = useRef(false);
  useEffect(() => {
    if (data && !initialized.current) {
      initialized.current = true;
      setForm({
        heading: data.heading || defaultAbout.heading,
        subheading: data.subheading || defaultAbout.subheading,
        description: data.description || defaultAbout.description,
        image_url: data.image_url || defaultAbout.image_url,
        vision_title: data.vision_title || defaultAbout.vision_title,
        vision_text: data.vision_text || defaultAbout.vision_text,
        mission_title: data.mission_title || defaultAbout.mission_title,
        mission_text: data.mission_text || defaultAbout.mission_text,
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async ({ payload, id }: { payload: typeof form, id?: string }) => {
      const { error } = await supabase
        .from("about_section")
        .upsert({ 
          ...(id ? { id } : {}),
          ...payload 
        });
      if (error) throw error;
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ["admin-about"] }); 
      toast.success("About section updated!"); 
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading && !data) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;
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
        <button onClick={() => mutation.mutate({ payload: form, id: data?.id })} disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors disabled:opacity-50">
          <Save size={16} /> {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;
