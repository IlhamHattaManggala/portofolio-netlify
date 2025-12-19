import { useEffect } from "react";
import { fetchSettings } from "../services/api";
import { usePolling } from "../hooks/usePolling";

interface DynamicHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const DynamicHead = ({ title, description, keywords }: DynamicHeadProps = {}) => {
  const updateHead = async () => {
    try {
      const settings = await fetchSettings();
      
      // Update title - use prop if provided, otherwise use settings
      if (title) {
        document.title = title;
      } else if (settings.site_title) {
        document.title = settings.site_title;
      }
      
      // Update meta description
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      if (description) {
        metaDescription.setAttribute("content", description);
      } else if (settings.meta_description) {
        metaDescription.setAttribute("content", settings.meta_description);
      }
      
      // Update meta keywords
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (keywords) {
        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", keywords);
      }
      
      // Update favicon - use hero_image as favicon (fallback to favicon if hero_image not available)
      const faviconUrl = settings.hero_image || settings.favicon;
      if (faviconUrl) {
        // Remove existing favicon links
        const existingFavicons = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
        existingFavicons.forEach(favicon => favicon.remove());
        
        // Add new favicon
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";
        link.href = faviconUrl;
        document.head.appendChild(link);
      }
    } catch (error) {
      console.warn('Failed to load head settings:', error);
    }
  };

  useEffect(() => {
    updateHead();
  }, [title, description, keywords]);

  // Setup polling untuk settings dengan interval lebih lama (2 jam)
  // karena settings jarang berubah
  usePolling({
    enabled: true,
    interval: 7200000, // 2 jam (2 * 60 * 60 * 1000 ms)
    onPoll: updateHead,
  });

  return null; // This component doesn't render anything
};

export default DynamicHead;

