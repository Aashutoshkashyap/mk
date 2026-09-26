import React from "react";
import { Building2, HardHat, type LucideIcon } from "lucide-react";
import { iconMap, isImageIcon } from "@/lib/iconMap";

interface DynamicIconProps {
  name?: unknown;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

const FALLBACK_ICON: LucideIcon = Building2;

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = "w-6 h-6 text-primary",
  size = 24,
  style,
}) => {
  try {
    /*
     * 1. Empty / invalid value
     */
    if (name === null || name === undefined || name === "") {
      return (
        <FALLBACK_ICON
          size={size}
          className={className}
          style={style}
        />
      );
    }

    /*
     * 2. A Lucide component passed directly
     */
    if (typeof name === "function") {
      const Component = name as LucideIcon;

      return (
        <Component
          size={size}
          className={className}
          style={style}
        />
      );
    }

    /*
     * 3. Only strings can represent CMS icon values.
     */
    if (typeof name !== "string") {
      return (
        <FALLBACK_ICON
          size={size}
          className={className}
          style={style}
        />
      );
    }

    const value = name.trim();

    if (!value) {
      return (
        <FALLBACK_ICON
          size={size}
          className={className}
          style={style}
        />
      );
    }

    /*
     * 4. Image / SVG / uploaded data URL
     */
    if (isImageIcon(value)) {
      return (
        <img
          src={value}
          alt=""
          aria-hidden="true"
          className={`object-contain inline-block ${className}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            ...style,
          }}
          onError={(event) => {
            const image = event.currentTarget;

            /*
             * Hide broken uploaded/icon images instead of
             * allowing the UI to become visually broken.
             */
            image.style.display = "none";
          }}
        />
      );
    }

    /*
     * 5. Normal Lucide icon name
     */
    const LucideComponent =
      iconMap[value] ??
      iconMap[value.toLowerCase()] ??
      FALLBACK_ICON;

    return (
      <LucideComponent
        size={size}
        className={className}
        style={style}
      />
    );
  } catch (error) {
    /*
     * Dynamic CMS data must never be able to crash
     * the entire public application.
     */
    if (import.meta.env.DEV) {
      console.error("DynamicIcon rendering error:", error, {
        name,
      });
    }

    return (
      <FALLBACK_ICON
        size={size}
        className={className}
        style={style}
      />
    );
  }
};

export default DynamicIcon;
export { DynamicIcon };
