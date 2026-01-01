import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "../hooks/usePortfolioData";
import type { TTestimonial } from "../components/types";
import StarsBackground from "../components/StarsBackground";

const TestimonialsSection = () => {
  const { testimonials: staticTestimonials } = usePortfolioData();
  const [testimonials, setTestimonials] = useState<TTestimonial[]>(staticTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TTestimonial | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Simulate network request
    setTimeout(() => {
        // Create a new dummy testimonial
        const newTestimonial: TTestimonial = {
            id: Date.now(),
            name: formData.name,
            position: formData.position || undefined,
            company: formData.company || undefined,
            content: formData.content,
            rating: formData.rating || undefined,
            image: undefined // Can't handle image upload without backend
        };

        setTestimonials([...testimonials, newTestimonial]);
        setSubmitSuccess(true);
        setFormData({
            name: "",
            position: "",
            company: "",
            content: "",
            rating: 5,
            image: null,
        });
        setSubmitting(false);

        // Hide form after delay
        setTimeout(() => {
            setShowForm(false);
            setSubmitSuccess(false);
        }, 2000);
    }, 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

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
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {showForm ? "Tutup Form" : "Berikan Testimoni"}
          </button>
        </motion.div>

        {/* Testimonial Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Berikan Testimoni Anda
            </h3>
            
            {submitSuccess && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                Terima kasih! Testimoni Anda telah dikirim dan akan ditinjau oleh admin.
              </div>
            )}
            
            {submitError && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Posisi / Jabatan
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Contoh: Frontend Developer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Perusahaan / Organisasi
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Nama perusahaan (opsional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Testimoni <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tulis testimoni Anda di sini..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating (1-5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 ⭐⭐⭐⭐</option>
                    <option value={3}>3 ⭐⭐⭐</option>
                    <option value={2}>2 ⭐⭐</option>
                    <option value={1}>1 ⭐</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Foto Profil (Opsional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {formData.image && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      File: {formData.image.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Mengirim..." : "Kirim Testimoni"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSubmitError(null);
                    setSubmitSuccess(false);
                  }}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200 font-medium"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        )}

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

        {testimonials.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada testimoni. Jadilah yang pertama memberikan testimoni!
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
