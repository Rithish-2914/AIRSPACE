import { motion } from "framer-motion";
import type { Gesture } from "@shared/schema";

interface GestureCursorProps {
  position: { x: number; y: number } | null;
  gesture: Gesture;
}

export function GestureCursor({ position, gesture }: GestureCursorProps) {
  if (!position) return null;

  const getCursorColor = () => {
    switch (gesture.type) {
      case 'pinch':
        return 'bg-cyan-400';
      case 'fist':
        return 'bg-purple-500';
      case 'open':
        return 'bg-green-400';
      default:
        return 'bg-blue-400';
    }
  };

  const getCursorSize = () => {
    return gesture.type === 'pinch' ? 'w-6 h-6' : 'w-8 h-8';
  };

  return (
    <motion.div
      data-testid="gesture-cursor"
      className="fixed pointer-events-none z-[999]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: gesture.type === 'pinch' ? 0.7 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Outer ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${
          gesture.type === 'pinch' ? 'border-cyan-400' : 'border-blue-400'
        } ${getCursorSize()}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Inner cursor */}
      <div
        className={`${getCursorSize()} ${getCursorColor()} rounded-full shadow-neon-blue opacity-80`}
      />
      
      {/* Gesture indicator */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white font-futuristic whitespace-nowrap">
        {gesture.type.toUpperCase()}
      </div>
    </motion.div>
  );
}
