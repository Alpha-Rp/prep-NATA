import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Eraser, Ruler, Compass, Layers, Download, Undo, Redo, Save, Share2, ArrowRight, Palette, Maximize, Minimize } from 'lucide-react';
import Button from '../components/ui/Button';

const DrawingToolsPage = () => {
  const [activeTool, setActiveTool] = useState('pen');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState('#1F2937');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const tools = [
    { id: 'pen', name: 'Pen Tool', icon: <PenTool size={20} /> },
    { id: 'eraser', name: 'Eraser', icon: <Eraser size={20} /> },
    { id: 'ruler', name: 'Ruler', icon: <Ruler size={20} /> },
    { id: 'compass', name: 'Compass', icon: <Compass size={20} /> },
    { id: 'layers', name: 'Layers', icon: <Layers size={20} /> },
  ];
  
  const colors = [
    '#1F2937', // deepNavy
    '#C66B3D', // terracotta
    '#8BA793', // sage
    '#C4A484', // mutedGold
    '#D35400', // burntOrange
    '#2D5A27', // forestGreen
    '#36454F', // charcoal
    '#FFFFFF', // white
    '#000000', // black
  ];
  
  const strokeWidths = [1, 2, 4, 6, 8];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set initial canvas state
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state to history
    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setDrawingHistory([initialState]);
    setHistoryIndex(0);
    
    // Handle window resize
    const handleResize = () => {
      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.putImageData(currentState, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = activeTool === 'eraser' ? '#FFFFFF' : strokeColor;
    ctx.lineWidth = strokeWidth;
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
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastPosition({ x, y });
  };
  
  const stopDrawing = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Save current state to history
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any forward history if we're not at the end
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    
    setDrawingHistory([...newHistory, currentState]);
    setHistoryIndex(newHistory.length);
  };
  
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const newIndex = historyIndex - 1;
    ctx.putImageData(drawingHistory[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };
  
  const handleRedo = () => {
    if (historyIndex >= drawingHistory.length - 1) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const newIndex = historyIndex + 1;
    ctx.putImageData(drawingHistory[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };
  
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save cleared state to history
    const clearedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    setDrawingHistory([...drawingHistory, clearedState]);
    setHistoryIndex(drawingHistory.length);
  };
  
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'nata-drawing.png';
    link.href = dataUrl;
    link.click();
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* Header section */}
      <div className="bg-deepNavy text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-deepNavy to-deepNavy/90" />
          
          {/* Blueprint grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          
          {/* Animated lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"
                style={{
                  top: `${20 + i * 20}%`,
                  left: 0,
                  right: 0,
                  animation: `moveLeftRight ${8 + i * 2}s infinite linear ${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Drawing Tools</h1>
            <p className="text-xl text-white/80 mb-8">
              Practice your architectural drawing skills with our interactive digital tools
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
          {/* Toolbar */}
          <div className="bg-deepNavy/5 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`p-2 rounded-lg flex items-center space-x-1 ${
                    activeTool === tool.id
                      ? 'bg-terracotta text-white'
                      : 'bg-white text-deepNavy hover:bg-white/80'
                  } transition-colors duration-300`}
                  title={tool.name}
                >
                  {tool.icon}
                  <span className="hidden md:inline ml-1">{tool.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white rounded-lg p-2">
                <Palette size={18} className="text-deepNavy mr-2" />
                <div className="flex gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setStrokeColor(color)}
                      className={`w-6 h-6 rounded-full ${strokeColor === color ? 'ring-2 ring-terracotta' : ''}`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center bg-white rounded-lg p-2">
                <span className="text-deepNavy mr-2">Size</span>
                <div className="flex gap-1">
                  {strokeWidths.map((width) => (
                    <button
                      key={width}
                      onClick={() => setStrokeWidth(width)}
                      className={`w-8 h-8 rounded flex items-center justify-center ${strokeWidth === width ? 'bg-terracotta/10 text-terracotta' : 'text-deepNavy'}`}
                      title={`${width}px`}
                    >
                      <div
                        className="rounded-full bg-current"
                        style={{ width: width, height: width }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                className="p-2 rounded-lg bg-white text-deepNavy hover:bg-white/80 transition-colors duration-300 disabled:opacity-50"
                disabled={historyIndex <= 0}
                title="Undo"
              >
                <Undo size={20} />
              </button>
              <button
                onClick={handleRedo}
                className="p-2 rounded-lg bg-white text-deepNavy hover:bg-white/80 transition-colors duration-300 disabled:opacity-50"
                disabled={historyIndex >= drawingHistory.length - 1}
                title="Redo"
              >
                <Redo size={20} />
              </button>
              <button
                onClick={handleClear}
                className="p-2 rounded-lg bg-white text-deepNavy hover:bg-white/80 transition-colors duration-300"
                title="Clear Canvas"
              >
                <Eraser size={20} />
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-lg bg-white text-deepNavy hover:bg-white/80 transition-colors duration-300"
                title="Save Drawing"
              >
                <Save size={20} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white text-deepNavy hover:bg-white/80 transition-colors duration-300"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
          
          {/* Canvas */}
          <div className={`relative ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[60vh]'}`}>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-full bg-white cursor-crosshair"
            />
            
            {/* Blueprint grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: 'linear-gradient(#1F2937 0.5px, transparent 0.5px), linear-gradient(90deg, #1F2937 0.5px, transparent 0.5px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>
        </div>
        
        {/* Drawing exercises */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-serif font-bold text-deepNavy mb-8 text-center">Practice Exercises</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Perspective Drawing',
                    description: 'Practice one-point and two-point perspective techniques',
                    image: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    difficulty: 'Intermediate'
                  },
                  {
                    title: 'Architectural Forms',
                    description: 'Draw basic architectural elements and forms',
                    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    difficulty: 'Beginner'
                  },
                  {
                    title: 'Building Elevation',
                    description: 'Create detailed building elevations with proper proportions',
                    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                    difficulty: 'Advanced'
                  }
                ].map((exercise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="bg-deepNavy/5 rounded-xl overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exercise.image}
                        alt={exercise.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/80 text-deepNavy text-xs rounded-full backdrop-blur-sm">
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-deepNavy mb-2 group-hover:text-terracotta transition-colors duration-300">
                        {exercise.title}
                      </h3>
                      
                      <p className="text-charcoal/80 mb-4">
                        {exercise.description}
                      </p>
                      
                      <Button className="w-full group relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center">
                          Start Exercise
                          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Tips section */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-deepNavy text-white rounded-xl shadow-lg overflow-hidden relative"
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-deepNavy to-deepNavy/90" />
              
              {/* Blueprint grid */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Drawing Tips for NATA</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <PenTool size={20} className="text-terracotta mr-2" />
                    Perspective Drawing Tips
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      'Always establish your horizon line and vanishing points first',
                      'Use light guidelines before committing to darker lines',
                      'Practice consistent line weight for clarity',
                      'Pay attention to proportions and scale',
                      'Use reference points to maintain accuracy'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mr-3 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-white/80">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Compass size={20} className="text-sage mr-2" />
                    Composition & Presentation
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      'Plan your composition before starting',
                      'Create a focal point to draw attention',
                      'Use varying line weights to create depth',
                      'Consider light sources for shading',
                      'Add context elements to enhance your drawing'
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sage/20 text-sage flex items-center justify-center mr-3 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-white/80">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    View More Drawing Tips
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DrawingToolsPage;