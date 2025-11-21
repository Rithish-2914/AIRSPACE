# AIRSPACE Design Guidelines

## Design Approach
**Reference-Based: Futuristic Holographic Interface**
Drawing inspiration from sci-fi HUD systems (Iron Man, Minority Report) and modern glass-morphism trends. This is an experience-focused application where visual impact drives the entire interaction model.

## Core Design Principles
1. **Glass-morphic Holography**: All UI elements feel like floating, semi-transparent holograms
2. **Depth Hierarchy**: Strong use of layering to create 3D spatial awareness
3. **Fluid Responsiveness**: Every interaction should feel weightless yet precise
4. **Visual Feedback**: Immediate glow/highlight responses to hand gestures

## Typography System

**Primary Font**: "Orbitron" or "Exo 2" (Google Fonts) - geometric, futuristic
- App Titles: 700 weight, text-2xl to text-3xl
- Panel Headers: 600 weight, text-lg
- Body Text: 400 weight, text-sm to text-base
- System Labels: 300 weight, text-xs (uppercase, tracking-wider)

**Secondary Font**: "Inter" or "Space Grotesk" for readability in apps
- Notes/Text Content: 400 weight, text-base
- Data Displays: 500 weight, tabular-nums

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16
- Component padding: p-4 to p-8
- Panel margins: m-4
- Icon spacing: gap-2 to gap-4
- Dock spacing: space-x-8

**Viewport Strategy**:
- Webcam feed: Full viewport background (fixed, w-full h-screen)
- Floating panels: Absolute positioning with transform for 3D depth
- App windows: Max width 80% viewport, max height 70vh, centered or positioned dynamically
- Dock: Fixed bottom positioning, w-auto, centered

## Component Library

### 1. Floating Panels (Core Container)
- Backdrop blur effect (backdrop-blur-xl)
- Thick border with glow treatment
- Rounded corners (rounded-2xl)
- Padding: p-6 to p-8
- Shadow: Multiple layers for depth (shadow-2xl + custom glow shadow)
- Transform: translateZ effect for 3D depth

### 2. App Dock
- Fixed bottom positioning (bottom-8)
- Horizontal flex layout (flex gap-8)
- Icon size: w-16 h-16
- Hover state: Scale up (scale-110) with glow intensification
- Active state: Pulse animation

### 3. Gesture Cursor
- Size: w-8 h-8 (circular)
- Ring indicator around cursor
- Trail effect for movement (fade-out path)
- State indicators: Different appearance for pinch/fist/open

### 4. App Windows
- Title bar: h-12, flex justify-between items-center
- Close button: Absolute top-right (top-4 right-4)
- Content area: p-6, overflow-auto
- Resize handles: Corner indicators (w-4 h-4)

### 5. 3D Builder Canvas
- Full viewport overlay when active
- Grid reference plane (subtle lines)
- Object outlines with strong edge glow
- Toolbar: Fixed left side (w-20), vertical icon stack

### 6. Idea Studio Nodes
- Min size: 120x80px, auto-expand with content
- Connection lines: Curved SVG paths with glow
- Node types: Different shapes (rounded-lg, rounded-full, diamond via clip-path)
- Draggable handles: w-3 h-3 circles at connection points

### 7. AI Panel
- Slide-in from right (w-96 to w-[32rem])
- Chat message bubbles: p-4, rounded-2xl
- User messages: Align right
- AI messages: Align left with avatar
- Input area: Fixed bottom within panel

### 8. Form Elements (Notes, Calculator)
- Inputs: Transparent with border glow, p-3
- Buttons: Solid background with glow on hover, px-6 py-3
- Calculator grid: grid-cols-4 gap-2
- Number pads: Large touch targets (min h-16)

## Animations

**Critical Animations** (minimal, purposeful):
- Panel entrance: Fade + slide from center (duration-300)
- Gesture feedback: Glow pulse on interaction (duration-150)
- App launch: Scale + fade (duration-400, ease-out)
- Cursor trail: Fade opacity over 200ms
- Hover states: Scale + glow intensify (duration-200)

**Prohibited**: Excessive parallax, continuous rotations, bouncy effects

## Hand Tracking Overlay

- Webcam feed: Grayscale with slight tint for futuristic feel
- Hand skeleton: Thin connected lines between landmarks
- Fingertip indicators: Small glowing dots
- Gesture visualization: Temporary shapes/icons that appear on recognition

## 3D Elements (Three.js Integration)

- Default object size: 1 unit = 100px equivalent
- Grid floor: 20x20 units, subtle lines
- Camera: Perspective, FOV 75
- Lighting: Ambient + point lights for dramatic shadows
- Object materials: Transparent with emissive edges

## Multi-Window Management

- Z-index layers: Dock (50), Apps (100-110), Modal overlays (200), Cursor (999)
- Stacking: Active window gets highest z-index in its layer
- Window positions: Cascade new windows (+20px offset)
- Max windows: 6 concurrent for performance

## Accessibility Considerations

- Keyboard fallback: Tab navigation through dock, Enter to activate
- Focus indicators: Thick glow outline (outline-4)
- Alternative controls: Click mode toggle if gestures fail
- Loading states: Skeleton screens with shimmer effect
- Error states: Warning glow with message overlay

## Images

**No Hero Images Required** - This interface is live camera-based. The webcam feed serves as the dynamic background.

**Icon System**: Use Heroicons (outline style) via CDN for consistent futuristic look

**Optional Visual Enhancements**:
- App icons: Custom glowing SVG icons for dock (abstract geometric shapes)
- Background particle effects: Sparse, slow-moving dots for depth
- AI avatar: Simple geometric icon or initialism in circle

## Performance Constraints

- Limit concurrent animations to 3-4 elements
- Reduce blur/glow effects if frame rate drops below 30fps
- Debounce gesture recognition to 100ms intervals
- Use transform/opacity for animations (GPU-accelerated)

This design creates a cohesive, futuristic holographic experience where every interaction feels like manipulating light and space with your hands.