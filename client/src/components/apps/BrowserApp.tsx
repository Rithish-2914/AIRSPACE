import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, RefreshCw, Home } from "lucide-react";

export function BrowserApp() {
  const [url, setUrl] = useState('https://example.com');
  const [inputValue, setInputValue] = useState('https://example.com');

  const navigate = () => {
    let newUrl = inputValue;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl;
    }
    setUrl(newUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 text-cyan-400"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 text-cyan-400"
            data-testid="button-forward"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 text-cyan-400"
            data-testid="button-refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 text-cyan-400"
            data-testid="button-home"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter URL..."
          className="flex-1 bg-slate-800/40 border-cyan-500/30 text-slate-200"
          data-testid="input-url"
        />

        <Button
          onClick={navigate}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-go"
        >
          GO
        </Button>
      </div>

      {/* Browser content */}
      <div className="flex-1 bg-slate-900/60 rounded-lg border-2 border-cyan-400/30 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="text-6xl">🌐</div>
            <p className="text-cyan-300 font-futuristic text-lg">MINI BROWSER</p>
            <p className="text-slate-400 text-sm max-w-md">
              This is a simulated browser interface. In a full implementation, this would render
              web pages in an iframe or WebView component.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Current URL: {url}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
