import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const demoTracks: Track[] = [
  { id: '1', title: 'Neon Dreams', artist: 'Synthwave Productions', duration: '3:45' },
  { id: '2', title: 'Cyberpunk City', artist: 'Digital Horizons', duration: '4:12' },
  { id: '3', title: 'Holographic Waves', artist: 'Future Sound', duration: '3:58' },
  { id: '4', title: 'Virtual Reality', artist: 'Tech Beats', duration: '4:30' },
  { id: '5', title: 'Neural Network', artist: 'AI Symphony', duration: '3:22' },
];

export function MusicApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  const track = demoTracks[currentTrack];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % demoTracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + demoTracks.length) % demoTracks.length);
  };

  const cycleRepeat = () => {
    setRepeatMode(mode => mode === 'off' ? 'all' : mode === 'all' ? 'one' : 'off');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Album art placeholder */}
      <div className="w-full aspect-square bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 flex items-center justify-center shadow-neon-purple">
        <div className="text-8xl">🎵</div>
      </div>

      {/* Track info */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-futuristic text-cyan-300 mb-2" data-testid="track-title">
          {track.title}
        </h3>
        <p className="text-slate-400 font-body">{track.artist}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
            style={{ width: isPlaying ? '60%' : '0%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>0:00</span>
          <span>{track.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          size="icon"
          variant="ghost"
          className={`text-cyan-400 ${isShuffle ? 'bg-cyan-500/20' : ''}`}
          onClick={() => setIsShuffle(!isShuffle)}
          data-testid="button-shuffle"
        >
          <Shuffle className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="text-cyan-400"
          onClick={prevTrack}
          data-testid="button-prev"
        >
          <SkipBack className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          onClick={togglePlay}
          data-testid="button-play-pause"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="text-cyan-400"
          onClick={nextTrack}
          data-testid="button-next"
        >
          <SkipForward className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={`text-cyan-400 ${repeatMode !== 'off' ? 'bg-cyan-500/20' : ''}`}
          onClick={cycleRepeat}
          data-testid="button-repeat"
        >
          <Repeat className="w-5 h-5" />
          {repeatMode === 'one' && (
            <span className="absolute top-1 right-1 text-xs">1</span>
          )}
        </Button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 mb-6">
        <Volume2 className="w-5 h-5 text-cyan-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1"
          data-testid="input-volume"
        />
        <span className="text-sm text-cyan-300 w-12 text-right">{volume}%</span>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-auto">
        <h4 className="text-sm font-futuristic text-cyan-400 mb-2">PLAYLIST</h4>
        <div className="space-y-1">
          {demoTracks.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => setCurrentTrack(idx)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                currentTrack === idx
                  ? 'bg-cyan-500/20 border border-cyan-400/50'
                  : 'bg-slate-800/30 hover:bg-slate-800/50'
              }`}
              data-testid={`track-${t.id}`}
            >
              <p className="text-sm text-cyan-300 font-body">{t.title}</p>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{t.artist}</span>
                <span>{t.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
