import { motion } from "framer-motion";
import { useState } from "react";

interface TechnologyCardProps {
  name: string;
  icon: string | null;
  index: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ name, icon, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
        {/* Background gradient effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon */}
        {icon && !imageError ? (
          <img
            src={icon}
            alt={name}
            className="w-full h-full object-contain z-10 relative transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center z-10 relative">
            <span className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300 text-center px-2">
              {name}
            </span>
          </div>
        )}

        {/* Tooltip on hover */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            {name}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;

