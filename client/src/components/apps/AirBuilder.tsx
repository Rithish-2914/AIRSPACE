import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Box, Circle, Cylinder, Trash2, RotateCcw } from "lucide-react";

export function AirBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [selectedShape, setSelectedShape] = useState<'cube' | 'sphere' | 'cylinder'>('cube');
  const objectsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5, 100);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    // Add grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ffff, 0x1e293b);
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate all objects slightly
      objectsRef.current.forEach(obj => {
        obj.rotation.y += 0.005;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const addObject = () => {
    if (!sceneRef.current) return;

    let geometry: THREE.BufferGeometry;
    switch (selectedShape) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(0.5, 32, 32);
        break;
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 32);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    const material = new THREE.MeshPhongMaterial({
      color: Math.random() * 0xffffff,
      emissive: 0x003366,
      emissiveIntensity: 0.5,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    // Random position
    mesh.position.set(
      (Math.random() - 0.5) * 4,
      Math.random() * 3 + 0.5,
      (Math.random() - 0.5) * 4
    );

    // Add wireframe
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    const lineMaterial = line.material as THREE.LineBasicMaterial;
    lineMaterial.color = new THREE.Color(0x00ffff);
    lineMaterial.opacity = 0.3;
    lineMaterial.transparent = true;
    mesh.add(line);

    sceneRef.current.add(mesh);
    objectsRef.current.push(mesh);
  };

  const clearAll = () => {
    if (!sceneRef.current) return;
    objectsRef.current.forEach(obj => {
      sceneRef.current?.remove(obj);
    });
    objectsRef.current = [];
  };

  const resetCamera = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.set(5, 5, 5);
    cameraRef.current.lookAt(0, 0, 0);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-cyan-300 font-futuristic">SHAPE:</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedShape === 'cube' ? 'default' : 'outline'}
              onClick={() => setSelectedShape('cube')}
              data-testid="button-cube"
            >
              <Box className="w-4 h-4 mr-1" />
              Cube
            </Button>
            <Button
              size="sm"
              variant={selectedShape === 'sphere' ? 'default' : 'outline'}
              onClick={() => setSelectedShape('sphere')}
              data-testid="button-sphere"
            >
              <Circle className="w-4 h-4 mr-1" />
              Sphere
            </Button>
            <Button
              size="sm"
              variant={selectedShape === 'cylinder' ? 'default' : 'outline'}
              onClick={() => setSelectedShape('cylinder')}
              data-testid="button-cylinder"
            >
              <Cylinder className="w-4 h-4 mr-1" />
              Cylinder
            </Button>
          </div>
        </div>

        <Button
          onClick={addObject}
          className="bg-cyan-600 hover:bg-cyan-700"
          data-testid="button-add-object"
        >
          Add Object
        </Button>

        <div className="flex gap-2 ml-auto">
          <Button
            onClick={resetCamera}
            variant="outline"
            size="sm"
            data-testid="button-reset-camera"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset View
          </Button>
          <Button
            onClick={clearAll}
            variant="destructive"
            size="sm"
            data-testid="button-clear-all"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="flex-1 rounded-lg border-2 border-cyan-400/30 overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950"
        data-testid="builder-canvas"
      />

      <p className="text-xs text-slate-400 mt-2 text-center">
        Objects: {objectsRef.current.length} | Use gestures to interact (coming soon)
      </p>
    </div>
  );
}
