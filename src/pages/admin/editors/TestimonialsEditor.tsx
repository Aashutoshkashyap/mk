import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2, Quote, User, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const TestimonialsEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const newOrder = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.sort_order)) + 1 : 0;
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
    onError: () => toast.error("Failed to add testimonial")
  });

  const updateMutation = useMutation({
    mutationFn: async (updated: any) => {
      const { error } = await supabase.from("testimonials").update(updated).eq("id", updated.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditingId(null);
      toast.success("Testimonial updated successfully");
    },
    onError: () => toast.error("Failed to update testimonial")
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
    onError: () => toast.error("Failed to delete testimonial")
  });

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-primary">Customer Testimonials</h2>
        <button
          onClick={() => addMutation.mutate()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-5 group transition-all hover:border-primary/20 hover:shadow-md">
            {editingId === t.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  updateMutation.mutate({
                    id: t.id,
                    name: formData.get("name"),
                    role: formData.get("role"),
                    content: formData.get("content"),
                    image_url: formData.get("image_url"),
                  });
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Name</label>
                    <input name="name" defaultValue={t.name} required className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Role / Company</label>
                    <input name="role" defaultValue={t.role} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Content</label>
                  <textarea name="content" defaultValue={t.content} required rows={3} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Avatar URL (Optional)</label>
                  <input name="image_url" defaultValue={t.image_url} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" placeholder="https://..." />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setEditingId(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Cancel</button>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-brand-blue/90">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </form>
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
    </div>
  );
};

export default TestimonialsEditor;
