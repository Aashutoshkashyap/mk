import React, { useRef, useState } from "react";
import { Upload, Link as LinkIcon, Search, Check, Sparkles, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { iconMap, iconNames, isImageIcon } from "@/lib/iconMap";
import { DynamicIcon } from "@/components/DynamicIcon";
import { processUploadedFile } from "@/lib/imageUtils";

interface IconPickerProps {
  label?: string;
  value: string;
  onChange: (iconNameOrUrl: string) => void;
  compact?: boolean;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  label = "Icon",
  value,
  onChange,
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"library" | "url" | "upload">("library");
  const [urlInput, setUrlInput] = useState(isImageIcon(value) ? value : "");
  const [isUploading, setIsUploading] = useState(false);

  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Icon file must be under 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      // Process icon with small dimension since it's an icon
      const dataUrl = await processUploadedFile(file, 256, 0.9);
      onChange(dataUrl);
      setUrlInput(dataUrl);
      setIsOpen(false);
      toast.success("Custom icon uploaded successfully!");
    } catch (err) {
      console.error("Icon upload error:", err);
      toast.error("Failed to upload icon file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setIsOpen(false);
    toast.success("Icon URL applied!");
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}

      {/* Hidden icon file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.svg"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="relative">
        {/* Main selector trigger button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 flex items-center justify-between gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-left hover:bg-secondary/70 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                <DynamicIcon name={value || "Building2"} size={16} className="text-primary" />
              </div>
              <span className="font-medium text-xs truncate">
                {isImageIcon(value)
                  ? value.startsWith("data:")
                    ? "Custom Uploaded Icon"
                    : "Custom URL Icon"
                  : value || "Select Icon"}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border shrink-0">
              Change
            </span>
          </button>
        </div>

        {/* Modal / Popover Dropdown */}
        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl p-3 space-y-3 min-w-[280px]">
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("library")}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === "library"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles size={12} className="inline mr-1" /> Library
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("url")}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === "url"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LinkIcon size={12} className="inline mr-1" /> URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("upload");
                    fileInputRef.current?.click();
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    activeTab === "upload"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Upload size={12} className="inline mr-1" /> Upload
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded"
              >
                <X size={14} />
              </button>
            </div>

            {/* TAB 1: Library */}
            {activeTab === "library" && (
              <div className="space-y-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search icons (e.g., Award, Truck, Shield)..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto p-1 border border-border/50 rounded-lg">
                  {filteredIcons.map((name) => {
                    const IconComp = iconMap[name];
                    const isSelected = value === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          onChange(name);
                          setIsOpen(false);
                        }}
                        title={name}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground scale-105 shadow-sm"
                            : "text-foreground/80 hover:bg-secondary hover:text-primary"
                        }`}
                      >
                        <IconComp size={18} />
                      </button>
                    );
                  })}
                  {filteredIcons.length === 0 && (
                    <div className="col-span-6 py-6 text-center text-xs text-muted-foreground">
                      No icons found. Try another search or use URL / Upload.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: URL */}
            {activeTab === "url" && (
              <div className="space-y-2">
                <label className="block text-[11px] font-medium text-muted-foreground">
                  Paste Custom SVG or Image Icon URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/icon.svg"
                    className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={handleUrlApply}
                    className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-brand-navy-dark transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {urlInput && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 border border-border">
                    <span className="text-[11px] text-muted-foreground">Preview:</span>
                    <DynamicIcon name={urlInput} size={20} className="text-primary" />
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Upload */}
            {activeTab === "upload" && (
              <div className="space-y-2 text-center p-3 border-2 border-dashed border-border rounded-xl">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full inline-flex flex-col items-center justify-center gap-1.5 py-4 text-xs font-semibold text-foreground hover:bg-secondary/40 rounded-lg transition-colors"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={20} className="animate-spin text-primary" />
                      <span>Uploading & Processing Icon...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="text-primary" />
                      <span>Click to Select SVG or PNG file</span>
                      <span className="text-[10px] text-muted-foreground">Max 5MB (SVG, PNG, WEBP)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconPicker;
