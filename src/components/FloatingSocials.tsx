import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown } from "react-icons/fa";

const FloatingSocials = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Teks dan panah */}
      <div className="flex flex-col items-center text-center">
        <span className="text-base font-bold text-white bg-white px-3 py-1 rounded-full shadow-md dark:bg-gray-800 dark:text-white">
          Ikuti Saya
        </span>
        <FaArrowDown
          className="mt-2 text-white dark:text-white animate-bounce"
          size={20}
        />
      </div>

      {/* Tombol sosial media */}
      <a
        href="https://github.com/IlhamHattaManggala"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white hover:bg-black text-black hover:text-white border border-gray-300 hover:border-black rounded-full p-3 shadow-lg transition-colors duration-300"
      >
        <FaGithub size={20} />
      </a>
      <a
        href="https://linkedin.com/in/ilham-hatta-manggala"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-300 hover:border-blue-600 rounded-full p-3 shadow-lg transition-colors duration-300"
      >
        <FaLinkedin size={20} />
      </a>
      <a
        href="https://instagram.com/runtahhhh__"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white hover:bg-pink-500 text-pink-500 hover:text-white border border-pink-300 hover:border-pink-500 rounded-full p-3 shadow-lg transition-colors duration-300"
      >
        <FaInstagram size={20} />
      </a>
    </div>
  );
};

export default FloatingSocials;
