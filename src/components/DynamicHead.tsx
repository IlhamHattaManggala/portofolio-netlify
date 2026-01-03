import { useEffect } from "react";
import { settings } from "../data/settings";

interface DynamicHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const DynamicHead = ({ title, description, keywords }: DynamicHeadProps = {}) => {
  useEffect(() => {
    // Update title
    document.title = title || settings.title || "Ilham Hatta Manggala - Portfolio";

    // Update meta description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description || settings.description || "");

    // Update meta keywords - optional, as Google ignores this nowadays
    // using static keywords from settings if provided, or default ones
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    if (keywords) {
      metaKeywords.setAttribute("content", keywords);
    } 
    // If you want to use keywords from settings, add them to settings.ts and map here

    // Update favicon
    const faviconUrl = settings.heroLogo || settings.favicon;
    if (faviconUrl) {
      // Remove existing icon links to avoid duplicates
      const existingFavicons = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
      existingFavicons.forEach(favicon => favicon.remove());
      
      const link = document.createElement("link");
      link.rel = "icon";
      // Assuming png/svg based on likely assets, but browser handles it well usually
      link.href = typeof faviconUrl === 'string' ? faviconUrl : String(faviconUrl); 
      document.head.appendChild(link);
    }

  }, [title, description, keywords]);

  return null;
};

export default DynamicHead;
