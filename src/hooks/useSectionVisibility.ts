import { useState, useEffect } from "react";

const STORAGE_KEY = "mk_cms_section_visibility";

// Sections visible by default
const DEFAULT_VISIBILITY: Record<string, boolean> = {
  hero: true,
  stats: true,
  about_overview: true,
  services: true,
  testimonials: true,
  partners: true,
  blog: true,
  faqs: true,
  cta: true,
  about_intro: true,
  vision_mission: true,
  core_values: true,
  gallery: true,
  team: true,
  services_hero: true,
  services_list: true,
  contact: true,
};

function readVisibility(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_VISIBILITY, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_VISIBILITY };
}

export const useSectionVisibility = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(readVisibility);

  useEffect(() => {
    const handler = (e: Event) => {
      const key = (e as CustomEvent).detail?.key;
      if (!key || key === "visibility") {
        setVisibility(readVisibility());
      }
    };
    window.addEventListener("mk_cms_update", handler);
    return () => window.removeEventListener("mk_cms_update", handler);
  }, []);

  const isVisible = (sectionId: string): boolean => {
    const val = visibility[sectionId];
    if (val === undefined) return DEFAULT_VISIBILITY[sectionId] !== false;
    return val === true;
  };

  return { isVisible, settings: visibility, isLoading: false };
};
