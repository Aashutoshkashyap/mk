import React, { useRef, useState } from "react";
import { Upload, Link as LinkIcon, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { processUploadedFile } from "@/lib/imageUtils";

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  previewHeight?: string;
  objectFit?: "cover" | "contain";
  helpText?: string;
  compact?: boolean;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "https://... or upload an image file",
  previewHeight = "h-32",
  objectFit = "cover",
  helpText,
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState<"url" | "file">("url");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit before processing (e.g. max 15MB file size before compression)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size is too large (max 15MB).");
      return;
    }

    try {
      setIsUploading(true);
      const dataUrl = await processUploadedFile(file, 1400, 0.85);
      onChange(dataUrl);
      toast.success("Image uploaded & processed successfully!");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to process image file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-foreground">{label}</label>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`px-2 py-0.5 rounded transition-colors ${
                mode === "url" ? "bg-primary text-primary-foreground font-bold" : "hover:text-foreground"
              }`}
            >
              Paste URL
            </button>
            <span>|</span>
            <button
              type="button"
              onClick={() => {
                setMode("file");
                fileInputRef.current?.click();
              }}
              className={`px-2 py-0.5 rounded transition-colors ${
                mode === "file" ? "bg-primary text-primary-foreground font-bold" : "hover:text-foreground"
              }`}
            >
              Upload File
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm pl-9 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary/80 border border-border transition-colors shrink-0 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 size={14} className="animate-spin text-primary" /> Uploading...
            </>
          ) : (
            <>
              <Upload size={14} className="text-primary" /> Upload
            </>
          )}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Remove Image"
            className="rounded-lg bg-destructive/10 px-3 py-2 text-destructive hover:bg-destructive/20 border border-destructive/20 transition-colors shrink-0"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {helpText && <p className="text-[11px] text-muted-foreground">{helpText}</p>}

      {/* Live Preview */}
      {value && (
        <div className="relative rounded-xl border border-border bg-secondary/20 p-2 overflow-hidden group">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5 px-1">
            <span className="flex items-center gap-1">
              <ImageIcon size={12} /> Image Preview
            </span>
            <span className="truncate max-w-[200px]">
              {value.startsWith("data:") ? "Uploaded local file" : value}
            </span>
          </div>
          <div className={`w-full ${previewHeight} rounded-lg overflow-hidden bg-black/5 flex items-center justify-center`}>
            <img
              src={value}
              alt="Preview"
              className={`w-full h-full ${objectFit === "contain" ? "object-contain p-2" : "object-cover"}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
