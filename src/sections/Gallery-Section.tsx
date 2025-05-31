import { useState, useEffect, useRef } from "react";
import { sertifikat } from "../components/constant";

const GallerySertifikat = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(
    sertifikat.slice(0, itemsPerPage)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [modalImage, setModalImage] = useState<string | null>(null);

  const totalPages = Math.ceil(sertifikat.length / itemsPerPage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      setVisibleItems(sertifikat.slice(startIndex, startIndex + itemsPerPage));
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="sertifikasi"
      className={`dark:bg-gray-900 py-16 px-6 min-h-screen
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Gallery Sertifikat
        </h2>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {visibleItems.map(({ id, title, platform, image }, index) => (
            <div
              key={id}
              className={`break-inside-avoid bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl cursor-pointer
                transform transition duration-700 ease-out
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
                height: "300px", // fixed height supaya rata
                display: "flex",
                flexDirection: "column",
              }}
              title={title}
              onClick={() => image && setModalImage(image)}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
                style={{ flexShrink: 0 }}
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {platform}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-3">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Modal Fullscreen Image */}
        {modalImage && (
          <>
            {/* Overlay semi-transparent fullscreen yang agak blur tapi tidak full black */}
            <div
              onClick={() => setModalImage(null)}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 cursor-pointer"
            />
            {/* Modal image container */}
            <div
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-gray-900 rounded-lg shadow-lg p-4 max-w-[90vw] max-h-[80vh] cursor-auto"
            >
              <img
                src={modalImage}
                alt="Full view"
                className="rounded-lg max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GallerySertifikat;
