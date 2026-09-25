import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CACHE_KEY = "mk_section_visibility_cache";

const getCachedVisibility = (): Record<string, boolean> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    // Ignore storage parse error
  }
  return {
    hero: true,
    stats: false, // Default hidden to prevent flash before DB loads
    about_overview: true,
    services: true,
    testimonials: true,
    partners: false,
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
};

export const useSectionVisibility = () => {
  const { data: settings = getCachedVisibility(), isLoading } = useQuery({
    queryKey: ["site_visibility"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .maybeSingle();
      
      if (error || !data) {
        return getCachedVisibility();
      }
      
      const settingsData = data as any;
      const userVisibility = settingsData?.section_visibility || {};
      
      const finalVisibility = {
        hero: userVisibility.hero !== false,
        stats: userVisibility.stats === true, // Explicitly respect admin setting (if false, it stays false)
        about_overview: userVisibility.about_overview !== false,
        services: userVisibility.services !== false,
        testimonials: userVisibility.testimonials !== false,
        partners: userVisibility.partners === true,
        cta: userVisibility.cta !== false,
        about_intro: userVisibility.about_intro !== false,
        vision_mission: userVisibility.vision_mission !== false,
        core_values: userVisibility.core_values !== false,
        gallery: userVisibility.gallery !== false,
        team: userVisibility.team !== false,
        services_hero: userVisibility.services_hero !== false,
        services_list: userVisibility.services_list !== false,
        faqs: userVisibility.faqs !== false,
        blog: userVisibility.blog !== false,
        contact: userVisibility.contact !== false,
      };

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(finalVisibility));
      } catch (e) {
        // Ignore storage error
      }

      return finalVisibility;
    },
    initialData: getCachedVisibility,
  });

  const isVisible = (sectionId: string) => {
    if (settings && typeof settings === 'object') {
      return (settings as any)[sectionId] === true;
    }
    return false;
  };

  return { isVisible, settings, isLoading };
};
