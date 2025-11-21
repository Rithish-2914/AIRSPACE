import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";

export function SketchPadApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00ffff');
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set initial background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'airspace-sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = ['#00ffff', '#3b82f6', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#ffffff'];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-300 font-futuristic">COLOR:</span>
          <div className="flex gap-2">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  color === c ? 'border-cyan-400 scale-110' : 'border-slate-600'
                }`}
                style={{ backgroundColor: c }}
                data-testid={`color-${c}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-300 font-futuristic">SIZE:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32"
            data-testid="input-brush-size"
          />
          <span className="text-sm text-cyan-300">{lineWidth}px</span>
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            onClick={clearCanvas}
            variant="destructive"
            size="sm"
            data-testid="button-clear-canvas"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            onClick={downloadCanvas}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
            data-testid="button-download"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        data-testid="sketch-canvas"
        className="flex-1 border-2 border-blue-500/30 rounded-xl cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <p className="text-xs text-slate-400 text-center font-body">
        Use your mouse to draw. In the future, use hand gestures to paint in the air!
      </p>
    </div>
  );
}
