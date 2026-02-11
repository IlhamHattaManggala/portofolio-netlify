import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchSettings } from "../services/api";
import { usePolling } from "../hooks/usePolling";
import { POLLING_ENABLED } from "../config/api";
import StarsBackground from "../components/StarsBackground";

// Static fallback data untuk CTA
const staticCTAData = {
  enabled: true,
  title: "Butuh Jasa Pembuatan Website & Aplikasi?",
  description: "Kami menyediakan jasa pembuatan website, aplikasi mobile, dan solusi digital lainnya dengan kualitas terbaik.",
  buttonText: "Hubungi Sekarang",
  link: "https://baharistack.wuaze.com/?i=1",
};

const CallToAction = () => {
  return (
    <motion.section
      className="w-full py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <StarsBackground count={80} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Umum */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center text-white flex flex-col justify-between hover:bg-white/20 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Jasa Pembuatan Website & Aplikasi
              </h2>
              <p className="mb-8 text-blue-100 text-lg">
                Saya menyediakan jasa pembuatan website profesional, aplikasi mobile, dan solusi digital kreatif lainnya untuk kebutuhan bisnis atau personal Anda.
              </p>
            </div>
            <div>
              <a
                href="https://wa.me/6285959146408?text=Halo%20Ilham,%20saya%20ingin%20tanya%20tentang%20jasa%20pembuatan%20website/aplikasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Hubungi Sekarang (Umum)
              </a>
            </div>
          </motion.div>

          {/* Card 2: Mahasiswa */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center text-white flex flex-col justify-between hover:bg-white/20 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Jasa Joki Tugas Teknologi
              </h2>
              <p className="mb-8 text-blue-100 text-lg">
                Khusus untuk Mahasiswa: Saya membantu memberikan bimbingan dan pengerjaan tugas teknologi, pemrograman, atau proyek akhir dengan jaminan kualitas dan pemahaman.
              </p>
            </div>
            <div>
              <a
                href="https://wa.me/6285959146408?text=Halo%20Ilham,%20saya%20ingin%20tanya%20tentang%20jasa%20joki%20tugas%20IT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full px-8 py-4 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-white transition-all duration-200 shadow-lg"
              >
                Konsultasi Tugas (Mahasiswa)
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
