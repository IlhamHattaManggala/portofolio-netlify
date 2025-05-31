import { motion } from "framer-motion";
import { BallCanvas } from "../components/canvas";
import { technologies } from "../components/constant";

const AboutSection = () => {
  return (
    <section className="dark:bg-gray-900 py-10 pt-10 min-h-screen my-10" id="about">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center min-h-screen">
        {/* Text Content */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Tentang Saya
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10">
            Saya adalah seorang mahasiswa yang berfokus pada pengembangan website
            serta aplikasi mobile. Saya memiliki ketertarikan besar terhadap teknologi web dan
            mobile, khususnya dalam pengembangan menggunakan{" "}
            <strong>Flask</strong>, <strong>Laravel</strong>,{" "}
            <strong>React</strong>, <strong>Flutter</strong>,{" "}
            <strong>Bootstrap</strong>, dan <strong>Tailwind CSS</strong>.
          </p>
        </motion.div>

        {/* Skills / Tech Section */}
        <div className="w-full flex flex-row flex-wrap justify-center gap-10" id="skill">
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name + index}
              className="h-28 w-28"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <BallCanvas icon={technology.icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
