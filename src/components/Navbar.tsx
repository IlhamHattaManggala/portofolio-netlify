import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSettings } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import myLogo from "../assets/my-profile.png";
import "../App.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logo, setLogo] = useState(myLogo);
  const [siteName, setSiteName] = useState("Ilham Hatta Manggala");
  const [resumeUrl, setResumeUrl] = useState("/CV - ILHAM HATTA MANGGALA.pdf");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === "/";
  
  // Handle navigation for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    
    if (isHomePage) {
      // If on homepage, just scroll to the section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on homepage, navigate to homepage first
      navigate('/');
      // After navigation, set hash and scroll to the section
      setTimeout(() => {
        window.location.hash = hash;
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Close mobile menu if open
    setIsMobileOpen(false);
  };

  const loadSettings = async () => {
    try {
      const settings = await fetchSettings();
      
      // Use hero_image as logo (fallback to logo if hero_image not available)
      if (settings.hero_image) {
        setLogo(settings.hero_image);
      } else if (settings.logo) {
        setLogo(settings.logo);
      }
      
      if (settings.site_name) {
        setSiteName(settings.site_name);
      }
      
      if (settings.resume_pdf) {
        setResumeUrl(settings.resume_pdf);
      }
    } catch (error) {
      console.warn('Failed to load navbar settings, using defaults:', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Setup polling untuk settings dengan interval lebih lama (2 jam)
  // karena settings jarang berubah
  usePolling({
    enabled: true,
    interval: 7200000, // 2 jam (2 * 60 * 60 * 1000 ms)
    onPoll: loadSettings,
  });

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 w-8" 
              onError={() => setLogo(myLogo)}
            />
            <a href="/" className="text-xl font-bold">
              {siteName}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="nav-box hidden md:flex items-center gap-1">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Beranda</span>
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Tentang</span>
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, "#experience")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Pengalaman</span>
            </a>
            <a
              href="#project"
              onClick={(e) => handleNavClick(e, "#project")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Project</span>
            </a>
            <a
              href="#sertifikasi"
              onClick={(e) => handleNavClick(e, "#sertifikasi")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Sertifikasi</span>
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick(e, "#testimonials")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Testimoni</span>
            </a>
            <a
              href="/blog"
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Blog</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="text-neutral-800 dark:text-white my-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Kontak</span>
            </a>
            <div className="hidden md:flex ml-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-gray-700 dark:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Floating Menu */}
        {isMobileOpen && (
          <div className="absolute top-18 left-2 right-2 md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg py-4 px-6 space-y-2 z-50">
            <a
              href="#hero"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#hero")}
            >
              Beranda
            </a>
            <a
              href="#about"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#about")}
            >
              Tentang
            </a>
            <a
              href="#experience"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#experience")}
            >
              Pengalaman
            </a>
            <a
              href="#project"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#project")}
            >
              Project
            </a>
            <a
              href="#sertifikasi"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#sertifikasi")}
            >
              Sertifikasi
            </a>
            <a
              href="#testimonials"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#testimonials")}
            >
              Testimoni
            </a>
            <a
              href="/blog"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={() => setIsMobileOpen(false)}
            >
              Blog
            </a>
            <a
              href="#contact"
              className="block text-neutral-800 dark:text-white text-sm py-1.5"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Kontak
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm mt-2"
              onClick={() => setIsMobileOpen(false)}
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
