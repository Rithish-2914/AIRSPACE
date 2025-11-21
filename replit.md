# AIRSPACE - Holographic Interface

## Overview

AIRSPACE is a futuristic web-based mixed-reality interface that transforms webcam feeds into hand-tracking controllers for a holographic, Iron Man-style operating system. Users interact with floating apps, create 3D objects, and build mind maps using hand gestures (pinch, fist, swipe, point, open palm) detected through MediaPipe Hands. The application emphasizes a glass-morphic, cyberpunk aesthetic with neon edges, transparent panels, and smooth animations to create an immersive holographic experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite for fast development and optimized production builds.

**Routing**: Wouter for lightweight client-side routing with a simple single-page application structure.

**State Management**: React hooks (useState, useRef, useEffect) for local component state. TanStack Query (React Query) for server state management and API caching.

**UI Component Library**: Radix UI primitives with shadcn/ui design system (New York style). Custom futuristic components built on top of these primitives following glass-morphic design principles.

**Styling**: Tailwind CSS with custom configuration for holographic theme including:
- Custom color variables for neon effects (cyan, blue, purple accents)
- Glass-morphism using backdrop-blur utilities
- Custom fonts: Orbitron/Exo 2 for futuristic headings, Space Grotesk/Inter for body text
- Shadow utilities for depth and glow effects

**Hand Tracking**: MediaPipe Hands library integrated through custom React hook (`useHandTracking`) that:
- Captures webcam feed via browser MediaStream API
- Processes hand landmarks in real-time
- Translates gestures into UI interactions via `GestureDetector` class
- Renders floating cursor based on index finger position

**3D Rendering**: Three.js for the Air Builder app, enabling creation and manipulation of 3D objects (cubes, spheres, cylinders, cones, torus) in a WebGL scene.

**Animation**: Framer Motion for smooth UI transitions, window dragging, and gesture-based interactions.

### Backend Architecture

**Runtime**: Node.js with Express.js server.

**Development Server**: Vite dev server with HMR (Hot Module Replacement) middleware integration for rapid development.

**Production Server**: Static file serving from compiled `dist/public` directory.

**API Structure**: RESTful endpoints using Express routes:
- `/api/ai/chat` - Conversational AI interactions
- `/api/ai/analyze` - Workspace analysis (3D objects, mind maps)
- `/api/scenes` - CRUD operations for saving/loading scenes

**Module System**: ES Modules throughout (type: "module" in package.json).

**Type Safety**: Shared TypeScript schemas between client and server using Zod for runtime validation.

### Data Storage

**Primary Storage**: Drizzle ORM configured for PostgreSQL (via Neon serverless driver).

**Schema Design**:
- Users table with authentication fields
- Scenes table for persisting workspace state (3D objects, mind map nodes, app windows)
- Type-safe schemas defined with Drizzle and validated with Zod

**Fallback Storage**: In-memory storage implementation (`MemStorage` class) using JavaScript Maps for development/testing without database.

**Session Management**: Prepared for connect-pg-simple session store (dependency included).

### Application Features

**Modular App System**: Floating windows architecture where each app is an independent React component:
- Notes App (rich text editing)
- Calculator App (basic arithmetic)
- Sketch Pad App (canvas drawing)
- File Viewer App (demo file browser)
- Music Player App (demo audio player)
- AI Assistant Panel (OpenAI integration)
- Browser App (embedded iframe)
- Air Builder (3D object creation with Three.js)
- Idea Studio (mind mapping canvas)

**Window Management**: Custom `FloatingWindow` component with:
- Draggable positioning
- Resizable dimensions
- Minimize/maximize/close controls
- Z-index stacking management
- Focus handling

**Gesture Recognition**: Custom `GestureDetector` class recognizes:
- Point (index finger extended)
- Pinch (thumb and index close together for clicking)
- Fist (grabbing/dragging)
- Open palm (menu trigger)
- Swipe gestures (directional navigation)
- Two-finger rotate (future enhancement)

## External Dependencies

### Third-Party Services

**OpenAI API**: GPT-5 model integration for AI Assistant features including:
- Conversational chat interface
- Workspace analysis (3D scene, mind map suggestions)
- Creative ideation support
- Requires `OPENAI_API_KEY` environment variable

**MediaPipe**: Google's MediaPipe Hands solution (CDN-hosted) for real-time hand landmark detection:
- `@mediapipe/hands` - Core hand tracking model
- `@mediapipe/camera_utils` - Camera feed utilities
- `@mediapipe/drawing_utils` - Landmark visualization

### Database

**Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL accessed via `@neondatabase/serverless` driver. Requires `DATABASE_URL` environment variable.

### Key Frontend Libraries

- **@tanstack/react-query**: Server state management and API caching
- **three**: 3D graphics rendering for Air Builder
- **framer-motion**: Animation library for smooth transitions
- **wouter**: Lightweight React routing
- **react-hook-form** + **@hookform/resolvers**: Form handling with Zod validation
- **cmdk**: Command palette functionality
- **class-variance-authority** + **clsx** + **tailwind-merge**: Utility-first styling composition

### Build Tools

- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type safety across entire codebase
- **Drizzle Kit**: Database migrations and schema management
- **esbuild**: Server-side bundling for production
- **PostCSS** + **Autoprefixer**: CSS processing

### Development Tools

- **@replit/vite-plugin-runtime-error-modal**: Error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **tsx**: TypeScript execution for development server

## Deployment Options

### Replit Deployment
The application runs natively on Replit with full backend functionality including:
- Complete Express.js server with all API endpoints
- PostgreSQL database integration via Drizzle ORM
- OpenAI API integration for AI features
- WebSocket support for real-time features
- Session management and authentication

### Vercel Deployment
The project is configured for serverless deployment to Vercel:

**Configuration Files**:
- `vercel.json` - Vercel deployment configuration with URL rewrites
- `api/index.js` - Serverless function wrapper for Express API routes
- `.vercelignore` - Files excluded from deployment

**Deployment Features**:
- Frontend: Full React application with all client-side features (hand tracking, 3D workspace, UI)
- Backend: Simplified serverless API endpoints in `api/index.js`
- Build: Vite builds frontend to `dist/public` directory
- API Routes: All routes prefixed with `/api` and routed to serverless functions

**Limitations on Vercel**:
- AI features require full OpenAI implementation (simplified in serverless setup)
- Scene persistence uses browser local storage instead of database by default
- Function timeout: 10 seconds (Hobby), 60 seconds (Pro)
- Stateless serverless functions (no persistent connections)

**Environment Variables for Vercel**:
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `DATABASE_URL` - PostgreSQL connection string (optional)
- `NODE_ENV` - Set to production (auto-configured)

**Quick Deploy**:
1. Push code to GitHub repository
2. Import project to Vercel at [vercel.com/new](https://vercel.com/new)
3. Deploy (auto-configured via `vercel.json`)
4. Add environment variables in Vercel dashboard if needed

See `README-VERCEL.md` and `DEPLOY.md` for detailed deployment instructions.