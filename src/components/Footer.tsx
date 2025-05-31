import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Nama & Deskripsi */}
          <div className="md:col-span-5">
            <h2 className="text-2xl font-bold text-white">
              Ilham Hatta Manggala
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Web & Flutter Developer yang berfokus pada solusi digital modern,
              antarmuka yang bersih, dan performa yang optimal.
            </p>
          </div>

          {/* Spacer atau kolom kosong */}
          <div className="md:col-span-1" />

          {/* Navigasi */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#beranda" className="hover:text-white">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-white">
                  Tentang Saya
                </a>
              </li>
              <li>
                <a href="#portofolio" className="hover:text-white">
                  Proyek
                </a>
              </li>
              <li>
                <a href="#sertifikasi" className="hover:text-white">
                  Sertifikasi
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-white">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak Pribadi */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Hubungi Saya</h3>
            <p className="text-gray-300 text-sm">
              Email: ilhamhattamanggala123@example.com
            </p>
            <p className="text-gray-300 text-sm">LinkedIn: Ilham Hatta Manggala</p>
          </div>
        </motion.div>

        <hr className="my-8 border-gray-700" />
        <p className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Ilham Hatta Manggala. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
