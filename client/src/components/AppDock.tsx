import { motion } from "framer-motion";
import {
  FileText,
  Calculator,
  Palette,
  Folder,
  Music,
  MessageSquare,
  Globe,
  Box,
  Lightbulb,
} from "lucide-react";

export type AppType = 'notes' | 'calculator' | 'sketch' | 'files' | 'music' | 'ai' | 'browser' | 'builder' | 'ideas';

interface AppDockProps {
  onAppLaunch: (appType: AppType) => void;
  activeApps: Set<AppType>;
}

const apps = [
  { id: 'notes' as AppType, name: 'Notes', icon: FileText, color: 'text-yellow-400' },
  { id: 'calculator' as AppType, name: 'Calculator', icon: Calculator, color: 'text-green-400' },
  { id: 'sketch' as AppType, name: 'Sketch', icon: Palette, color: 'text-pink-400' },
  { id: 'files' as AppType, name: 'Files', icon: Folder, color: 'text-blue-400' },
  { id: 'music' as AppType, name: 'Music', icon: Music, color: 'text-purple-400' },
  { id: 'builder' as AppType, name: '3D Builder', icon: Box, color: 'text-cyan-400' },
  { id: 'ideas' as AppType, name: 'Ideas', icon: Lightbulb, color: 'text-orange-400' },
  { id: 'ai' as AppType, name: 'AI Assistant', icon: MessageSquare, color: 'text-emerald-400' },
  { id: 'browser' as AppType, name: 'Browser', icon: Globe, color: 'text-indigo-400' },
];

export function AppDock({ onAppLaunch, activeApps }: AppDockProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-4 px-6 py-4 bg-black/60 backdrop-blur-3xl rounded-3xl border-2 border-blue-500/40 shadow-neon-blue"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {apps.map((app, index) => (
          <motion.button
            key={app.id}
            data-testid={`dock-app-${app.id}`}
            className={`relative group ${activeApps.has(app.id) ? 'scale-110' : ''}`}
            onClick={() => onAppLaunch(app.id)}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{ willChange: 'transform' }}
          >
            {/* Icon container */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-blue-400/30 flex items-center justify-center transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-glow-md ${activeApps.has(app.id) ? 'border-cyan-400 shadow-glow-sm' : ''}`}>
              <app.icon className={`w-8 h-8 ${app.color}`} />
            </div>

            {/* Active indicator */}
            {activeApps.has(app.id) && (
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-neon-cyan"
                layoutId={`active-${app.id}`}
              />
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-black/90 backdrop-blur-sm rounded-lg border border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <p className="text-xs font-futuristic text-cyan-300">{app.name}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
