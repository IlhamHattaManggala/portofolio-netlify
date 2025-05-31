import { useState } from "react";
import myLogo from "../assets/my-profile.png";
import "../App.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={myLogo} alt="Logo" className="h-8 w-8" />
            <a href="/" className="text-xl font-bold">
              Ilham Hatta Manggala
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="nav-box hidden md:flex items-center">
            <a
              href="#hero"
              className="text-neutral-800 dark:text-white my-1 px-5 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Beranda</span>
            </a>
            <a
              href="#about"
              className="text-neutral-800 dark:text-white my-1 px-5 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Tentang</span>
            </a>
            <a
              href="#project"
              className="text-neutral-800 dark:text-white my-1 px-5 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Project</span>
            </a>
            <a
              href="#sertifikasi"
              className="text-neutral-800 dark:text-white my-1 px-5 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Sertifikasi</span>
            </a>
            <a
              href="#contact"
              className="text-neutral-800 dark:text-white my-1 px-5 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:text-white"
            >
              <span>Kontak</span>
            </a>
            <div className="hidden md:flex">
              <a
                href="/CV - ILHAM HATTA MANGGALA.pdf"
                download
                className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
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
          <div className="absolute top-18 left-2 right-2 md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg py-4 px-6 space-y-3 z-50">
            <a
              href="#home"
              className="block text-neutral-800 dark:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              Beranda
            </a>
            <a
              href="#about"
              className="block text-neutral-800 dark:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              Tentang
            </a>
            <a
              href="#project"
              className="block text-neutral-800 dark:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              Project
            </a>
            <a
              href="#sertifikasi"
              className="block text-neutral-800 dark:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              Sertifikasi
            </a>
            <a
              href="#contact"
              className="block text-neutral-800 dark:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              Kontak
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
