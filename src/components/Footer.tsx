import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchSettings } from "../services/api";

const Footer = () => {
  const [siteName, setSiteName] = useState("Ilham Hatta Manggala");
  const [email, setEmail] = useState("ilhamhattamanggala123@example.com");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinName, setLinkedinName] = useState("Ilham Hatta Manggala");
  const [footerDescription, setFooterDescription] = useState("Web & Flutter Developer yang berfokus pada solusi digital modern, antarmuka yang bersih, dan performa yang optimal.");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchSettings();
        
        if (settings.site_name) {
          setSiteName(settings.site_name);
        }
        
        if (settings.email) {
          setEmail(settings.email);
        }
        
        if (settings.linkedin_url) {
          setLinkedinUrl(settings.linkedin_url);
          // Extract name from LinkedIn URL or use site_name
          setLinkedinName(settings.site_name || "Ilham Hatta Manggala");
        }
        
        if (settings.footer_description) {
          setFooterDescription(settings.footer_description);
        }
      } catch (error) {
        console.warn('Failed to load footer settings, using defaults:', error);
      }
    };

    loadSettings();
  }, []);

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
              {siteName}
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              {footerDescription}
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
            {email && (
              <p className="text-gray-300 text-sm">
                Email: {email}
              </p>
            )}
            {linkedinUrl ? (
              <p className="text-gray-300 text-sm">
                LinkedIn: <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">{linkedinName}</a>
              </p>
            ) : (
              <p className="text-gray-300 text-sm">LinkedIn: {linkedinName}</p>
            )}
          </div>
        </motion.div>

        <hr className="my-8 border-gray-700" />
        <p className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} {siteName}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
