import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2, GripVertical, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";
import { iconNames } from "@/lib/iconMap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const defaultCoreValues = [
  { id: "v1", title: "Zero-Harm Safety First", description: "Uncompromising adherence to occupational safety standards and strict HSE protocols across all Himalayan and Terai jobsites.", icon_name: "ShieldCheck", sort_order: 0 },
  { id: "v2", title: "Engineering Discipline", description: "Exacting adherence to Nepal Building Code (NBC), DoR standard specifications, and international FIDIC contractual guidelines.", icon_name: "Building2", sort_order: 1 },
  { id: "v3", title: "Timely Delivery", description: "Strategic pre-monsoon milestones, automated scheduling, and captive heavy fleet mobilization to deliver projects within schedule.", icon_name: "Compass", sort_order: 2 },
  { id: "v4", title: "Ethical Contracting", description: "Pioneering transparent procurement, corporate governance, community stewardship, and sustainable river basin protection.", icon_name: "Shield", sort_order: 3 },
];

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

  const displayValues = values.length > 0 ? values : defaultCoreValues;

  const addMutation = useMutation({
    mutationFn: async ({ currentValues }: any) => {
      const newOrder = currentValues.length > 0 ? Math.max(...currentValues.map((v: any) => v.sort_order)) + 1 : 0;
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
      const isCustomId = typeof updatedValue.id === "string" && updatedValue.id.startsWith("v");
      const { error } = await supabase.from("core_values").upsert({
        ...(isCustomId ? {} : { id: updatedValue.id }),
        title: updatedValue.title,
        description: updatedValue.description,
        icon_name: updatedValue.icon_name,
        sort_order: updatedValue.sort_order ?? 0
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["core_values"] });
      toast.success("Value saved!");
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

  const updateOrderMutation = useMutation({
    mutationFn: async (items: any[]) => {
      const promises = items.map((item, index) => 
        supabase.from("core_values").upsert({ ...item, sort_order: index })
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["core_values"] });
    }
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(displayValues);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    queryClient.setQueryData(["core_values"], items);
    updateOrderMutation.mutate(items);
  };

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
          onClick={() => addMutation.mutate({ currentValues: displayValues })}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all"
        >
          <Plus size={16} /> Add Value
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="core-values">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {displayValues.map((v: any, index: number) => (
                <Draggable key={v.id} draggableId={v.id} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      className={`rounded-xl border border-border bg-card p-5 group transition-all ${snapshot.isDragging ? 'shadow-2xl border-primary/50 ring-1 ring-primary/20 z-10' : 'hover:border-primary/20 hover:shadow-md'}`}
                    >
                      {editingId === v.id ? (
                        <CoreValueEditForm
                          key={v.id}
                          value={v}
                          onSave={(data) => { updateMutation.mutate(data); setEditingId(null); }}
                          onCancel={() => setEditingId(null)}
                          isSaving={updateMutation.isPending}
                        />
                      ) : (
                        <div className="flex items-start gap-4">
                          <div {...provided.dragHandleProps} className="mt-1 flex items-center justify-center p-1 cursor-grab text-muted-foreground/30 hover:text-primary transition-colors">
                            <GripVertical size={20} />
                          </div>
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {values.length === 0 && (
                <div className="text-center p-8 text-muted-foreground border border-dashed rounded-2xl">
                  No core values found. Click "Add Value" or run the seed.sql script to populate this section.
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const CoreValueEditForm = ({ value, onSave, onCancel, isSaving }: { value: any; onSave: (data: any) => void; onCancel: () => void; isSaving: boolean }) => {
  const [title, setTitle] = useState(value.title);
  const [description, setDescription] = useState(value.description);
  const [iconName, setIconName] = useState(value.icon_name);
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">Lucide Icon Name</label>
          <select value={iconName} onChange={(e) => setIconName(e.target.value)} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            {iconNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Cancel</button>
        <button
          type="button"
          disabled={isSaving}
          onClick={() => onSave({ id: value.id, title, description, icon_name: iconName })}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-brand-blue/90 disabled:opacity-50"
        >
          {isSaving ? <><Save size={16} /> Saving...</> : <><Check size={16} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
};

export default CoreValuesEditor;
