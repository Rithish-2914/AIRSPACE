import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles } from "lucide-react";
import type { AIMessage } from "@shared/schema";

interface AIPanelProps {
  context?: any;
}

export function AIPanel({ context }: AIPanelProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to AIRSPACE AI Assistant! I can help you with:\n\n• Analyzing your 3D designs\n• Organizing your mind maps\n• Suggesting improvements\n• Generating creative ideas\n\nWhat would you like to create today?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('AI error:', error);
      
      let errorContent = 'Sorry, I encountered an error. ';
      
      if (error.message.includes('not configured') || error.message.includes('API key')) {
        errorContent = '⚠️ AI service is not configured. The OPENAI_API_KEY environment variable needs to be set.';
      } else if (error.message.includes('Invalid')) {
        errorContent = '⚠️ Invalid API key. Please check your OpenAI API key configuration.';
      } else {
        errorContent += error.message || 'Please try again.';
      }
      
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            data-testid={`message-${message.role}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600/80 text-white'
                  : 'bg-slate-800/60 text-slate-200 border border-cyan-500/30'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-futuristic">AIRSPACE AI</span>
                </div>
              )}
              <p className="text-sm font-body whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/60 text-slate-200 border border-cyan-500/30 rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your workspace..."
          className="resize-none bg-slate-800/40 border-cyan-500/30 text-slate-200"
          rows={2}
          data-testid="textarea-ai-input"
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-cyan-600 hover:bg-cyan-700 self-end"
          data-testid="button-send"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
