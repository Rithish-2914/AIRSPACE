# 🖐️ AIRSPACE Gesture Reference Card

Quick reference for all hand gestures in AIRSPACE.

---

## Primary Gestures

### ✋ **OPEN PALM**
```
     👆
    👆👆👆
   👆   👆
```
**How**: Spread all five fingers wide apart  
**Use**: Open/close main menu, show app dock  
**Hold**: 1 second  
**Tip**: Like you're saying "stop"

---

### 👉 **POINT**
```
     ☝️
    ✊✊✊
   ✊   ✊
```
**How**: Extend only index finger, close others  
**Use**: Navigate cursor, hover over items  
**Hold**: Continuous while moving  
**Tip**: Like pointing at something across the room

---

### 🤏 **PINCH**
```
    👆
   ⭕️ (thumb + index touching)
  ✊✊✊
```
**How**: Bring thumb and index fingertips together  
**Use**: Click buttons, select items, activate apps  
**Hold**: 0.5 seconds  
**Tip**: Like picking up a grain of rice

---

### ✊ **FIST**
```
   ✊✊✊✊
  ✊    ✊
   ✊✊✊
```
**How**: Close all fingers tightly  
**Use**: Grab and drag windows, move objects  
**Hold**: While dragging, then release  
**Tip**: Like grabbing a ball

---

### 👈 **SWIPE**
```
      →→→  
     ✋ (quick movement)
```
**How**: Move hand quickly in a direction  
**Use**: Navigate, scroll, dismiss  
**Speed**: Fast motion  
**Tip**: Like wiping a table

---

## Gesture Combinations

### Window Management

| Action | Gesture Sequence |
|--------|------------------|
| **Open app** | POINT at icon → PINCH |
| **Move window** | POINT at title bar → FIST → move → release |
| **Close window** | POINT at ❌ → PINCH |
| **Minimize** | POINT at minimize button → PINCH |
| **Resize** | FIST on corner → drag |

### App Interactions

| App | Primary Gesture | Secondary |
|-----|----------------|-----------|
| **Notes** | PINCH to type | SWIPE to scroll |
| **Calculator** | PINCH buttons | - |
| **Sketch Pad** | FIST to draw | PINCH for colors |
| **File Viewer** | PINCH to open | SWIPE to navigate |
| **Music Player** | PINCH play/pause | SWIPE to skip |
| **AI Assistant** | PINCH to send | SWIPE to scroll |
| **Browser** | PINCH to click | SWIPE to scroll |
| **Air Builder** | PINCH to create | FIST to rotate |
| **Idea Studio** | PINCH new node | FIST to connect |

---

## Advanced Gestures (Future)

### 🤞 Two Hands (Coming Soon)
- **Both palms**: Zoom in/out
- **Rotate**: Two-finger twist
- **Scale**: Pinch with both hands

---

## Gesture Tips

### ✅ Do This
- **Clear movements** - Make gestures obvious
- **Hold steady** - Don't rush, hold for 0.5-1 second
- **One hand** - Use dominant hand primarily
- **Good lighting** - Ensure hand is well-lit
- **Practice** - Repetition builds muscle memory

### ❌ Avoid This
- **Tiny movements** - Make gestures big and clear
- **Fast transitions** - Give system time to detect
- **Multiple hands** - Stick to one hand
- **Poor lighting** - Dark = bad tracking
- **Complex fingers** - Keep it simple

---

## Troubleshooting Gestures

### Pinch Not Working?
- Touch fingertips together (not just close)
- Hold for full 0.5 seconds
- Make sure camera sees both fingers clearly
- Try exaggerating the pinch

### Fist Not Grabbing?
- Close all fingers completely
- Hold fist steady for 0.5 seconds before moving
- Keep thumb tucked in
- Move slowly while dragging

### Point Not Accurate?
- Extend index finger fully
- Keep other fingers closed tight
- Point directly at camera
- Adjust distance from camera (2-3 feet ideal)

### Swipe Not Detected?
- Move hand faster (swipe, don't slide)
- Cover more distance (at least 6 inches)
- Keep hand in frame during movement
- Try a more exaggerated motion

---

## Gesture Sensitivity Settings

Located in `client/src/lib/gestures.ts`:

```typescript
PINCH_THRESHOLD: 0.05      // Lower = easier pinch
SWIPE_THRESHOLD: 0.15      // Lower = easier swipe
GESTURE_HOLD_TIME: 500ms   // Time to hold gesture
```

Adjust these if gestures are too sensitive or not sensitive enough!

---

## Quick Practice Routine

**1 Minute Warmup:**
- Open palm → Menu appears
- Close palm → Menu disappears  
- Repeat 5 times

**2 Minute Basics:**
- Point around screen for 30 seconds
- Practice 10 pinches
- Make fist and drag imaginary window 5 times
- Swipe left and right 5 times

**After this, you'll be fluent in AIRSPACE gestures! 🎉**

---

## Visual Feedback

When gestures are detected, you'll see:

- **Green dots** on hand landmarks = Tracking active ✅
- **Blue highlight** on cursor = Point detected
- **Yellow glow** on cursor = Pinch detected  
- **Red outline** on cursor = Fist/grab active
- **Cursor trail** = Swipe motion

---

## Gesture Hierarchy

**Most Used → Least Used:**

1. 👉 **POINT** (90% of the time - navigation)
2. 🤏 **PINCH** (60% - clicking)
3. ✊ **FIST** (30% - dragging)
4. ✋ **OPEN PALM** (10% - menu access)
5. 👈 **SWIPE** (5% - navigation shortcuts)

Master them in this order!

---

**Pro Tip**: Print this reference card and keep it nearby while learning! 🖨️

