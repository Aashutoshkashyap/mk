import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface BulkImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  bucket?: string;
  folder?: string;
}

export const BulkImageUpload = ({ 
  onUploadComplete, 
  bucket = "site-assets",
  folder = "partners"
}: BulkImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const validFiles = files.filter(file => file.type.startsWith("image/"));
    if (validFiles.length < files.length) {
      toast.warning(`${files.length - validFiles.length} files were skipped as they are not images.`);
    }
    
    if (validFiles.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      setIsUploading(true);
      setProgress({ current: 0, total: validFiles.length });
      
      const uploadPromises = validFiles.map(async (file, index) => {
        try {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
          const filePath = folder ? `${folder}/${fileName}` : fileName;

          const { data, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

          if (uploadError) {
            console.error(`Error uploading ${file.name}:`, uploadError);
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
          return publicUrl;
        } catch (err) {
          console.error(`Failed to upload ${file.name}`, err);
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);
      const successfulUrls = results.filter((url): url is string => url !== null);

      if (successfulUrls.length > 0) {
        onUploadComplete(successfulUrls);
        toast.success(`Successfully uploaded ${successfulUrls.length} image(s)!`);
      }
      
      if (successfulUrls.length < validFiles.length) {
        toast.error(`Failed to upload ${validFiles.length - successfulUrls.length} file(s).`);
      }
    } catch (error: any) {
      console.error("Bulk upload failed", error);
      toast.error(error.message || "Bulk upload failed");
    } finally {
      setIsUploading(false);
      setProgress({ current: 0, total: 0 });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="w-full flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-brand-blue/30 bg-brand-blue/5 hover:bg-brand-blue/10 hover:border-brand-blue/50 transition-all group"
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 text-brand-blue animate-spin" />
            <div className="text-center">
              <span className="text-sm font-bold text-brand-blue block uppercase tracking-widest">
                Uploading...
              </span>
              <span className="text-xs text-muted-foreground">
                {progress.current} of {progress.total} files processed
              </span>
            </div>
            <div className="w-48 h-1.5 bg-brand-blue/10 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-brand-blue transition-all duration-300" 
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="h-7 w-7 text-brand-blue" />
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-foreground block uppercase tracking-widest mb-1">
                Bulk Image Upload
              </span>
              <p className="text-xs text-muted-foreground px-4">
                Drag and drop or click to select multiple logos. <br/>
                Parallel uploading for maximum speed.
              </p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};
