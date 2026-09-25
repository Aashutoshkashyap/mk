import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2, Quote, User, Layout } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

const defaultTestimonials = [
  {
    id: "t1",
    name: "Er. Ramesh Adhikari",
    role: "Senior Division Engineer, Project Directorate",
    company: "Department of Roads (DoR), Nepal",
    content: "MK Construction demonstrated exceptional engineering rigor on the Mid-Hill Highway upgrade. Managing rock excavation, deep retaining structures, and asphalt paving under tight pre-monsoon deadlines was executed flawlessly with their captive heavy equipment fleet.",
    rating: 5,
    project: "Mid-Hill Highway Pkg 7",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    sort_order: 0,
  },
  {
    id: "t2",
    name: "Sunil Shrestha",
    role: "Director of Infrastructure Development",
    company: "Provincial Ministry of Physical Infrastructure, Koshi",
    content: "The Saptakoshi River Bridge foundation was one of the most technically challenging caisson-sinking assignments in the region. MK Construction's engineering team deployed precision hydraulic equipment, completing all 12 pier caissons ahead of the flood season.",
    rating: 5,
    project: "Saptakoshi River Bridge",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    sort_order: 1,
  },
  {
    id: "t3",
    name: "Bikash Thapa",
    role: "Project Manager, Hydraulic Works Division",
    company: "Bagmati Basin Flood Mitigation Project",
    content: "The 18-kilometer flood mitigation dyke and guided spurs built by MK Construction protected vulnerable settlements during the 2024 monsoon flood surge. Their quality control on gabions, geotextile layers, and RCC structures is exemplary.",
    rating: 5,
    project: "Bagmati River Training",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    sort_order: 2,
  },
  {
    id: "t4",
    name: "Dipendra Sharma",
    role: "Chief Technical Officer",
    company: "Himalayan Power Developers Ltd.",
    content: "For our run-of-river civil package, MK Construction self-performed the headworks weir and 3.8km tunnel excavation with zero safety incidents. Their zero-harm HSE governance and schedule transparency set a benchmark for hydropower contracting in Nepal.",
    rating: 5,
    project: "Upper Trishuli Civil Package",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    sort_order: 3,
  },
  {
    id: "t5",
    name: "Er. Anita Gurung",
    role: "Lead Structural Consultant",
    company: "National Building Design Bureau",
    content: "Working alongside MK Construction on seismic institutional facilities has been seamless. Their strict adherence to NBC 105:2020 and thorough QA/QC concrete testing guarantees uncompromised structural longevity.",
    rating: 5,
    project: "Provincial HQ Complex",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    sort_order: 4,
  },
];

const TestimonialsEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [sectionMeta, setSectionMeta] = useState({ title: "", description: "", review_count: 2578, rating: 5.0 });
  const editFormSeeded = useRef<string | null>(null);

  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const { data: fetchedSectionMeta }: any = useQuery({
    queryKey: ["testimonials-section-meta"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials_section" as any).select("*").limit(1).maybeSingle();
      return data;
    },
  });

  const metaInitialized = useRef(false);
  useEffect(() => {
    if (fetchedSectionMeta && !metaInitialized.current) {
      metaInitialized.current = true;
      setSectionMeta({
        title: fetchedSectionMeta.title || "Endorsements & Performance Feedback",
        description: fetchedSectionMeta.description || "Trusted by government ministries, municipal departments, multilateral funding agencies, and tier-1 infrastructure developers across Nepal.",
        review_count: fetchedSectionMeta.review_count || 2578,
        rating: fetchedSectionMeta.rating || 5.0,
      });
    }
  }, [fetchedSectionMeta]);

  const formatError = (e: any) => {
    if (e.message?.includes("new row violates row level security policy") || e.code === "42501") {
      return "Permission Denied: You must be an 'admin' to perform this action. Please follow the SQL instructions to grant yourself access.";
    }
    return e.message || "An unexpected error occurred.";
  };

  const updateSectionMutation = useMutation({
    mutationFn: async (updated: any) => {
      const { error } = await supabase
        .from("testimonials_section" as any)
        .upsert({ 
          ...(fetchedSectionMeta?.id ? { id: fetchedSectionMeta.id } : {}),
          ...updated 
        });
      
      if (error) {
        if (error.code === "42P01") throw new Error("Missing Table: Please run the SQL migration script.");
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials-section-meta"] });
      toast.success("Section settings updated");
    },
    onError: (e: any) => toast.error(formatError(e))
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const newOrder = displayTestimonials.length > 0 ? Math.max(...displayTestimonials.map((t: any) => t.sort_order ?? 0)) + 1 : 0;
      const { error, data } = await supabase.from("testimonials").insert([
        { name: "John Doe", role: "Manager", content: "Great service!", sort_order: newOrder }
      ]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditingId(data.id);
      toast.success("Testimonial added");
    },
    onError: (e: any) => toast.error(formatError(e))
  });

  const updateMutation = useMutation({
    mutationFn: async (updated: any) => {
      const { id, created_at, ...cleanData } = updated;
      const isCustomId = typeof id === "string" && id.startsWith("t");
      const { error } = await supabase.from("testimonials").upsert({
        ...(isCustomId ? {} : { id }),
        ...cleanData
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial saved!");
    },
    onError: (e: any) => toast.error(formatError(e))
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
    },
    onError: (e: any) => toast.error(formatError(e))
  });

  useEffect(() => {
    if (editingId) {
      if (editFormSeeded.current !== editingId) {
        const t = displayTestimonials.find((item: any) => item.id === editingId);
        if (t) {
          setEditForm({ ...t });
          editFormSeeded.current = editingId;
        }
      }
    } else {
      setEditForm(null);
      editFormSeeded.current = null;
    }
  }, [editingId, displayTestimonials]);

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive flex items-start gap-4">
        <Quote className="h-6 w-6 shrink-0" />
        <div>
          <h3 className="font-bold">Database Error</h3>
          <p className="text-sm opacity-90">Could not load testimonials. Make sure to run the migration script.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading testimonials...</div>;

  return (
    <div className="space-y-12">
      {/* Section Global Settings */}
      <section className="space-y-6 bg-secondary/20 p-6 rounded-2xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Layout className="text-brand-blue" size={20} />
          <h2 className="text-xl font-bold font-display text-primary">Section Settings</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Section Title</label>
            <input 
              value={sectionMeta.title} 
              onChange={(e) => setSectionMeta({ ...sectionMeta, title: e.target.value })}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm shadow-sm" 
              placeholder="What our happy clients say!"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Section Description</label>
            <input 
              value={sectionMeta.description} 
              onChange={(e) => setSectionMeta({ ...sectionMeta, description: e.target.value })}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm shadow-sm" 
              placeholder="Experience the Sharp Edge difference..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Review Count</label>
            <input 
              type="number"
              value={sectionMeta.review_count} 
              onChange={(e) => setSectionMeta({ ...sectionMeta, review_count: parseInt(e.target.value) || 0 })}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm shadow-sm" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Average Rating</label>
            <input 
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={sectionMeta.rating} 
              onChange={(e) => setSectionMeta({ ...sectionMeta, rating: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm shadow-sm" 
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={() => updateSectionMutation.mutate(sectionMeta)}
            disabled={updateSectionMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-navy shadow-md transition-all disabled:opacity-50"
          >
            <Save size={16} /> {updateSectionMutation.isPending ? "Saving..." : "Update Section Headers"}
          </button>
        </div>
      </section>

      {/* Individual Testimonials List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="text-brand-blue" size={20} />
            <h2 className="text-xl font-bold font-display text-primary">Customer Testimonials</h2>
          </div>
          <button
            onClick={() => addMutation.mutate()}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all"
          >
            <Plus size={16} /> Add Testimonial
          </button>
        </div>

        <div className="space-y-4">
          {displayTestimonials.map((t) => (
            <div key={t.id} className="rounded-xl border border-border bg-card p-5 group transition-all hover:border-primary/20 hover:shadow-md">
              {editingId === t.id && editForm ? (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground">Name</label>
                      <input 
                        value={editForm.name} 
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required 
                        className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground">Role / Company</label>
                      <input 
                        value={editForm.role} 
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Content</label>
                    <textarea 
                      value={editForm.content} 
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      required 
                      rows={3} 
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm resize-none" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <ImageUpload 
                      label="Avatar Image (Optional)" 
                      value={editForm.image_url} 
                      onChange={(url) => {
                        setEditForm({ ...editForm, image_url: url });
                        // Auto-save image URL to database for better UX
                        supabase.from("testimonials").update({ image_url: url }).eq("id", t.id).then(({ error }) => {
                          if (!error) {
                            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
                          } else {
                            toast.error(formatError(error));
                          }
                        });
                      }} 
                      folder="testimonials"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setEditingId(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Done</button>
                    <button 
                      onClick={() => updateMutation.mutate(editForm)}
                      disabled={updateMutation.isPending}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-brand-blue/90 disabled:opacity-50"
                    >
                      <Save size={16} /> {updateMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                    {t.image_url ? <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" /> : <User className="text-muted-foreground" size={20} />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground">{t.name}</h3>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingId(t.id)} className="text-xs font-semibold text-brand-blue hover:underline">Edit</button>
                        <button onClick={() => window.confirm("Delete testimonial?") && deleteMutation.mutate(t.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    {t.role && <p className="text-xs text-brand-blue font-medium">{t.role}</p>}
                    <p className="text-sm text-muted-foreground mt-2 italic">"{t.content}"</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-2xl">
              No testimonials found. Add one to show social proof!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsEditor;
