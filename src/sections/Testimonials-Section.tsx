import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import type { TTestimonial } from "../components/types";
import StarsBackground from "../components/StarsBackground";

const TestimonialsSection = () => {
  const { testimonials } = usePortfolioData();
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TTestimonial | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (testimonial: TTestimonial) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTestimonial(null);
  };

  const handleCardHover = (hovering: boolean) => {
    setIsHovered(hovering);
  };

  return (
    <section className="dark:bg-gray-900 py-16 px-6 min-h-screen relative" id="testimonials">
      <StarsBackground count={100} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Testimoni
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Apa kata mereka tentang saya
          </p>
        </motion.div>

        {/* Testimonials 1 Baris Horizontal dengan Animasi Scroll */}
        {testimonials.length > 0 && (
          <div 
            className="overflow-hidden relative"
            onMouseEnter={() => handleCardHover(true)}
            onMouseLeave={() => handleCardHover(false)}
          >
            <div
              ref={scrollContainerRef}
              className="flex gap-6"
              style={{
                width: 'max-content',
                animation: !isHovered && !showModal ? 'scrollTestimonials 30s linear infinite' : 'none',
              }}
            >
              {/* Duplicate testimonials untuk infinite scroll */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => handleCardClick(testimonial)}
                  onMouseEnter={() => handleCardHover(true)}
                  onMouseLeave={() => handleCardHover(false)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col w-80 flex-shrink-0"
                >
                  {/* Profile, Nama, dan Perusahaan - Paling Atas, Rata Kiri */}
                  <div className="flex items-center gap-3 mb-4">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center ${
                        testimonial.image ? 'hidden' : ''
                      }`}
                    >
                      <span className="text-gray-600 dark:text-gray-300 font-semibold">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      {(testimonial.position || testimonial.company) && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.position}
                          {testimonial.position && testimonial.company ? ' at ' : ''}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bintang-bintang - Di Bawah Profile/Nama */}
                  {testimonial.rating && (
                    <div className="flex justify-start mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Testimoni/Deskripsi - Di Bawah Bintang, Rata Kanan-Kiri, Maksimal 3 Baris */}
                  <p className="text-gray-700 dark:text-gray-300 italic text-justify line-clamp-3">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada testimoni.
            </p>
          </div>
        )}

        {/* Modal Popup untuk Testimoni Lengkap */}
        {showModal && selectedTestimonial && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Testimoni Lengkap
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Profile, Nama, dan Perusahaan */}
              <div className="flex items-center gap-3 mb-4">
                {selectedTestimonial.image ? (
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center ${
                    selectedTestimonial.image ? 'hidden' : ''
                  }`}
                >
                  <span className="text-gray-600 dark:text-gray-300 font-semibold text-xl">
                    {selectedTestimonial.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {selectedTestimonial.name}
                  </h4>
                  {(selectedTestimonial.position || selectedTestimonial.company) && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedTestimonial.position}
                      {selectedTestimonial.position && selectedTestimonial.company ? ' at ' : ''}
                      {selectedTestimonial.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Bintang-bintang */}
              {selectedTestimonial.rating && (
                <div className="flex justify-start mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < selectedTestimonial.rating! ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Testimoni Lengkap */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 italic text-justify text-lg leading-relaxed">
                  "{selectedTestimonial.content}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
