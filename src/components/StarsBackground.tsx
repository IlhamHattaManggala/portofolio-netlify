interface StarsBackgroundProps {
  count?: number;
  className?: string;
}

const StarsBackground = ({ count = 100, className = '' }: StarsBackgroundProps) => {
  // Generate random stars (static, no animation)
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2, // 2-6px
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
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.9)`,
            opacity: 0.6, // Static opacity
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;

