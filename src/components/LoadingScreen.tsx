import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent body scroll when loading
    document.body.style.overflow = 'hidden';
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            document.body.style.overflow = '';
          }, 400);
          return 100;
        }
        // Smooth progress - slower for longer loading time
        const increment = prev < 70 ? Math.random() * 8 + 3 : Math.random() * 1.5 + 0.3;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isComplete ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto overflow-hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          background: 'rgb(17, 24, 39)', // Same as portfolio background (gray-900)
        }}
      >
        <div className="relative z-10 text-center px-4">
          {/* Cute Bear Character */}
          <motion.div
            className="mb-10"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Bear Head */}
            <div className="relative inline-block">
              <motion.div
                className="w-32 h-32 bg-amber-200 rounded-full shadow-2xl flex items-center justify-center relative"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Ears */}
                <motion.div
                  className="absolute -top-2 left-2 w-12 h-12 bg-amber-300 rounded-full"
                  animate={{
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -top-2 right-2 w-12 h-12 bg-amber-300 rounded-full"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Inner Ears */}
                <div className="absolute -top-1 left-4 w-6 h-6 bg-pink-300 rounded-full"></div>
                <div className="absolute -top-1 right-4 w-6 h-6 bg-pink-300 rounded-full"></div>

                {/* Eyes */}
                <div className="flex gap-4 mb-2">
                  <motion.div
                    className="relative"
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: 0,
                    }}
                  >
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                  <motion.div
                    className="relative"
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: 0.1,
                    }}
                  >
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </div>
                
                {/* Nose */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-5 h-4 bg-black rounded-full"></div>
                </div>

                {/* Mouth */}
                <motion.div
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scaleY: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-8 h-4 border-3 border-black border-t-transparent rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Loading Dots Around Bear */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute w-3 h-3 bg-white rounded-full"
                    style={{
                      left: `${50 + Math.cos((index * 2 * Math.PI) / 3) * 80}%`,
                      top: `${50 + Math.sin((index * 2 * Math.PI) / 3) * 80}%`,
                    }}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.h2
            className="text-xl md:text-2xl font-semibold text-white mb-6"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Memuat Portfolio...
          </motion.h2>

          {/* Simple Progress Bar */}
          <div className="w-64 max-w-[80vw] mx-auto mb-3">
            <div className="h-1.5 bg-white/25 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="text-xs font-medium text-white/80"
            key={progress}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
