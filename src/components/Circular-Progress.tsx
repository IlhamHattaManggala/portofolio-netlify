import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import type { CircularProgressProps } from "../components/types";
import React from "react";

export const CircularProgress = ({
  percentage,
  label,
  size = 120,
  strokeWidth = 10,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false }); // ⬅️ ubah di sini

  React.useEffect(() => {
    if (inView) {
      controls.start({
        strokeDashoffset: circumference - (percentage / 100) * circumference,
        transition: { duration: 1.5, ease: "easeOut" },
      });
    } else {
      controls.set({ strokeDashoffset: circumference }); // ⬅️ reset ketika keluar dari viewport
    }
  }, [inView, controls, circumference, percentage]);

  return (
    <div className="flex flex-col items-center justify-center" ref={ref}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={controls}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-lg font-bold fill-blue-600"
        >
          {percentage}%
        </text>
      </svg>
      <span className="mt-2 text-sm font-medium text-gray-800 dark:text-white">
        {label}
      </span>
    </div>
  );
};
