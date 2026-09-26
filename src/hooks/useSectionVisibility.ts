import { useEffect, useState } from "react";

const STORAGE_KEY = "mk_cms_section_visibility";

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
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { ...DEFAULT_VISIBILITY };
    }

    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return { ...DEFAULT_VISIBILITY };
    }

    const safeValues = Object.entries(
      parsed as Record<string, unknown>,
    ).reduce<Record<string, boolean>>(
      (result, [key, value]) => {
        if (typeof value === "boolean") {
          result[key] = value;
        }

        return result;
      },
      {},
    );

    return {
      ...DEFAULT_VISIBILITY,
      ...safeValues,
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(
        "Failed to read section visibility",
        error,
      );
    }

    return { ...DEFAULT_VISIBILITY };
  }
}

export const useSectionVisibility = () => {
  const [visibility, setVisibility] = useState<
    Record<string, boolean>
  >(() => readVisibility());

  useEffect(() => {
    const handler = (event: Event) => {
      const key = (event as CustomEvent).detail?.key;

      if (!key || key === "visibility") {
        setVisibility(readVisibility());
      }
    };

    window.addEventListener(
      "mk_cms_update",
      handler,
    );

    return () => {
      window.removeEventListener(
        "mk_cms_update",
        handler,
      );
    };
  }, []);

  const isVisible = (sectionId: string): boolean => {
    if (!sectionId) {
      return true;
    }

    const value = visibility[sectionId];

    if (value === undefined) {
      return DEFAULT_VISIBILITY[sectionId] !== false;
    }

    return value === true;
  };

  return {
    isVisible,
    settings: visibility,
    isLoading: false,
  };
};
