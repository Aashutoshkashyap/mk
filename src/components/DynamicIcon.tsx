import React from "react";
import { getIcon, isImageIcon } from "@/lib/iconMap";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

/**
 * DynamicIcon renders either:
 * 1. An image/SVG URL or uploaded Data URL (if name is a URL or data URI)
 * 2. A Lucide icon component (if name is a Lucide icon identifier)
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = "w-6 h-6 text-primary",
  size = 24,
  style,
}) => {
  if (!name) return null;

  if (isImageIcon(name)) {
    return (
      <img
        src={name}
        alt="icon"
        className={`object-contain inline-block ${className}`}
        style={{
          width: size ? `${size}px` : undefined,
          height: size ? `${size}px` : undefined,
          ...style,
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }

  const LucideComp = getIcon(name);
  return <LucideComp size={size} className={className} style={style} />;
};

export default DynamicIcon;
