import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CACHE_KEY = "mk_section_visibility_cache";

// Sections that default to TRUE (visible) when no DB record exists
const DEFAULT_VISIBLE_SECTIONS = new Set([
  "hero", "about_overview", "services", "testimonials",
  "cta", "about_intro", "vision_mission", "core_values",
  "gallery", "team", "services_hero", "services_list",
  "faqs", "blog", "contact",
]);

// Sections that default to FALSE (hidden) when no DB record exists
const DEFAULT_HIDDEN_SECTIONS = new Set(["stats", "partners"]);

const getDefaultVisibility = (): Record<string, boolean> => {
  const result: Record<string, boolean> = {};
  DEFAULT_VISIBLE_SECTIONS.forEach((k) => (result[k] = true));
  DEFAULT_HIDDEN_SECTIONS.forEach((k) => (result[k] = false));
  return result;
};

export const useSectionVisibility = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["site_visibility"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .maybeSingle();

      if (error || !data) {
        return getDefaultVisibility();
      }

      const settingsData = data as any;
      const userVisibility: Record<string, boolean> = settingsData?.section_visibility || {};

      // Merge: start from defaults, then apply only explicit false/true from DB
      const finalVisibility: Record<string, boolean> = { ...getDefaultVisibility() };
      for (const [key, val] of Object.entries(userVisibility)) {
        if (typeof val === "boolean") {
          finalVisibility[key] = val;
        }
      }
      // stats and partners are opt-in: only show if explicitly true
      finalVisibility.stats = userVisibility.stats === true;
      finalVisibility.partners = userVisibility.partners === true;

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(finalVisibility));
      } catch (e) {
        // Ignore storage error
      }

      return finalVisibility;
    },
    // Default to everything visible so sections never flash-hide on first load
    initialData: getDefaultVisibility,
  });

  const isVisible = (sectionId: string): boolean => {
    if (!settings || typeof settings !== "object") {
      // When no data yet: visible unless it's an opt-in section
      return !DEFAULT_HIDDEN_SECTIONS.has(sectionId);
    }
    const val = (settings as Record<string, boolean>)[sectionId];
    // If key is absent from DB map, default to visible (unless opt-in)
    if (val === undefined) return !DEFAULT_HIDDEN_SECTIONS.has(sectionId);
    return val === true;
  };

  return { isVisible, settings, isLoading };
};
