import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Download } from "lucide-react";

interface Node {
  id: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
}

export function IdeaStudio() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      content: 'AIRSPACE Project',
      x: 300,
      y: 150,
      width: 180,
      height: 80,
      color: '#3b82f6',
    },
  ]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [newNodeContent, setNewNodeContent] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = ['#3b82f6', '#06b6d4', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];

  const addNode = () => {
    if (!newNodeContent.trim()) return;

    const newNode: Node = {
      id: Date.now().toString(),
      content: newNodeContent,
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 100,
      width: 160,
      height: 80,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setNodes([...nodes, newNode]);
    setNewNodeContent('');

    // Auto-connect to selected node
    if (selectedNodeId) {
      setConnections([...connections, { from: selectedNodeId, to: newNode.id }]);
    }
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.from !== id && c.to !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggingId(nodeId);
    setSelectedNodeId(nodeId);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    setNodes(nodes.map(n =>
      n.id === draggingId
        ? { ...n, x: Math.max(0, Math.min(x, rect.width - n.width)), y: Math.max(0, Math.min(y, rect.height - n.height)) }
        : n
    ));
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const exportMindMap = () => {
    // In a real implementation, this would export as SVG/PNG
    console.log('Exporting mind map:', { nodes, connections });
    alert('Export feature - would save as PNG/SVG in full implementation');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={newNodeContent}
          onChange={(e) => setNewNodeContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNode()}
          placeholder="New idea..."
          className="flex-1 bg-slate-800/40 border-cyan-500/30 text-slate-200"
          data-testid="input-new-node"
        />
        <Button
          onClick={addNode}
          className="bg-cyan-600 hover:bg-cyan-700"
          data-testid="button-add-node"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Node
        </Button>
        <Button
          onClick={exportMindMap}
          variant="outline"
          size="sm"
          data-testid="button-export"
        >
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 relative bg-slate-900/60 rounded-lg border-2 border-cyan-400/30 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-testid="idea-canvas"
      >
        {/* Draw connections */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x + fromNode.width / 2;
            const y1 = fromNode.y + fromNode.height / 2;
            const x2 = toNode.x + toNode.width / 2;
            const y2 = toNode.y + toNode.height / 2;

            // Create curved path
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const offset = 50;

            return (
              <g key={idx}>
                <path
                  d={`M ${x1} ${y1} Q ${midX} ${midY - offset} ${x2} ${y2}`}
                  stroke="#00ffff"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.4"
                />
                <circle cx={x2} cy={y2} r="4" fill="#00ffff" opacity="0.6" />
              </g>
            );
          })}
        </svg>

        {/* Draw nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            data-testid={`node-${node.id}`}
            className={`absolute cursor-move select-none ${
              selectedNodeId === node.id ? 'ring-2 ring-cyan-400' : ''
            }`}
            style={{
              left: node.x,
              top: node.y,
              width: node.width,
              height: node.height,
              zIndex: selectedNodeId === node.id ? 10 : 2,
            }}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
          >
            <div
              className="w-full h-full rounded-lg backdrop-blur-md border-2 flex items-center justify-center p-3 shadow-glow-md"
              style={{
                backgroundColor: `${node.color}20`,
                borderColor: node.color,
              }}
            >
              <p className="text-sm text-center font-futuristic text-cyan-300 break-words">
                {node.content}
              </p>
            </div>
            
            {selectedNodeId === node.id && (
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNode(node.id);
                }}
                data-testid={`button-delete-node-${node.id}`}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            <p className="font-futuristic">Add nodes to start building your idea map</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center">
        Nodes: {nodes.length} | Connections: {connections.length}
      </p>
    </div>
  );
}
