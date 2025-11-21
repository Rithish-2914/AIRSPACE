import type { Gesture } from "@shared/schema";
import type { NormalizedLandmarkList } from "@mediapipe/hands";

export interface HandLandmarks {
  landmarks: NormalizedLandmarkList;
  handedness: string;
}

export class GestureDetector {
  private lastPosition: { x: number; y: number } | null = null;
  private lastTimestamp = 0;
  private swipeThreshold = 0.12;
  private pinchThreshold = 0.06;
  private swipeVelocityThreshold = 0.5;

  detectGesture(hands: HandLandmarks[]): Gesture {
    if (!hands || hands.length === 0) {
      this.lastPosition = null;
      return { type: 'none', confidence: 0 };
    }

    const hand = hands[0];
    const landmarks = hand.landmarks;

    // Index finger tip (landmark 8)
    const indexTip = landmarks[8];
    const indexMcp = landmarks[5];
    
    // Thumb tip (landmark 4)
    const thumbTip = landmarks[4];
    const thumbIp = landmarks[3];
    
    // Middle finger tip (landmark 12)
    const middleTip = landmarks[12];
    
    // Get current position (index finger tip)
    const currentPos = { x: indexTip.x, y: indexTip.y };

    // Calculate distances
    const thumbIndexDist = this.distance(thumbTip, indexTip);
    const thumbMiddleDist = this.distance(thumbTip, middleTip);

    // Pinch detection (thumb and index close)
    if (thumbIndexDist < this.pinchThreshold) {
      return {
        type: 'pinch',
        confidence: 1 - (thumbIndexDist / this.pinchThreshold),
        position: { x: indexTip.x, y: indexTip.y },
      };
    }

    // Detect if fingers are extended
    const indexExtended = indexTip.y < indexMcp.y;
    const middleExtended = middleTip.y < landmarks[9].y;
    const ringExtended = landmarks[16].y < landmarks[13].y;
    const pinkyExtended = landmarks[20].y < landmarks[17].y;
    const thumbExtended = thumbTip.x < thumbIp.x || thumbTip.x > thumbIp.x;

    const extendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended, thumbExtended].filter(Boolean).length;

    // Fist detection (all fingers curled)
    if (extendedCount <= 1) {
      return {
        type: 'fist',
        confidence: 0.8,
        position: currentPos,
      };
    }

    // Open palm detection (all fingers extended)
    if (extendedCount >= 4) {
      return {
        type: 'open',
        confidence: 0.8,
        position: currentPos,
      };
    }

    // Point gesture (index extended, others curled)
    if (indexExtended && !middleExtended && !ringExtended) {
      const currentTime = Date.now();
      
      // Detect swipe gestures with velocity
      if (this.lastPosition && this.lastTimestamp) {
        const dx = currentPos.x - this.lastPosition.x;
        const dy = currentPos.y - this.lastPosition.y;
        const dt = (currentTime - this.lastTimestamp) / 1000;
        const velocityX = Math.abs(dx / dt);
        const velocityY = Math.abs(dy / dt);
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > this.swipeThreshold && absDx > absDy && velocityX > this.swipeVelocityThreshold) {
          const type = dx > 0 ? 'swipe-right' : 'swipe-left';
          this.lastPosition = currentPos;
          this.lastTimestamp = currentTime;
          return { type, confidence: Math.min(0.95, velocityX / 2), position: currentPos };
        }

        if (absDy > this.swipeThreshold && absDy > absDx && velocityY > this.swipeVelocityThreshold) {
          const type = dy > 0 ? 'swipe-down' : 'swipe-up';
          this.lastPosition = currentPos;
          this.lastTimestamp = currentTime;
          return { type, confidence: Math.min(0.95, velocityY / 2), position: currentPos };
        }
      }

      this.lastPosition = currentPos;
      this.lastTimestamp = currentTime;
      return {
        type: 'point',
        confidence: 0.9,
        position: currentPos,
      };
    }

    // Two finger detection for rotate
    if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
      const angle = Math.atan2(
        middleTip.y - indexTip.y,
        middleTip.x - indexTip.x
      );
      
      return {
        type: 'two-finger-rotate',
        confidence: 0.8,
        position: currentPos,
        data: { angle, separation: this.distance(indexTip, middleTip) },
      };
    }

    this.lastPosition = currentPos;
    this.lastTimestamp = Date.now();
    return {
      type: 'point',
      confidence: 0.5,
      position: currentPos,
    };
  }

  private distance(p1: { x: number; y: number; z?: number }, p2: { x: number; y: number; z?: number }): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = (p1.z || 0) - (p2.z || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  getDepth(hands: HandLandmarks[]): number {
    if (!hands || hands.length === 0) return 0;
    
    // Use wrist z-coordinate as depth indicator
    const wrist = hands[0].landmarks[0];
    return wrist.z || 0;
  }

  getCursorPosition(hands: HandLandmarks[], width: number, height: number): { x: number; y: number } | null {
    if (!hands || hands.length === 0) return null;

    const indexTip = hands[0].landmarks[8];
    
    // Convert normalized coordinates to screen coordinates
    // MediaPipe coordinates are normalized to [0, 1] but mirrored horizontally
    return {
      x: (1 - indexTip.x) * width,
      y: indexTip.y * height,
    };
  }
}
