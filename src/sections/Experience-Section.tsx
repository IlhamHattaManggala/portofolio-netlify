import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchExperiences } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import { POLLING_INTERVAL, POLLING_ENABLED } from "../config/api";

interface Experience {
  id: number;
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  location?: string;
}

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExperiences = async () => {
    if (loading && experiences.length === 0) {
      setLoading(true);
    }
    
    try {
      const data = await fetchExperiences();
      setExperiences(data);
    } catch (error) {
      console.warn('Failed to load experiences, using empty array:', error);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  // Setup polling untuk auto-refresh experiences
  usePolling({
    enabled: POLLING_ENABLED,
    interval: POLLING_INTERVAL,
    onPoll: loadExperiences,
  });

  if (loading) {
    return (
      <section className="dark:bg-gray-900 py-16 px-6 min-h-screen" id="experience">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 text-center">Memuat data...</p>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="dark:bg-gray-900 py-16 px-6 min-h-screen" id="experience">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pengalaman
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Perjalanan karir dan pengalaman profesional saya
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-blue-600"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {experience.position}
                  </h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                    {experience.company}
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  {new Date(experience.start_date).toLocaleDateString('id-ID', { 
                    month: 'long', 
                    year: 'numeric' 
                  })} - {experience.is_current ? 'Sekarang' : experience.end_date ? new Date(experience.end_date).toLocaleDateString('id-ID', { 
                    month: 'long', 
                    year: 'numeric' 
                  }) : 'Sekarang'}
                </div>
              </div>
              {experience.location && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-left">
                  📍 {experience.location}
                </p>
              )}
              {experience.description && (
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  {experience.description.split('\n').filter(line => line.trim()).length > 1 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {experience.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                        <li key={idx} className="text-justify">{line.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-justify">{experience.description}</p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

