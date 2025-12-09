import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";
import StarsBackground from "../components/StarsBackground";

const ContactSection: React.FC = () => {
  // State untuk feedback kirim pesan
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;

    setLoading(true);
    setSuccess(null);

    // Try API first, fallback to EmailJS
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setLoading(false);
        return;
      }
    } catch (error) {
      console.warn('API tidak tersedia, menggunakan EmailJS:', error);
    }

    // Fallback to EmailJS
    emailjs
      .sendForm(
        "porto_ilham31", // Service ID
        "contact_porto1", // Template ID
        form,
        "TSQoiJyFikGyPBpCD" // Public Key
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSuccess(true);
          form.reset();
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSuccess(false);
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-16 px-6 min-h-screen bg-gray-100 dark:bg-gray-900 relative"
    >
      <StarsBackground count={100} />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Kontak Saya
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Nama
            </label>
            <input
              type="text"
              name="user_name"
              placeholder="Nama Anda"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              placeholder="email@example.com"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Pesan
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Tulis pesan Anda di sini..."
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`relative inline-block px-6 py-3 font-medium border rounded-lg overflow-hidden group transition-colors duration-300 cursor-pointer
                ${
                  loading
                    ? "bg-gray-400 border-gray-400 cursor-not-allowed text-gray-200"
                    : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                }`}
            >
              <span className="absolute inset-0 w-full h-full bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </span>
              <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-600 transition-colors duration-300 z-20 pointer-events-none" />
            </button>
          </div>
        </motion.form>

        <motion.div
          className="mt-6 text-center font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: success !== null ? 1 : 0, y: success !== null ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          {success === true && (
            <p className="text-green-600">Pesan berhasil dikirim!</p>
          )}
          {success === false && (
            <p className="text-red-600">Gagal mengirim pesan, coba lagi nanti.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
