import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TechnologyCard from "../components/TechnologyCard";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { fetchSettings } from "../services/api";
import StarsBackground from "../components/StarsBackground";

const AboutSection = () => {
  const { technologies, loading } = usePortfolioData();
  const [aboutDescription, setAboutDescription] = useState(
    "Saya adalah seorang yang berfokus pada pengembangan website serta aplikasi mobile. Saya memiliki ketertarikan besar terhadap teknologi web dan mobile, khususnya dalam pengembangan menggunakan Flask, Laravel, React, Flutter, Bootstrap, dan Tailwind CSS."
  );

  useEffect(() => {
    const loadAboutDescription = async () => {
      try {
        const settings = await fetchSettings();
        if (settings.about_description) {
          setAboutDescription(settings.about_description);
        }
      } catch (error) {
        console.warn('Failed to load about description, using default:', error);
      }
    };

    loadAboutDescription();
  }, []);

  // Debug: Log ketika technologies berubah
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Technologies updated in AboutSection:', technologies.length, technologies);
    }
  }, [technologies]);

  if (loading) {
    return (
      <section className="dark:bg-gray-900 py-10 pt-10 min-h-screen my-10" id="about">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center min-h-screen">
          <p className="text-gray-600 dark:text-gray-400">Memuat data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="dark:bg-gray-900 py-10 pt-10 min-h-screen my-10 relative" id="about">
      <StarsBackground count={100} />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center min-h-screen relative z-10">
        {/* Text Content */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Tentang Saya
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10">
            {aboutDescription.split(/(\*\*.*?\*\*)/).map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
              }
              return <span key={index}>{part}</span>;
            })}
          </p>
        </motion.div>

        {/* Skills / Tech Section */}
        <div className="w-full flex flex-row flex-wrap justify-center gap-6 md:gap-8" id="skill">
          {technologies.map((technology, index) => (
            <TechnologyCard
              key={`${technology.name}-${index}-${technology.icon || ''}`}
              name={technology.name}
              icon={technology.icon || null}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
