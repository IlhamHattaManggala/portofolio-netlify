import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Code */}
          <motion.h1
            className="text-9xl md:text-[12rem] font-extrabold text-blue-600 dark:text-blue-500 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Halaman Tidak Ditemukan
          </motion.h2>

          <motion.p
            className="text-gray-700 dark:text-gray-300 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            Mari kembali ke halaman utama.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-blue-600 border border-blue-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-700"
            >
              <Home className="mr-2 w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              <span>Kembali Sebelumnya</span>
            </button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-blue-600 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;

