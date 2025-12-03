import { useEffect } from "react";
import { fetchSettings } from "../services/api";

interface DynamicHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const DynamicHead = ({ title, description, keywords }: DynamicHeadProps = {}) => {
  useEffect(() => {
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
        
        // Update favicon
        if (settings.favicon) {
          // Remove existing favicon
          const existingFavicon = document.querySelector("link[rel='icon']");
          if (existingFavicon) {
            existingFavicon.remove();
          }
          
          // Add new favicon
          const link = document.createElement("link");
          link.rel = "icon";
          link.type = "image/png";
          link.href = settings.favicon;
          document.head.appendChild(link);
        }
      } catch (error) {
        console.warn('Failed to load head settings:', error);
      }
    };

    updateHead();
  }, [title, description, keywords]);

  return null; // This component doesn't render anything
};

export default DynamicHead;

