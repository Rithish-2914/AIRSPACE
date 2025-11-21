# AIRSPACE 🚀

> A futuristic holographic interface controlled entirely by hand gestures

AIRSPACE is a web-based mixed-reality interface that transforms your webcam into a hand-tracking controller. Experience a cyberpunk, Iron Man-style operating system with floating apps, 3D object creation, and mind mapping—all controlled through intuitive hand gestures.

![Hand Gesture Control](https://img.shields.io/badge/Control-Hand%20Gestures-00ffff?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Three.js-blueviolet?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-OpenAI%20GPT-00ff00?style=for-the-badge)

---

## ✨ Features

- 🖐️ **Hand Gesture Recognition** - Control everything with your hands using MediaPipe
- 🪟 **Floating Window Apps** - 9 interactive holographic applications
- 🎨 **3D Object Creation** - Build 3D scenes with Air Builder
- 🧠 **Mind Mapping** - Visual brainstorming with Idea Studio
- 🤖 **AI Assistant** - OpenAI-powered conversational AI
- 💎 **Glass-Morphic UI** - Cyberpunk aesthetic with neon edges and transparency
- 🎯 **Gesture-Based Navigation** - No mouse or keyboard needed!

---

## 🎮 Hand Gestures Guide

AIRSPACE uses 5 primary hand gestures to control the interface:

### 👉 **Point** (Index Finger Extended)
- **How**: Extend only your index finger, keep other fingers closed
- **Use**: Move the cursor around the screen
- Navigate and hover over elements

### 🤏 **Pinch** (Thumb + Index Finger Together)
- **How**: Bring your thumb and index finger tips close together
- **Use**: Click buttons, select items, activate apps
- The primary "click" gesture

### ✊ **Fist** (All Fingers Closed)
- **How**: Close all fingers into a fist
- **Use**: Grab and drag windows, move objects
- Hold the fist while moving to drag

### ✋ **Open Palm** (All Fingers Extended)
- **How**: Spread all five fingers wide open
- **Use**: Open main menu, show/hide app dock
- Quick access to all features

### 👈👉 **Swipe** (Quick Hand Movement)
- **How**: Move your hand quickly left, right, up, or down
- **Use**: Navigate between apps, dismiss notifications
- Switch workspaces

---

## 📱 Applications

AIRSPACE includes 9 floating window apps:

### 1. 📝 **Notes App**
- Rich text editing
- Create and save notes
- Markdown support
- **Gesture**: Pinch to type, swipe to scroll

### 2. 🔢 **Calculator**
- Basic arithmetic operations
- Scientific calculator mode
- **Gesture**: Pinch buttons to calculate

### 3. 🎨 **Sketch Pad**
- Freehand drawing canvas
- Color picker
- Brush size controls
- **Gesture**: Fist to draw, pinch to change colors

### 4. 📁 **File Viewer**
- Browse files and folders
- Preview documents
- File management
- **Gesture**: Pinch to open files

### 5. 🎵 **Music Player**
- Audio playback controls
- Playlist management
- Volume control
- **Gesture**: Pinch to play/pause, swipe to skip

### 6. 🤖 **AI Assistant**
- Conversational AI powered by OpenAI
- Workspace analysis
- Creative suggestions
- **Gesture**: Pinch to send messages

### 7. 🌐 **Browser**
- Embedded web browsing
- URL navigation
- **Gesture**: Pinch to navigate, swipe to scroll

### 8. 🏗️ **Air Builder**
- 3D object creation with Three.js
- Create cubes, spheres, cylinders, cones, torus
- Rotate and scale objects
- Real-time 3D workspace
- **Gesture**: Pinch to create, fist to rotate

### 9. 💡 **Idea Studio**
- Mind mapping canvas
- Create connected nodes
- Visual brainstorming
- Export mind maps
- **Gesture**: Pinch to create nodes, fist to connect

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Edge, or Firefox recommended)
- Webcam access
- Good lighting for hand tracking

### Quick Start

1. **Allow Camera Access**
   - When prompted, click "Allow" to grant webcam permissions
   - Position yourself so your hands are visible

2. **Calibrate Your Hand**
   - Hold your hand in front of the camera
   - Wait for the green tracking overlay to appear
   - You should see hand landmarks detected

3. **Open the Menu**
   - Make an **open palm** gesture (all fingers spread)
   - The app dock will appear at the bottom

4. **Launch an App**
   - **Point** at an app icon
   - **Pinch** to open it
   - A floating window will appear

5. **Move Windows**
   - Make a **fist** gesture over a window's title bar
   - Move your hand to drag the window
   - Release the fist to drop

6. **Interact with Apps**
   - Use **pinch** to click buttons
   - Use **fist** to drag elements
   - Use **swipe** to scroll

---

## 🛠️ Installation & Development

### Local Development (Full Features)

```bash
# Clone the repository
git clone <your-repo-url>
cd airspace

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
```

### Environment Variables (Optional)

Create a `.env` file for optional features:

```env
# OpenAI API Key (for AI Assistant)
OPENAI_API_KEY=your_openai_api_key_here

# Database URL (for scene persistence)
DATABASE_URL=your_postgresql_url_here
```

### Build for Production

```bash
# Build the application
npm run build

# Output will be in dist/public/
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

**Quick 3-Step Deploy:**

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# 2. Visit vercel.com/new and import your repository
# 3. Click Deploy (auto-configured!)
```

**Or use Vercel CLI:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Environment Variables on Vercel:**
- Go to Project Settings → Environment Variables
- Add `OPENAI_API_KEY` for AI features (optional)
- Redeploy after adding variables

See [DEPLOY.md](./DEPLOY.md) for quick guide or [README-VERCEL.md](./README-VERCEL.md) for detailed instructions.

### Deploy to Replit

This project runs natively on Replit with full backend support. Just click "Run" and it works!

---

## 💡 Tips for Best Experience

### Hand Tracking
- ✅ **Good lighting** - Ensure your hands are well-lit
- ✅ **Solid background** - Plain walls work best
- ✅ **Camera angle** - Position camera at chest height
- ✅ **Distance** - Sit 2-3 feet from camera
- ❌ Avoid cluttered backgrounds
- ❌ Avoid backlighting (window behind you)

### Gestures
- **Be deliberate** - Hold gestures for 0.5 seconds
- **Exaggerate movements** - Make clear, distinct gestures
- **One hand** - Use your dominant hand for best results
- **Practice** - Gestures become natural after a few minutes

### Performance
- Close unnecessary browser tabs
- Use Chrome or Edge for best MediaPipe performance
- Disable browser extensions that may interfere with webcam

---

## 🎨 Customization

### Themes
The cyberpunk theme can be customized in `client/src/index.css`:
- Neon colors (cyan, blue, purple)
- Glass-morphism intensity
- Glow effects

### Gestures
Adjust gesture sensitivity in `client/src/lib/gestures.ts`:
- `PINCH_THRESHOLD` - Distance for pinch detection
- `SWIPE_THRESHOLD` - Distance for swipe detection

### Apps
Add custom apps in `client/src/components/apps/`:
- Create new app component
- Register in `AppDock.tsx`
- Define app icon and metadata

---

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js
- **Hand Tracking**: MediaPipe Hands
- **Styling**: Tailwind CSS with custom glass-morphic theme
- **UI Components**: Radix UI + shadcn/ui
- **Animation**: Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI GPT API
- **Deployment**: Vercel Serverless Functions

---

## 🤝 Usage Scenarios

### Presentations
- Control slides with hand gestures
- Draw on Sketch Pad during explanations
- Create 3D visualizations in Air Builder

### Creative Work
- Mind map ideas in Idea Studio
- Sketch concepts in Sketch Pad
- Build 3D prototypes in Air Builder

### Productivity
- Take notes hands-free
- Calculate on the fly
- Browse web content without touching keyboard

### Education
- Interactive learning experiences
- Visual demonstrations
- Gesture-based quizzes

---

## 📚 Project Structure

```
airspace/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and helpers
│   │   └── App.tsx      # Main application
│   └── index.html
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── lib/             # Server utilities
│   └── index-dev.ts     # Dev server
├── api/                 # Vercel serverless functions
│   └── index.js         # API handler
├── shared/              # Shared TypeScript schemas
├── vercel.json          # Vercel configuration
└── package.json
```

---

## 🐛 Troubleshooting

### Camera Not Working
- **Check permissions**: Ensure browser has camera access
- **Try different browser**: Chrome/Edge work best
- **Check other apps**: Close apps using the camera
- **Restart browser**: Sometimes helps with permission issues

### Hand Tracking Laggy
- **Close tabs**: Free up browser memory
- **Better lighting**: Improve hand visibility
- **Update browser**: Use latest version
- **Check CPU usage**: Close other intensive apps

### Gestures Not Detected
- **Lighting**: Ensure hands are well-lit
- **Background**: Use plain background
- **Distance**: Adjust distance from camera
- **Hand visibility**: Keep full hand in frame

### Apps Not Opening
- **Refresh page**: Clear browser cache (Ctrl+Shift+R)
- **Check console**: Look for JavaScript errors (F12)
- **Try different app**: Isolate the issue

---

## 🔒 Privacy

- **Camera**: Used only for local hand tracking
- **Data**: No video data is transmitted or stored
- **MediaPipe**: Processing happens in your browser
- **AI**: Chat messages sent to OpenAI (if enabled)

---

## 📝 License

MIT License - Feel free to use, modify, and distribute!

---

## 🌟 Credits

- **Hand Tracking**: Google MediaPipe
- **AI**: OpenAI GPT
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **3D**: Three.js

---

## 🚀 What's Next?

Future enhancements planned:
- [ ] Two-hand gestures (rotate, zoom)
- [ ] Voice commands integration
- [ ] Multiplayer collaborative workspace
- [ ] AR mode with spatial tracking
- [ ] Custom gesture recording
- [ ] Mobile device support

---

**Built with ❤️ for the future of human-computer interaction**

🌐 [Live Demo](#) | 📖 [Documentation](./README-VERCEL.md) | 🐛 [Report Issue](#)
