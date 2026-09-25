import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSectionVisibility = () => {
  const { data: settings = {} } = useQuery({
    queryKey: ["site_visibility"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .maybeSingle();
      
      if (error) {
        console.error("Frontend Visibility Error:", error);
        return { stats: true, partners: false };
      }
      if (!data) {
        return { stats: true, partners: false };
      }
      
      const settingsData = data as any;
      // If the row belongs to legacy Sharp Edge template, override with MK Construction defaults
      if (settingsData?.company_name === "Sharp Edge") {
        return {
          hero: true,
          stats: true,
          about_overview: true,
          services: true,
          testimonials: true,
          partners: false, // User requested: No clients section
          cta: true,
          about_intro: true,
          vision_mission: true,
          core_values: true,
          gallery: true,
          team: true,
          services_hero: true,
          services_list: true,
          faqs: true,
          blog: true,
          contact: true,
        };
      }

      return (settingsData?.section_visibility as Record<string, boolean>) || {};
    },
  });

  const isVisible = (sectionId: string) => {
    // If we've loaded data, check the map. Default to visible (true) only if it's NOT false.
    if (settings && typeof settings === 'object') {
      return (settings as any)[sectionId] !== false;
    }
    return true; // Default to visible before loading or if row empty
  };

  return { isVisible, settings };
};
