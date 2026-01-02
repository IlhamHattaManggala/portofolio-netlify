import { motion } from "framer-motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import StarsBackground from "../components/StarsBackground";

const ExperienceSection = () => {
  const { experiences, loading } = usePortfolioData();

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
    <section className="dark:bg-gray-900 py-20 px-6 min-h-screen relative" id="experience">
      <StarsBackground count={100} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Vertical Line - hanya di desktop */}
              {index < experiences.length - 1 && (
                <div className="hidden md:block absolute left-[15px] top-16 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
              )}

              <div className="flex gap-6">
                {/* Date Badge - Desktop */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-4 text-left">
                      <div className="mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 text-left">
                          {experience.position}
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-medium text-left">
                          {experience.company}
                        </p>
                      </div>

                      {/* Date, Location & Status */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-xs" />
                          <span className="font-medium">
                            {new Date(experience.start_date).toLocaleDateString('id-ID', { 
                              month: 'short', 
                              year: 'numeric' 
                            })} - {experience.is_current ? 'Sekarang' : experience.end_date ? new Date(experience.end_date).toLocaleDateString('id-ID', { 
                              month: 'short', 
                              year: 'numeric' 
                            }) : 'Sekarang'}
                          </span>
                        </div>
                        {experience.location && (
                          <div className="flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-xs" />
                            <span>{experience.location}</span>
                          </div>
                        )}
                        {experience.is_current && (
                          <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                            Posisi Aktif
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {experience.description && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-left">
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-left">
                          {experience.description.split('\n').filter(line => line.trim()).length > 1 ? (
                            <ul className="space-y-2.5 text-left">
                              {experience.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-left">
                                  <span className="text-blue-600 dark:text-blue-400 mt-1.5 flex-shrink-0 text-xs">●</span>
                                  <span className="flex-1 text-[15px] leading-relaxed text-left">{line.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-[15px] leading-relaxed text-left">{experience.description}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

