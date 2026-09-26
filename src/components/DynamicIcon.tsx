import React from "react";
import { isImageIcon, iconMap } from "@/lib/iconMap";
import { HardHat, Building2, type LucideIcon } from "lucide-react";

interface DynamicIconProps {
  name?: any;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

/**
 * DynamicIcon safely renders:
 * 1. An image/SVG URL or uploaded Data URL (if name is a URL or data URI)
 * 2. A Lucide icon component (if name is a string key in iconMap)
 * 3. A Lucide component directly (if name is a component function)
 * 4. Safe fallback icon (if name is empty or unknown) without crashing the page
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = "w-6 h-6 text-primary",
  size = 24,
  style,
}) => {
  try {
    if (!name) {
      return <Building2 size={size} className={className} style={style} />;
    }

    // If passed a React component function directly
    if (typeof name === "function") {
      const Component = name as LucideIcon;
      return <Component size={size} className={className} style={style} />;
    }

    // If it's a URL or image data string
    if (typeof name === "string" && isImageIcon(name)) {
      return (
        <img
          src={name}
          alt="icon"
          className={`object-contain inline-block ${className}`}
          style={{
            width: size ? `${size}px` : "24px",
            height: size ? `${size}px` : "24px",
            ...style,
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      );
    }

    // Otherwise lookup in iconMap
    if (typeof name === "string") {
      const LucideComp = iconMap[name] || iconMap[name.trim()] || Building2;
      return <LucideComp size={size} className={className} style={style} />;
    }

    return <HardHat size={size} className={className} style={style} />;
  } catch (err) {
    console.error("Error rendering DynamicIcon:", err);
    return <HardHat size={size} className={className} style={style} />;
  }
};

export default DynamicIcon;
