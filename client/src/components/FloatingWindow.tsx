import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize?: () => void;
  zIndex: number;
  onFocus: () => void;
  isMinimized?: boolean;
}

export function FloatingWindow({
  id,
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  onClose,
  onMinimize,
  zIndex,
  onFocus,
  isMinimized = false,
}: FloatingWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onFocus();
    }
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setSize(initialSize);
      setPosition(initialPosition);
    } else {
      setSize({ width: window.innerWidth - 100, height: window.innerHeight - 100 });
      setPosition({ x: 50, y: 50 });
    }
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      data-testid={`window-${id}`}
      className="fixed overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onMouseDown={onFocus}
    >
      {/* Glass-morphic window */}
      <div className="w-full h-full bg-slate-900/40 backdrop-blur-2xl rounded-2xl border-2 border-blue-500/30 shadow-neon-blue overflow-hidden flex flex-col">
        {/* Title bar */}
        <div
          className="window-header flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-400/30 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-futuristic text-cyan-300 tracking-wider">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {onMinimize && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-cyan-400 hover:bg-blue-500/20"
                onClick={onMinimize}
                data-testid={`button-minimize-${id}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-cyan-400 hover:bg-blue-500/20"
              onClick={toggleMaximize}
              data-testid={`button-maximize-${id}`}
            >
              {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-red-400 hover:bg-red-500/20"
              onClick={onClose}
              data-testid={`button-close-${id}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
