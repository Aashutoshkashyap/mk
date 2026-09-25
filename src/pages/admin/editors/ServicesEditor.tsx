import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { toast } from "sonner";
import iconMap from "@/lib/iconMap";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ServicesEditor = () => {
  const qc = useQueryClient();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*, sub_services(*)").order("sort_order");
      return data || [];
    },
  });

  const formatError = (e: any) => {
    if (e.message?.includes("new row violates row level security policy") || e.code === "42501") {
      return "Permission Denied: You must be an 'admin' to perform this action.";
    }
    return e.message || "An unexpected error occurred.";
  };

  const addMutation = useMutation({
    mutationFn: async ({ len }: any) => {
      const { error } = await supabase.from("services").insert({ icon_name: "Briefcase", title: "New Service", description: "Description", sort_order: len });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); toast.success("Service added!"); },
    onError: (e: any) => toast.error(formatError(e))
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (items: any[]) => {
      const promises = items.map((item, index) => 
        supabase.from("services").update({ sort_order: index }).eq("id", item.id)
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-services"] });
    }
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    qc.setQueryData(["admin-services"], items);
    updateOrderMutation.mutate(items);
  };

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Services</h2>
        <button onClick={() => addMutation.mutate({ len: services.length })} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all">
          <Plus size={16} /> Add Service
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="services-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {services.map((service: any, index: number) => (
                <Draggable key={service.id} draggableId={service.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={snapshot.isDragging ? "z-50 relative shadow-2xl ring-1 ring-primary/20 rounded-2xl" : ""}
                    >
                      <ServiceCard service={service} formatError={formatError} dragHandleProps={provided.dragHandleProps} />
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

const ServiceCard = ({ service, formatError, dragHandleProps }: { service: any, formatError: (e: any) => string, dragHandleProps?: any }) => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: service.title, description: service.description, icon_name: service.icon_name, image_url: service.image_url || "" });

  const updateMutation = useMutation({
    mutationFn: async ({ form, id }: any) => {
      const { error } = await supabase.from("services").update(form).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); toast.success("Service updated!"); },
    onError: (e: any) => toast.error(formatError(e))
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: any) => {
      if (!window.confirm("Are you sure you want to delete this service? All sub-services will also be removed.")) return;
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); toast.success("Service deleted!"); },
    onError: (e: any) => toast.error(formatError(e))
  });

  const addSubMutation = useMutation({
    mutationFn: async ({ id, len }: any) => {
      const { error } = await supabase.from("sub_services").insert({ service_id: id, icon_name: "CheckCircle2", label: "New Sub-service", sort_order: len });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); toast.success("Sub-service added!"); },
    onError: (e: any) => toast.error(formatError(e))
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <div {...dragHandleProps} onClick={(e) => e.stopPropagation()} className="cursor-grab text-muted-foreground/30 hover:text-primary transition-colors p-1 -ml-2 rounded-lg hover:bg-secondary">
            <GripVertical size={20} />
          </div>
          <h3 className="font-display text-lg font-bold text-primary">{service.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); deleteMutation.mutate({ id: service.id }); }} className="rounded-lg bg-destructive/10 px-2 py-1 text-xs text-destructive"><Trash2 size={14} /></button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="p-5 pt-0 space-y-4 border-t border-border mt-0 pt-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Icon</label>
              <select value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm">
                {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
          </div>
          <div className="space-y-3">
            <ImageUpload 
              label="Service Image" 
              value={form.image_url} 
              onChange={(url) => {
                setForm({ ...form, image_url: url });
                // Auto-save image URL to database for better UX
                supabase.from("services").update({ image_url: url }).eq("id", service.id).then(({ error }) => {
                  if (!error) {
                    qc.invalidateQueries({ queryKey: ["admin-services"] });
                  } else {
                    toast.error(formatError(error));
                  }
                });
              }} 
              folder="services"
            />
          </div>
          <button onClick={() => updateMutation.mutate({ form, id: service.id })} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all">
            <Save size={14} /> Save Service Changes
          </button>

          {/* Sub-services */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-foreground">Sub-services</h4>
              <button onClick={() => addSubMutation.mutate({ id: service.id, len: service.sub_services?.length || 0 })} className="text-xs font-bold text-brand-blue flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
            <div className="space-y-2">
              {(service.sub_services || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((sub: any) => (
                <SubServiceRow key={sub.id} sub={sub} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SubServiceRow = ({ sub }: { sub: any }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ icon_name: sub.icon_name, label: sub.label });

  const updateMutation = useMutation({
    mutationFn: async ({ form, id }: any) => {
      const { error } = await supabase.from("sub_services").update(form).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); toast.success("Updated!"); },
    onError: (e: any) => toast.error(e.message || "Failed to update sub-service")
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: any) => {
      if (!window.confirm("Delete sub-service?")) return;
      const { error } = await supabase.from("sub_services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); },
    onError: (e: any) => toast.error(e.message || "Failed to delete sub-service")
  });

  return (
    <div className="flex items-center gap-2">
      <select value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} className="rounded-lg border border-border bg-secondary/50 px-2 py-1.5 text-xs w-32">
        {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
      </select>
      <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs" />
      <button onClick={() => updateMutation.mutate({ form, id: sub.id })} className="rounded-lg bg-primary/10 px-2 py-1.5 text-xs text-primary"><Save size={12} /></button>
      <button onClick={() => deleteMutation.mutate({ id: sub.id })} className="rounded-lg bg-destructive/10 px-2 py-1.5 text-xs text-destructive"><Trash2 size={12} /></button>
    </div>
  );
};

export default ServicesEditor;
