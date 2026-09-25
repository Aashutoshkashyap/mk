import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ImageUpload } from "@/components/admin/ImageUpload";

const GalleryEditor = () => {
  const qc = useQueryClient();
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
      return data || [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async ({ len }: any) => {
      const { error } = await supabase.from("gallery_images").insert({ image_url: "https://via.placeholder.com/400x300", alt_text: "New image", sort_order: len });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Image added!"); },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (items: any[]) => {
      const promises = items.map((item, index) => 
        supabase.from("gallery_images").update({ sort_order: index }).eq("id", item.id)
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    }
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    qc.setQueryData(["admin-gallery"], items);
    updateOrderMutation.mutate(items);
  };

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Gallery Images</h2>
        <button onClick={() => addMutation.mutate({ len: images.length })} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add Image
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery-grid" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-4">
              {images.map((img: any, index: number) => (
                <Draggable key={img.id} draggableId={img.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all ${snapshot.isDragging ? "z-50 relative shadow-2xl ring-1 ring-primary/20 rounded-2xl" : ""}`}
                    >
                      <ImageCard image={img} dragHandleProps={provided.dragHandleProps} />
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

const ImageCard = ({ image, dragHandleProps }: { image: any, dragHandleProps?: any }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ image_url: image.image_url, alt_text: image.alt_text || "" });

  const updateMutation = useMutation({
    mutationFn: async ({ form, id }: any) => {
      const { error } = await supabase.from("gallery_images").update(form).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Updated!"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: any) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Deleted!"); },
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden relative group">
      <div {...dragHandleProps} className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab z-10 text-muted-foreground hover:text-primary shadow-sm border border-border">
        <GripVertical size={16} />
      </div>
      <div className="p-4 space-y-4">
        <ImageUpload 
          label="Gallery Image" 
          value={form.image_url} 
          onChange={(url) => setForm({ ...form, image_url: url })} 
          folder="gallery"
        />
        <div>
          <label className="block text-xs font-semibold mb-1">Alt Text</label>
          <input 
            value={form.alt_text} 
            onChange={(e) => setForm({ ...form, alt_text: e.target.value })} 
            className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs" 
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => updateMutation.mutate({ form, id: image.id })} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            <Save size={12} />
          </button>
          <button onClick={() => deleteMutation.mutate({ id: image.id })} className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
