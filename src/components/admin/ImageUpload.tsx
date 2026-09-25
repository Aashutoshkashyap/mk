import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
  folder?: string;
}

export const ImageUpload = ({ 
  value, 
  onChange, 
  label = "Image", 
  bucket = "site-assets",
  folder = "uploads"
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        console.error("DEBUG: Storage upload error details:", uploadError);
        // Special handling for common errors
        if ((uploadError as any).message === "Bucket not found") {
          throw new Error(`Storage bucket '${bucket}' not found. Please create it in your Supabase dashboard and set it to public.`);
        }
        if ((uploadError as any).status === 403 || (uploadError as any).message?.includes("security policy")) {
          throw new Error(`Permission denied for bucket '${bucket}'. Please ensure you have run the Storage RLS setup script.`);
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      console.error("DEBUG: Image upload failed", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-4 w-full">
      {label && <label className="block text-sm font-semibold text-foreground">{label}</label>}
      
      <div className="flex gap-2">
        <div className="flex-1 relative group">
          {value ? (
            <div className="relative rounded-2xl border border-border overflow-hidden bg-secondary/30 aspect-video flex items-center justify-center">
              <img 
                src={value} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                  title="Change image"
                >
                  <Upload size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 rounded-full bg-transparent0/80 hover:bg-[#888A8C]/100 text-white transition-colors"
                  title="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full aspect-video rounded-2xl border-2 border-dashed border-border hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all flex flex-col items-center justify-center gap-3 group bg-secondary/10"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-brand-blue animate-spin" />
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Uploading...</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-brand-blue" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-foreground block uppercase tracking-widest">Click to upload</span>
                    <span className="text-[10px] text-muted-foreground">PNG, JPG up to 5MB</span>
                  </div>
                </>
              )}
            </button>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="w-1/3 flex flex-col gap-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Or paste URL</div>
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 w-full rounded-xl border border-border bg-secondary/30 p-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/20 resize-none"
          />
        </div>
      </div>

      {value && !value.startsWith('http') && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border overflow-hidden">
          <ImageIcon size={14} className="text-muted-foreground shrink-0" />
          <span className="text-[10px] text-muted-foreground truncate flex-1">{value}</span>
        </div>
      )}
    </div>
  );
};
