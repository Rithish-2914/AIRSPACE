import { useState } from "react";
import { File, Folder, Image, FileText, Music, Video } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: any;
  size?: string;
  modified: string;
}

const demoFiles: FileItem[] = [
  { id: '1', name: 'Projects', type: 'folder', icon: Folder, modified: '2024-01-15' },
  { id: '2', name: 'Documents', type: 'folder', icon: Folder, modified: '2024-01-14' },
  { id: '3', name: 'design-mockup.png', type: 'file', icon: Image, size: '2.4 MB', modified: '2024-01-16' },
  { id: '4', name: 'presentation.pdf', type: 'file', icon: FileText, size: '1.8 MB', modified: '2024-01-15' },
  { id: '5', name: 'soundtrack.mp3', type: 'file', icon: Music, size: '4.2 MB', modified: '2024-01-14' },
  { id: '6', name: 'demo-video.mp4', type: 'file', icon: Video, size: '15.6 MB', modified: '2024-01-13' },
  { id: '7', name: 'notes.txt', type: 'file', icon: FileText, size: '12 KB', modified: '2024-01-16' },
];

export function FileViewerApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-500/30">
        <h3 className="text-lg font-futuristic text-cyan-300">MY FILES</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded text-sm font-futuristic ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/40 text-cyan-400'
            }`}
            data-testid="button-list-view"
          >
            LIST
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded text-sm font-futuristic ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/40 text-cyan-400'
            }`}
            data-testid="button-grid-view"
          >
            GRID
          </button>
        </div>
      </div>

      {/* File list/grid */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'list' ? (
          <div className="space-y-1">
            {demoFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedId(file.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedId === file.id
                    ? 'bg-blue-600/20 border border-blue-400'
                    : 'bg-slate-800/30 hover:bg-slate-800/50'
                }`}
                data-testid={`file-${file.id}`}
              >
                <file.icon className={`w-5 h-5 ${file.type === 'folder' ? 'text-yellow-400' : 'text-cyan-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {file.size || 'Folder'} • {file.modified}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {demoFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedId(file.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-all ${
                  selectedId === file.id
                    ? 'bg-blue-600/20 border border-blue-400'
                    : 'bg-slate-800/30 hover:bg-slate-800/50'
                }`}
                data-testid={`file-grid-${file.id}`}
              >
                <file.icon className={`w-12 h-12 ${file.type === 'folder' ? 'text-yellow-400' : 'text-cyan-400'}`} />
                <p className="text-xs text-slate-200 text-center truncate w-full">{file.name}</p>
                <p className="text-xs text-slate-500">{file.size || 'Folder'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="mt-4 pt-3 border-t border-blue-500/30 text-xs text-slate-400">
        {selectedId ? (
          <p>Selected: {demoFiles.find(f => f.id === selectedId)?.name}</p>
        ) : (
          <p>{demoFiles.length} items</p>
        )}
      </div>
    </div>
  );
}
