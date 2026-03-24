import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
    mutationFn: async () => {
      const { error } = await supabase.from("gallery_images").insert({ image_url: "https://via.placeholder.com/400x300", alt_text: "New image", sort_order: images.length });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Image added!"); },
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-secondary rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Gallery Images</h2>
        <button onClick={() => addMutation.mutate()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          <Plus size={16} /> Add Image
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img: any) => <ImageCard key={img.id} image={img} />)}
      </div>
    </div>
  );
};

const ImageCard = ({ image }: { image: any }) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ image_url: image.image_url, alt_text: image.alt_text || "" });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("gallery_images").update(form).eq("id", image.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Updated!"); },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", image.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Deleted!"); },
  });

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
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
          <button onClick={() => updateMutation.mutate()} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
            <Save size={12} />
          </button>
          <button onClick={() => deleteMutation.mutate()} className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
