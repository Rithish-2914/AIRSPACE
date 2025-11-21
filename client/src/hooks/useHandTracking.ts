import { useEffect, useRef, useState } from "react";
import * as mpHands from "@mediapipe/hands";
import * as camUtils from "@mediapipe/camera_utils";
import { GestureDetector } from "@/lib/gestures";
import type { Gesture } from "@shared/schema";

interface UseHandTrackingReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  gesture: Gesture;
  cursorPosition: { x: number; y: number } | null;
  depth: number;
  isTracking: boolean;
  error: string | null;
}

export function useHandTracking(): UseHandTrackingReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gesture, setGesture] = useState<Gesture>({ type: 'none', confidence: 0 });
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [depth, setDepth] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const gestureDetectorRef = useRef(new GestureDetector());
  const handsRef = useRef<mpHands.Hands | null>(null);
  const cameraRef = useRef<camUtils.Camera | null>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    // Set canvas dimensions
    canvasElement.width = 1280;
    canvasElement.height = 720;

    // Initialize MediaPipe Hands
    const hands = new mpHands.Hands({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results: mpHands.Results) => {
      if (!canvasElement) return;

      const canvasCtx = canvasElement.getContext("2d");
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      // Draw hand landmarks
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const handsData = results.multiHandLandmarks.map((landmarks: any, idx: number) => ({
          landmarks,
          handedness: results.multiHandedness?.[idx]?.label || 'Unknown',
        }));

        // Draw landmarks and connections
        for (const handData of handsData) {
          // Draw connections
          canvasCtx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
          canvasCtx.lineWidth = 2;
          
          const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
            [0, 5], [5, 6], [6, 7], [7, 8], // Index
            [0, 9], [9, 10], [10, 11], [11, 12], // Middle
            [0, 13], [13, 14], [14, 15], [15, 16], // Ring
            [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
            [5, 9], [9, 13], [13, 17], // Palm
          ];

          for (const [start, end] of connections) {
            const startPoint = handData.landmarks[start];
            const endPoint = handData.landmarks[end];
            canvasCtx.beginPath();
            canvasCtx.moveTo(startPoint.x * canvasElement.width, startPoint.y * canvasElement.height);
            canvasCtx.lineTo(endPoint.x * canvasElement.width, endPoint.y * canvasElement.height);
            canvasCtx.stroke();
          }

          // Draw landmarks
          for (const landmark of handData.landmarks) {
            canvasCtx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            canvasCtx.beginPath();
            canvasCtx.arc(
              landmark.x * canvasElement.width,
              landmark.y * canvasElement.height,
              4,
              0,
              2 * Math.PI
            );
            canvasCtx.fill();
          }
        }

        // Detect gestures
        const detectedGesture = gestureDetectorRef.current.detectGesture(handsData);
        setGesture(detectedGesture);

        // Update cursor position
        const cursor = gestureDetectorRef.current.getCursorPosition(
          handsData,
          canvasElement.width,
          canvasElement.height
        );
        setCursorPosition(cursor);

        // Update depth
        const depthValue = gestureDetectorRef.current.getDepth(handsData);
        setDepth(depthValue);
      } else {
        setGesture({ type: 'none', confidence: 0 });
        setCursorPosition(null);
      }

      canvasCtx.restore();
    });

    handsRef.current = hands;

    // Start camera
    navigator.mediaDevices
      .getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      })
      .then((stream) => {
        if (!videoElement) return;
        
        videoElement.srcObject = stream;
        
        videoElement.onloadedmetadata = () => {
          videoElement.play().then(() => {
            const camera = new camUtils.Camera(videoElement, {
              onFrame: async () => {
                if (handsRef.current && videoElement && videoElement.readyState === 4) {
                  try {
                    await handsRef.current.send({ image: videoElement });
                  } catch (error) {
                    console.error("Error sending frame to MediaPipe:", error);
                  }
                }
              },
              width: 1280,
              height: 720,
            });
            
            camera.start();
            cameraRef.current = camera;
            setIsTracking(true);
          }).catch((playError) => {
            console.error("Error playing video:", playError);
            setError("Failed to start video stream.");
          });
        };
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        setError("Camera access denied. Please enable camera permissions to use AIRSPACE.");
      });

    return () => {
      // Stop camera and close hands
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
      
      // Stop all media tracks
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    gesture,
    cursorPosition,
    depth,
    isTracking,
    error,
  };
}
