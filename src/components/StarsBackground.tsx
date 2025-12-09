import { motion } from 'framer-motion';

interface StarsBackgroundProps {
  count?: number;
  className?: string;
}

const StarsBackground = ({ count = 100, className = '' }: StarsBackgroundProps) => {
  // Generate random stars
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2, // Increased from 0.5-2.5 to 2-6px
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        zIndex: 0,
        background: 'transparent',
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.9)`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;

