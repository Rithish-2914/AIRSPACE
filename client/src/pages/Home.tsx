import { useState } from "react";
import { WebcamFeed } from "@/components/WebcamFeed";
import { AppDock, type AppType } from "@/components/AppDock";
import { FloatingWindow } from "@/components/FloatingWindow";
import { NotesApp } from "@/components/apps/NotesApp";
import { CalculatorApp } from "@/components/apps/CalculatorApp";
import { SketchPadApp } from "@/components/apps/SketchPadApp";
import { AIPanel } from "@/components/apps/AIPanel";
import { MusicApp } from "@/components/apps/MusicApp";
import { FileViewerApp } from "@/components/apps/FileViewerApp";
import { BrowserApp } from "@/components/apps/BrowserApp";
import { AirBuilder } from "@/components/apps/AirBuilder";
import { IdeaStudio } from "@/components/apps/IdeaStudio";
import type { AppWindow } from "@shared/schema";

export default function Home() {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [gesture, setGesture] = useState<any>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);

  const appConfig: Record<AppType, { title: string; component: React.ReactNode; size: { width: number; height: number } }> = {
    notes: {
      title: 'NOTES',
      component: <NotesApp />,
      size: { width: 800, height: 600 },
    },
    calculator: {
      title: 'CALCULATOR',
      component: <CalculatorApp />,
      size: { width: 400, height: 600 },
    },
    sketch: {
      title: 'SKETCH PAD',
      component: <SketchPadApp />,
      size: { width: 800, height: 600 },
    },
    files: {
      title: 'FILE VIEWER',
      component: <FileViewerApp />,
      size: { width: 700, height: 500 },
    },
    music: {
      title: 'MUSIC PLAYER',
      component: <MusicApp />,
      size: { width: 500, height: 700 },
    },
    ai: {
      title: 'AI ASSISTANT',
      component: <AIPanel context={{ gesture, cursorPosition }} />,
      size: { width: 600, height: 700 },
    },
    browser: {
      title: 'BROWSER',
      component: <BrowserApp />,
      size: { width: 900, height: 600 },
    },
    builder: {
      title: '3D BUILDER',
      component: <AirBuilder />,
      size: { width: 1000, height: 700 },
    },
    ideas: {
      title: 'IDEA STUDIO',
      component: <IdeaStudio />,
      size: { width: 1000, height: 700 },
    },
  };

  const launchApp = (appType: AppType) => {
    // Check if app is already open
    const existingWindow = windows.find(w => w.appType === appType);
    if (existingWindow) {
      // Focus existing window
      focusWindow(existingWindow.id);
      return;
    }

    const config = appConfig[appType];
    const newWindow: AppWindow = {
      id: `${appType}-${Date.now()}`,
      appType,
      position: {
        x: 100 + windows.length * 30,
        y: 100 + windows.length * 30,
      },
      size: config.size,
      zIndex: maxZIndex + 1,
      isMinimized: false,
    };

    setWindows([...windows, newWindow]);
    setMaxZIndex(maxZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const focusWindow = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setWindows(windows.map(w =>
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
    setMaxZIndex(newZIndex);
  };

  const activeApps = new Set(windows.map(w => w.appType));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Webcam feed with hand tracking */}
      <WebcamFeed
        onGestureChange={setGesture}
        onCursorMove={setCursorPosition}
        onDepthChange={() => {}}
      />

      {/* App windows */}
      {windows.map(window => {
        const config = appConfig[window.appType];
        return (
          <FloatingWindow
            key={window.id}
            id={window.id}
            title={config.title}
            initialPosition={window.position}
            initialSize={window.size}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            isMinimized={window.isMinimized}
          >
            {config.component}
          </FloatingWindow>
        );
      })}

      {/* App dock */}
      <AppDock onAppLaunch={launchApp} activeApps={activeApps} />
    </div>
  );
}
