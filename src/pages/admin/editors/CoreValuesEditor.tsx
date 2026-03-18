import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2, GripVertical, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { iconNames } from "@/lib/iconMap";

const CoreValuesEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: values = [], isLoading, error } = useQuery({
    queryKey: ["core_values"],
    queryFn: async () => {
      const { data, error } = await supabase.from("core_values").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const newOrder = values.length > 0 ? Math.max(...values.map(v => v.sort_order)) + 1 : 0;
      const { error, data } = await supabase.from("core_values").insert([
        { title: "New Value", description: "Value description", icon_name: "Star", sort_order: newOrder }
      ]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["core_values"] });
      setEditingId(data.id);
      toast.success("Value added");
    },
    onError: () => toast.error("Failed to add value")
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedValue: any) => {
      const { error } = await supabase.from("core_values").update(updatedValue).eq("id", updatedValue.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["core_values"] });
      setEditingId(null);
      toast.success("Value updated successfully");
    },
    onError: () => toast.error("Failed to update value")
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("core_values").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["core_values"] });
      toast.success("Value deleted");
    },
    onError: () => toast.error("Failed to delete value")
  });

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive flex items-start gap-4">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <div>
          <h3 className="font-bold">Database Error</h3>
          <p className="text-sm opacity-90">Could not load core values. Try running the seed SQL script.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading core values...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-primary">Core Values ("What Drives Us")</h2>
        <button
          onClick={() => addMutation.mutate()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all"
        >
          <Plus size={16} /> Add Value
        </button>
      </div>

      <div className="space-y-4">
        {values.map((v) => (
          <div key={v.id} className="rounded-xl border border-border bg-card p-5 group transition-all hover:border-primary/20 hover:shadow-md">
            {editingId === v.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  updateMutation.mutate({
                    id: v.id,
                    title: formData.get("title"),
                    description: formData.get("description"),
                    icon_name: formData.get("icon_name"),
                  });
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Title</label>
                    <input name="title" defaultValue={v.title} required className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Lucide Icon Name</label>
                    <select name="icon_name" defaultValue={v.icon_name} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      {iconNames.map(name => <option key={name} value={name}>{name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Description</label>
                  <textarea name="description" defaultValue={v.description} required rows={3} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
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
                <div className="mt-1 text-muted-foreground/30"><GripVertical size={20} /></div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-foreground text-lg">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                  <p className="text-xs font-mono text-muted-foreground bg-secondary/50 inline-block px-2 py-0.5 rounded mt-2">Icon: {v.icon_name}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingId(v.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">Edit</button>
                  <button onClick={() => window.confirm("Delete this value?") && deleteMutation.mutate(v.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {values.length === 0 && (
          <div className="text-center p-8 text-muted-foreground border border-dashed rounded-2xl">
            No core values found. Click "Add Value" or run the seed.sql script to populate this section.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoreValuesEditor;
