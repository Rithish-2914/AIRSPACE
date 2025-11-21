import { useEffect } from "react";
import { useHandTracking } from "@/hooks/useHandTracking";
import { GestureCursor } from "./GestureCursor";
import { Loader2 } from "lucide-react";

interface WebcamFeedProps {
  onGestureChange?: (gesture: any) => void;
  onCursorMove?: (position: { x: number; y: number } | null) => void;
  onDepthChange?: (depth: number) => void;
}

export function WebcamFeed({ onGestureChange, onCursorMove, onDepthChange }: WebcamFeedProps) {
  const { videoRef, canvasRef, gesture, cursorPosition, depth, isTracking, error } = useHandTracking();

  // Notify parent components of changes in useEffect
  useEffect(() => {
    if (onGestureChange) onGestureChange(gesture);
  }, [gesture, onGestureChange]);

  useEffect(() => {
    if (onCursorMove) onCursorMove(cursorPosition);
  }, [cursorPosition, onCursorMove]);

  useEffect(() => {
    if (onDepthChange) onDepthChange(depth);
  }, [depth, onDepthChange]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Hidden video element */}
      <video
        ref={videoRef}
        className="hidden"
        playsInline
      />

      {/* Canvas for hand tracking visualization */}
      <canvas
        ref={canvasRef}
        data-testid="webcam-canvas"
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] opacity-60"
        width={1280}
        height={720}
      />

      {/* Overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {/* Loading state */}
      {!isTracking && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="text-center space-y-4">
            <Loader2 className="w-16 h-16 mx-auto text-blue-400 animate-spin" />
            <p className="text-white font-futuristic text-xl tracking-wider">
              INITIALIZING AIRSPACE
            </p>
            <p className="text-blue-300 text-sm">
              Activating hand tracking systems...
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="text-center space-y-4 max-w-md px-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-4xl">⚠️</span>
            </div>
            <p className="text-white font-futuristic text-xl">CAMERA ACCESS REQUIRED</p>
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-futuristic transition-colors"
              data-testid="button-reload"
            >
              RELOAD & GRANT ACCESS
            </button>
          </div>
        </div>
      )}

      {/* Gesture cursor */}
      <GestureCursor position={cursorPosition} gesture={gesture} />

      {/* Status HUD */}
      {isTracking && (
        <div className="absolute top-4 left-4 space-y-2 font-futuristic text-xs">
          <div className="px-3 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-blue-500/30 text-cyan-300">
            STATUS: <span className="text-green-400">TRACKING</span>
          </div>
          <div className="px-3 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-blue-500/30 text-cyan-300">
            GESTURE: <span className="text-blue-400">{gesture.type.toUpperCase()}</span>
          </div>
          {gesture.confidence > 0 && (
            <div className="px-3 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-blue-500/30 text-cyan-300">
              CONFIDENCE: <span className="text-purple-400">{(gesture.confidence * 100).toFixed(0)}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
