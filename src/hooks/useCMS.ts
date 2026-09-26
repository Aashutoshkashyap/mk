import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { contentStore } from "@/lib/contentStore";

function createCMSHook<T>(
  getter: () => T,
  storeKey: string,
) {
  return function useCMSData() {
    const [data, setData] = useState<T>(() => getter());

    const refresh = useCallback(() => {
      try {
        setData(getter());
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(
            `CMS refresh failed for "${storeKey}"`,
            error,
          );
        }
      }
    }, [getter]);

    useEffect(() => {
      const handler = (event: Event) => {
        const key = (event as CustomEvent).detail?.key;

        if (!key || key === storeKey) {
          refresh();
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
    }, [refresh, storeKey]);

    return data;
  };
}

export const useHeroContent = createCMSHook(
  contentStore.getHero,
  "hero",
);

export const useAboutContent = createCMSHook(
  contentStore.getAbout,
  "about",
);

export const useStatsContent = createCMSHook(
  contentStore.getStats,
  "stats",
);

export const useServicesContent = createCMSHook(
  contentStore.getServices,
  "services",
);

export const useCoreValuesContent = createCMSHook(
  contentStore.getCoreValues,
  "core_values",
);

export const useFaqsContent = createCMSHook(
  contentStore.getFaqs,
  "faqs",
);

export const useTestimonialsContent = createCMSHook(
  contentStore.getTestimonials,
  "testimonials",
);

export const useBlogPostsContent = createCMSHook(
  contentStore.getBlogPosts,
  "blog_posts",
);

export const useContactInfoContent = createCMSHook(
  contentStore.getContactInfo,
  "contact_info",
);

export const useGalleryContent = createCMSHook(
  contentStore.getGalleryImages,
  "gallery_images",
);

export const usePartnersContent = createCMSHook(
  contentStore.getPartners,
  "partners",
);

export const usePreFooterCTAContent = createCMSHook(
  contentStore.getPreFooterCta,
  "prefooter_cta",
);

export const useSiteSettingsContent = createCMSHook(
  contentStore.getSiteSettings,
  "site_settings",
);

export const useMessagesContent = createCMSHook(
  contentStore.getMessages,
  "messages",
);
