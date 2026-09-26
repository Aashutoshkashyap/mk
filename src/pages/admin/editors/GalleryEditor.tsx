import { useState } from "react";
import { Save, Plus, Trash2, Image } from "lucide-react";
import { toast } from "sonner";
import { contentStore } from "@/lib/contentStore";
import { useGalleryContent } from "@/hooks/useCMS";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

type GalleryImage = { id: string; image_url: string; alt_text?: string; sort_order: number };

const GalleryEditor = () => {
  const dbImages = useGalleryContent();
  const [images, setImages] = useState<GalleryImage[]>(dbImages);

  const saveAll = () => { contentStore.setGalleryImages(images); toast.success("Gallery updated! Changes are live."); };
  const add = () => setImages([...images, { id: crypto.randomUUID(), image_url: "", alt_text: "", sort_order: images.length }]);
  const remove = (id: string) => setImages(images.filter((i) => i.id !== id));
  const update = (id: string, field: keyof GalleryImage, val: string) =>
    setImages(images.map((i) => i.id === id ? { ...i, [field]: val } : i));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Gallery</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add Image</button>
      </div>
      {images.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center text-muted-foreground">
          <Image size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No gallery images yet. Click "Add Image" to get started.</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((img) => (
          <div key={img.id} className="rounded-2xl bg-card border border-border p-4 space-y-3">
            <ImageUploadInput
              label="Gallery Image"
              value={img.image_url}
              onChange={(url) => update(img.id, "image_url", url)}
              placeholder="https://... or upload photo"
              previewHeight="h-36"
            />
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Alt Text / Caption</label>
              <input value={img.alt_text || ""} onChange={(e) => update(img.id, "alt_text", e.target.value)} placeholder="Describe the image..."
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            <button onClick={() => remove(img.id)}
              className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20 w-full justify-center">
              <Trash2 size={13} /> Remove Image
            </button>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="mt-6">
          <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
            <Save size={16} /> Save Gallery
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryEditor;
