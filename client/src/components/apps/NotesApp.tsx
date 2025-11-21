import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Welcome to AIRSPACE', content: 'Use hand gestures to interact with this holographic interface!', timestamp: Date.now() },
  ]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>('1');
  const [title, setTitle] = useState('Welcome to AIRSPACE');
  const [content, setContent] = useState('Use hand gestures to interact with this holographic interface!');

  const activeNote = notes.find(n => n.id === activeNoteId);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      timestamp: Date.now(),
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
      setTitle('');
      setContent('');
    }
  };

  const saveNote = () => {
    if (!activeNoteId) return;
    setNotes(notes.map(n =>
      n.id === activeNoteId
        ? { ...n, title, content, timestamp: Date.now() }
        : n
    ));
  };

  const selectNote = (note: Note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Notes list */}
      <div className="w-64 flex flex-col gap-2">
        <Button
          onClick={createNewNote}
          className="w-full bg-blue-600 hover:bg-blue-700"
          data-testid="button-new-note"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
        <div className="flex-1 overflow-auto space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              data-testid={`note-item-${note.id}`}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                activeNoteId === note.id
                  ? 'bg-blue-600/20 border-blue-400'
                  : 'bg-slate-800/40 border-slate-700 hover:border-blue-500/50'
              }`}
              onClick={() => selectNote(note)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-futuristic text-cyan-300 truncate">{note.title}</p>
                  <p className="text-xs text-slate-400 truncate">{note.content}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-red-400 hover:bg-red-500/20 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  data-testid={`button-delete-${note.id}`}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note editor */}
      <div className="flex-1 flex flex-col gap-4">
        {activeNote ? (
          <>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveNote}
              placeholder="Note title..."
              className="bg-slate-800/40 border-blue-500/30 text-cyan-300 font-futuristic text-lg"
              data-testid="input-note-title"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={saveNote}
              placeholder="Start writing..."
              className="flex-1 bg-slate-800/40 border-blue-500/30 text-slate-200 font-body resize-none"
              data-testid="textarea-note-content"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <p className="font-futuristic">Create or select a note to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
