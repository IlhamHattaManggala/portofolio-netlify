import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchSettings } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import { POLLING_ENABLED } from "../config/api";

// Static fallback data untuk CTA
const staticCTAData = {
  enabled: true,
  title: "Butuh Jasa Pembuatan Website & Aplikasi?",
  description: "Kami menyediakan jasa pembuatan website, aplikasi mobile, dan solusi digital lainnya dengan kualitas terbaik.",
  buttonText: "Hubungi Sekarang",
  link: "https://baharistack.wuaze.com/?i=1",
};

const CallToAction = () => {
  const [ctaEnabled, setCtaEnabled] = useState(staticCTAData.enabled);
  const [ctaTitle, setCtaTitle] = useState(staticCTAData.title);
  const [ctaDescription, setCtaDescription] = useState(staticCTAData.description);
  const [ctaButtonText, setCtaButtonText] = useState(staticCTAData.buttonText);
  const [ctaLink, setCtaLink] = useState(staticCTAData.link);

  const loadCTASettings = async () => {
    try {
      const settings = await fetchSettings();
      
      // Check if CTA is enabled (handle string 'true' or '1')
      const ctaEnabledValue = settings.cta_enabled;
      const isEnabled = ctaEnabledValue === 'true' || ctaEnabledValue === '1';
      if (isEnabled) {
        setCtaEnabled(true);
      } else {
        setCtaEnabled(false);
        return; // Don't load other settings if disabled
      }
      
      if (settings.cta_title) {
        setCtaTitle(settings.cta_title);
      }
      if (settings.cta_description) {
        setCtaDescription(settings.cta_description);
      }
      if (settings.cta_button_text) {
        setCtaButtonText(settings.cta_button_text);
      }
      if (settings.cta_link) {
        setCtaLink(settings.cta_link);
      }
    } catch (error) {
      console.warn('Failed to load CTA settings, using static fallback data:', error);
      // Use static fallback data if API fails
      setCtaEnabled(staticCTAData.enabled);
      setCtaTitle(staticCTAData.title);
      setCtaDescription(staticCTAData.description);
      setCtaButtonText(staticCTAData.buttonText);
      setCtaLink(staticCTAData.link);
    }
  };

  useEffect(() => {
    loadCTASettings();
  }, []);

  // Setup polling untuk auto-refresh CTA settings
  usePolling({
    enabled: POLLING_ENABLED,
    interval: 30000, // 30 detik (sama seperti settings lainnya)
    onPoll: loadCTASettings,
  });

  if (!ctaEnabled) {
    return null;
  }

  return (
    <motion.section
      className="w-full py-16 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 flex justify-center items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center text-white max-w-2xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {ctaTitle}
        </h2>
        <p className="mb-8 text-lg md:text-xl text-blue-100">
          {ctaDescription}
        </p>
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {ctaButtonText}
        </a>
      </div>
    </motion.section>
  );
};

export default CallToAction;
