import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchSettings } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import mobileImg from "../assets/my-profile.png"; // gambar untuk layar kecil
import StarsBackground from "../components/StarsBackground";
import "../components/css/hero.css";

const HeroSection = () => {
  const [heroName, setHeroName] = useState("Ilham Hatta Manggala");
  const [professions, setProfessions] = useState<string[]>(["Frontend Developer", "Flutter Developer"]);
  const [heroImage, setHeroImage] = useState(mobileImg);

  const loadSettings = async () => {
    try {
      const settings = await fetchSettings();
      
      if (settings.site_name) {
        setHeroName(settings.site_name);
      }
      
      if (settings.hero_professions) {
        try {
          const parsed = JSON.parse(settings.hero_professions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProfessions(parsed);
          }
        } catch (e) {
          console.warn('Failed to parse hero_professions:', e);
        }
      }

      if (settings.hero_image) {
        setHeroImage(settings.hero_image);
      }
    } catch (error) {
      console.warn('Failed to load hero settings, using defaults:', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Setup polling untuk settings dengan interval lebih lama (30 detik)
  // karena settings jarang berubah
  usePolling({
    enabled: true,
    interval: 30000, // 30 detik
    onPoll: loadSettings,
  });

  return (
    <section
      className="dark:bg-gray-900 min-h-screen pt-10 relative overflow-hidden"
      id="hero"
    >
      <StarsBackground count={120} />
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center min-h-screen relative z-10 text-center">
        {/* Gambar mengambang */}
        <motion.img
          src={heroImage}
          alt="Profile Floating"
          className="w-52 sm:w-64 lg:w-72 absolute top-10 mx-auto left-0 right-0 opacity-90 pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          onError={() => setHeroImage(mobileImg)}
        />

        {/* Konten teks */}
        <motion.div
          className="relative z-20 mt-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Halo, Saya{" "}
            <span className="text-blue-600">{heroName}</span>
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
            Seorang yang berfokus pada{" "}
            <span className="text-blue-600 font-semibold">
              <Typewriter
                words={professions}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </p>

          {/* Tombol */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="relative inline-block px-6 py-3 font-medium text-blue-600 bg-blue-600 border border-blue-600 rounded-lg overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10 group-hover:text-blue-600 text-white transition-colors duration-300">
                Hubungi Saya
              </span>
            </a>
            <a
              href="#project"
              className="relative inline-block px-6 py-3 font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden group transition-colors duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Lihat Proyek
              </span>
              <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-600 transition-colors duration-300 z-20 pointer-events-none" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
