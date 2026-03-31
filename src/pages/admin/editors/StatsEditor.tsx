import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import iconMap from "@/lib/iconMap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const StatsEditor = () => {
  const qc = useQueryClient();
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await supabase.from("stats").select("*").order("sort_order");
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (stat: any) => {
      const { error } = await supabase.from("stats").update({ icon_name: stat.icon_name, value: stat.value, label: stat.label, sort_order: stat.sort_order }).eq("id", stat.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-stats"] }); toast.success("Stat updated!"); },
    onError: (e: any) => toast.error(e.message),
  });

  const addMutation = useMutation({
    mutationFn: async ({ len }: any) => {
      const { error } = await supabase.from("stats").insert({ icon_name: "Award", value: "0+", label: "New Stat", sort_order: len });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-stats"] }); toast.success("Stat added!"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("stats").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-stats"] }); toast.success("Stat deleted!"); },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (items: any[]) => {
      const promises = items.map((item, index) => 
        supabase.from("stats").update({ sort_order: index }).eq("id", item.id)
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    }
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(stats);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    qc.setQueryData(["admin-stats"], items);
    updateOrderMutation.mutate(items);
  };

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Stats</h2>
        <button onClick={() => addMutation.mutate({ len: stats.length })} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add Stat
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stats-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {stats.map((stat: any, index: number) => (
                <Draggable key={stat.id} draggableId={stat.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={snapshot.isDragging ? "z-50 relative shadow-2xl ring-1 ring-primary/20 rounded-2xl" : ""}
                    >
                      <StatRow stat={stat} onSave={(s) => updateMutation.mutate(s)} onDelete={() => deleteMutation.mutate(stat.id)} dragHandleProps={provided.dragHandleProps} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const StatRow = ({ stat, onSave, onDelete, dragHandleProps }: { stat: any; onSave: (s: any) => void; onDelete: () => void; dragHandleProps?: any }) => {
  const [form, setForm] = useState(stat);
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center gap-4">
        <div {...dragHandleProps} className="cursor-grab text-muted-foreground/30 hover:text-primary transition-colors hover:bg-secondary p-1 rounded-lg">
          <GripVertical size={20} />
        </div>
        <div className="flex-1 grid grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Icon</label>
          <select value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
            className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm">
            {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Value</label>
          <input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Label</label>
          <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
        </div>
        <div className="flex items-end gap-2">
          <button onClick={() => onSave(form)} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"><Save size={14} /></button>
          <button onClick={onDelete} className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  </div>
);
};

export default StatsEditor;
