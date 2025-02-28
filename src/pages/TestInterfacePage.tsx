import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Clock, CheckCircle, X, ChevronLeft, ChevronRight, 
  Flag, Save, AlertTriangle, HelpCircle, PenTool, 
  Eraser, Ruler, Compass, Layers, Palette
} from 'lucide-react';
import Button from '../components/ui/Button';

const TestInterfacePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [testType, setTestType] = useState<string>('mcq');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(1800); // Default 30 minutes
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeTool, setActiveTool] = useState('pen');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState('#1F2937');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  
  // Mock MCQ questions
  const mcqQuestions = [
    {
      id: 1,
      question: "Which architectural style is characterized by pointed arches, ribbed vaults, and flying buttresses?",
      options: [
        { id: 'a', text: "Baroque" },
        { id: 'b', text: "Gothic" },
        { id: 'c', text: "Neoclassical" },
        { id: 'd', text: "Renaissance" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 2,
      question: "Who designed the Fallingwater house?",
      options: [
        { id: 'a', text: "Frank Lloyd Wright" },
        { id: 'b', text: "Le Corbusier" },
        { id: 'c', text: "Ludwig Mies van der Rohe" },
        { id: 'd', text: "Walter Gropius" }
      ],
      correctAnswer: 'a'
    },
    {
      id: 3,
      question: "Which material is most commonly used for reinforcing concrete?",
      options: [
        { id: 'a', text: "Aluminum" },
        { id: 'b', text: "Copper" },
        { id: 'c', text: "Steel" },
        { id: 'd', text: "Titanium" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 4,
      question: "What is the primary purpose of a building's foundation?",
      options: [
        { id: 'a', text: "To provide aesthetic appeal" },
        { id: 'b', text: "To transfer loads to the ground" },
        { id: 'c', text: "To insulate the building" },
        { id: 'd', text: "To prevent water infiltration" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 5,
      question: "Which of the following is NOT a principle of sustainable architecture?",
      options: [
        { id: 'a', text: "Energy efficiency" },
        { id: 'b', text: "Maximum resource consumption" },
        { id: 'c', text: "Use of eco-friendly materials" },
        { id: 'd', text: "Water conservation" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 6,
      question: "The Parthenon is an example of which architectural order?",
      options: [
        { id: 'a', text: "Corinthian" },
        { id: 'b', text: "Doric" },
        { id: 'c', text: "Ionic" },
        { id: 'd', text: "Tuscan" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 7,
      question: "What is the term for the central space in a Roman house?",
      options: [
        { id: 'a', text: "Atrium" },
        { id: 'b', text: "Forum" },
        { id: 'c', text: "Peristyle" },
        { id: 'd', text: "Vestibule" }
      ],
      correctAnswer: 'a'
    },
    {
      id: 8,
      question: "Which architectural movement emphasized function over form with the motto 'Less is more'?",
      options: [
        { id: 'a', text: "Art Deco" },
        { id: 'b', text: "Brutalism" },
        { id: 'c', text: "Modernism" },
        { id: 'd', text: "Postmodernism" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 9,
      question: "What is the purpose of a clerestory in architectural design?",
      options: [
        { id: 'a', text: "To provide additional storage space" },
        { id: 'b', text: "To allow for natural light" },
        { id: 'c', text: "To support the roof structure" },
        { id: 'd', text: "To improve acoustic properties" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 10,
      question: "Which of the following is a load-bearing structural element?",
      options: [
        { id: 'a', text: "Curtain wall" },
        { id: 'b', text: "Partition wall" },
        { id: 'c', text: "Column" },
        { id: 'd', text: "Suspended ceiling" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 11,
      question: "What is the golden ratio approximately equal to?",
      options: [
        { id: 'a', text: "1.414" },
        { id: 'b', text: "1.618" },
        { id: 'c', text: "2.236" },
        { id: 'd', text: "3.142" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 12,
      question: "Which architect designed the Sydney Opera House?",
      options: [
        { id: 'a', text: "Frank Gehry" },
        { id: 'b', text: "Zaha Hadid" },
        { id: 'c', text: "Jørn Utzon" },
        { id: 'd', text: "Renzo Piano" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 13,
      question: "What is the term for a building's outline against the sky?",
      options: [
        { id: 'a', text: "Elevation" },
        { id: 'b', text: "Façade" },
        { id: 'c', text: "Silhouette" },
        { id: 'd', text: "Skyline" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 14,
      question: "Which of the following is NOT a type of arch?",
      options: [
        { id: 'a', text: "Barrel" },
        { id: 'b', text: "Ogee" },
        { id: 'c', text: "Parabolic" },
        { id: 'd', text: "Pyramidal" }
      ],
      correctAnswer: 'd'
    },
    {
      id: 15,
      question: "What is the primary purpose of a building's fenestration?",
      options: [
        { id: 'a', text: "Structural support" },
        { id: 'b', text: "Ventilation and light" },
        { id: 'c', text: "Decoration" },
        { id: 'd', text: "Sound insulation" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 16,
      question: "Which architectural style emerged in the early 20th century and featured streamlined forms and geometric patterns?",
      options: [
        { id: 'a', text: "Art Deco" },
        { id: 'b', text: "Bauhaus" },
        { id: 'c', text: "Deconstructivism" },
        { id: 'd', text: "Expressionism" }
      ],
      correctAnswer: 'a'
    },
    {
      id: 17,
      question: "What is the term for the vertical distance from floor to ceiling?",
      options: [
        { id: 'a', text: "Clearance" },
        { id: 'b', text: "Elevation" },
        { id: 'c', text: "Headroom" },
        { id: 'd', text: "Span" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 18,
      question: "Which of the following is a principle of universal design?",
      options: [
        { id: 'a', text: "Design for elite users only" },
        { id: 'b', text: "Equitable use for all people" },
        { id: 'c', text: "Maximum complexity" },
        { id: 'd', text: "Standardized sizes only" }
      ],
      correctAnswer: 'b'
    },
    {
      id: 19,
      question: "What is the purpose of a building's soffit?",
      options: [
        { id: 'a', text: "To collect rainwater" },
        { id: 'b', text: "To provide shade" },
        { id: 'c', text: "To underside of an architectural feature" },
        { id: 'd', text: "To support the roof" }
      ],
      correctAnswer: 'c'
    },
    {
      id: 20,
      question: "Which famous architect designed the Guggenheim Museum in Bilbao, Spain?",
      options: [
        { id: 'a', text: "Frank Gehry" },
        { id: 'b', text: "Norman Foster" },
        { id: 'c', text: "Rem Koolhaas" },
        { id: 'd', text: "Santiago Calatrava" }
      ],
      correctAnswer: 'a'
    }
  ];
  
  // Mock sketching questions
  const sketchingQuestions = [
    {
      id: 1,
      title: "One-Point Perspective Drawing",
      description: "Create a one-point perspective drawing of a simple interior space with furniture.",
      instructions: [
        "Use the grid for accurate proportions",
        "Establish a clear horizon line and vanishing point",
        "Include at least 3 pieces of furniture",
        "Pay attention to line weight and clarity"
      ]
    },
    {
      id: 2,
      title: "Two-Point Perspective Drawing",
      description: "Create a two-point perspective drawing of a simple building exterior.",
      instructions: [
        "Establish horizon line and two vanishing points",
        "Draw a building with at least two visible sides",
        "Include architectural details like windows and doors",
        "Consider proportions and scale"
      ]
    },
    {
      id: 3,
      title: "Architectural Elevation",
      description: "Create a front elevation drawing of a small house.",
      instructions: [
        "Draw a simple house with proper proportions",
        "Include architectural elements like doors, windows, and roof",
        "Add details such as materials and textures",
        "Consider symmetry and balance in your design"
      ]
    },
    {
      id: 4,
      title: "Isometric Drawing",
      description: "Create an isometric drawing of a simple architectural form.",
      instructions: [
        "Use isometric projection (30° angles)",
        "Create a composition with at least 3 geometric forms",
        "Consider positive and negative space",
        "Add details to enhance the three-dimensional quality"
      ]
    },
    {
      id: 5,
      title: "Freehand Sketching",
      description: "Create a freehand sketch of an architectural landmark or building of your choice.",
      instructions: [
        "Focus on capturing the essence and character of the building",
        "Pay attention to proportions and key architectural features",
        "Use line weight variation for depth and emphasis",
        "Add shading or textures to enhance the drawing"
      ]
    }
  ];
  
  // Initialize test based on location state
  useEffect(() => {
    // Check if we have valid state data
    if (location.state && location.state.testType) {
      const type = location.state.testType;
      setTestType(type);
      
      // Set timer based on test type
      if (type === 'mcq') {
        setTimeLeft(30 * 60); // 30 minutes in seconds
      } else {
        setTimeLeft(60 * 60); // 60 minutes in seconds
      }
    } else {
      // Redirect to instructions page if no test type is specified
      navigate('/test-instructions');
    }
  }, [location.state, navigate]);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle answer selection
  const handleSelectAnswer = (questionId: number, optionId: string): void => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId
    });
  };
  
  // Handle marking a question for review
  const handleMarkQuestion = (questionId: number): void => {
    if (markedQuestions.includes(questionId)) {
      setMarkedQuestions(markedQuestions.filter(id => id !== questionId));
    } else {
      setMarkedQuestions([...markedQuestions, questionId]);
    }
  };
  
  // Navigate to previous question
  const handlePrevQuestion = (): void => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Navigate to next question
  const handleNextQuestion = (): void => {
    const maxQuestions = testType === 'mcq' ? mcqQuestions.length : sketchingQuestions.length;
    if (currentQuestion < maxQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  // Handle test submission
  const handleSubmitTest = (): void => {
    // Calculate score for MCQ test
    let score = 0;
    if (testType === 'mcq') {
      Object.entries(selectedAnswers).forEach(([questionIdStr, selectedAnswer]) => {
        const questionId = parseInt(questionIdStr, 10);
        const question = mcqQuestions.find(q => q.id === questionId);
        
        if (question && selectedAnswer === question.correctAnswer) {
          score++;
        }
      });
    }
    
    // Navigate to results page with test data
    navigate('/test-results', {
      state: {
        testType,
        score,
        totalQuestions: testType === 'mcq' ? mcqQuestions.length : sketchingQuestions.length,
        timeSpent: (testType === 'mcq' ? 30 * 60 : 60 * 60) - timeLeft,
        selectedAnswers
      }
    });
  };
  
  // Initialize canvas for sketching test
  useEffect(() => {
    if (testType === 'sketching' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Set canvas dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Set initial canvas state
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Handle window resize
      const handleResize = () => {
        if (!ctx) return;
        
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
    }
  }, [testType]);
  
  // Drawing functions for sketching test
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (testType !== 'sketching' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
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
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing || testType !== 'sketching' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
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
  
  const stopDrawing = (): void => {
    setIsDrawing(false);
  };
  
  // Render current question based on test type
  const renderQuestion = () => {
    if (testType === 'mcq') {
      const question = mcqQuestions[currentQuestion - 1];
      
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-medium text-deepNavy">
              Question {currentQuestion} of {mcqQuestions.length}
            </h2>
            <button
              onClick={() => handleMarkQuestion(question.id)}
              className={`flex items-center text-sm ${
                markedQuestions.includes(question.id) 
                  ? 'text-terracotta' 
                  : 'text-charcoal/70 hover:text-terracotta'
              } transition-colors`}
            >
              <Flag size={16} className="mr-1" />
              {markedQuestions.includes(question.id) ? 'Marked' : 'Mark for review'}
            </button>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-deepNavy mb-6">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelectAnswer(question.id, option.id)}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedAnswers[question.id] === option.id
                      ? 'border-terracotta bg-terracotta/5'
                      : 'border-gray-200 hover:border-terracotta/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedAnswers[question.id] === option.id
                      ? 'border-terracotta bg-terracotta text-white'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[question.id] === option.id && (
                      <CheckCircle size={14} />
                    )}
                  </div>
                  <span className="text-deepNavy">{option.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 1}
                className={`px-3 py-1 ${currentQuestion === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronLeft size={18} />
              </Button>
              
              <Button
                variant="outline"
                onClick={handleNextQuestion}
                disabled={currentQuestion === mcqQuestions.length}
                className={`px-3 py-1 ${currentQuestion === mcqQuestions.length ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Submit Test</span>
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      );
    } else {
      const question = sketchingQuestions[currentQuestion - 1];
      
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-medium text-deepNavy">
              Drawing Task {currentQuestion} of {sketchingQuestions.length}
            </h2>
            <button
              onClick={() => handleMarkQuestion(question.id)}
              className={`flex items-center text-sm ${
                markedQuestions.includes(question.id) 
                  ? 'text-terracotta' 
                  : 'text-charcoal/70 hover:text-terracotta'
              } transition-colors`}
            >
              <Flag size={16} className="mr-1" />
              {markedQuestions.includes(question.id) ? 'Marked' : 'Mark for review'}
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-deepNavy mb-2">{question.title}</h3>
            <p className="text-charcoal/80 mb-4">{question.description}</p>
            
            <div className="bg-cream rounded-lg p-4 mb-4">
              <h4 className="font-medium text-deepNavy mb-2 flex items-center">
                <HelpCircle size={16} className="mr-1 text-terracotta" />
                Instructions
              </h4>
              <ul className="space-y-1">
                {question.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 mr-2"></div>
                    <span className="text-sm text-charcoal/80">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Drawing tools */}
              <div className="bg-cream p-3 flex flex-wrap items-center gap-2 border-b border-gray-200">
                {[
                  { id: 'pen', name: 'Pen', icon: <PenTool size={16} /> },
                  { id: 'eraser', name: 'Eraser', icon: <Eraser size={16} /> },
                  { id: 'ruler', name: 'Ruler', icon: <Ruler size={16} /> },
                  { id: 'compass', name: 'Compass', icon: <Compass size={16} /> },
                  { id: 'layers', name: 'Layers', icon: <Layers size={16} /> },
                ].map((tool) => (
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
                    <span className="text-xs">{tool.name}</span>
                  </button>
                ))}
                
                <div className="ml-auto flex items-center space-x-2">
                  <div className="flex items-center bg-white rounded-lg p-1">
                    <Palette size={16} className="text-deepNavy mr-1" />
                    <div className="flex gap-1">
                      {['#1F2937', '#C66B3D', '#8BA793', '#C4A484', '#FFFFFF'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setStrokeColor(color)}
                          className={`w-4 h-4 rounded-full ${strokeColor === color ? 'ring-1 ring-terracotta' : ''}`}
                          style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none' }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white rounded-lg p-1">
                    <span className="text-deepNavy text-xs mr-1">Size</span>
                    <div className="flex gap-1">
                      {[1, 2, 4, 6].map((width) => (
                        <button
                          key={width}
                          onClick={() => setStrokeWidth(width)}
                          className={`w-6 h-6 rounded flex items-center justify-center ${strokeWidth === width ? 'bg-terracotta/10 text-terracotta' : 'text-deepNavy'}`}
                        >
                          <div
                            className="rounded-full bg-current"
                            style={{ width: width, height: width }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    className="p-2 rounded-lg bg-white text-deepNavy hover:bg-white/80 transition-colors duration-300"
                    title="Save Drawing"
                  >
                    <Save size={16} />
                  </button>
                </div>
              </div>
              
              {/* Canvas */}
              <div className="h-96 relative">
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
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 1}
                className={`px-3 py-1 ${currentQuestion === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronLeft size={18} />
              </Button>
              
              <Button
                variant="outline"
                onClick={handleNextQuestion}
                disabled={currentQuestion === sketchingQuestions.length}
                className={`px-3 py-1 ${currentQuestion === sketchingQuestions.length ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Submit Test</span>
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      );
    }
  };
  
  // Render question navigation sidebar
  const renderQuestionNav = () => {
    const totalQuestions = testType === 'mcq' ? mcqQuestions.length : sketchingQuestions.length;
    
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="font-medium text-deepNavy mb-4">Question Navigator</h3>
        
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const questionId = index + 1;
            const isAnswered = selectedAnswers[questionId] !== undefined;
            const isMarked = markedQuestions.includes(questionId);
            const isCurrent = currentQuestion === questionId;
            
            let bgColorClass = '';
            
            if (isCurrent) {
              bgColorClass = 'bg-deepNavy text-white';
            } else if (isAnswered && isMarked) {
              bgColorClass = 'bg-mutedGold/40 text-deepNavy border border-mutedGold';
            } else if (isAnswered) {
              bgColorClass = 'bg-sage/40 text-deepNavy';
            } else if (isMarked) {
              bgColorClass = 'bg-terracotta/40 text-deepNavy';
            } else {
              bgColorClass = 'bg-gray-100 text-deepNavy hover:bg-gray-200';
            }
            
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestion(questionId)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${bgColorClass}`}
              >
                {questionId}
              </button>
            );
          })}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-sage/40 rounded mr-2"></div>
            <span className="text-charcoal/80">Answered</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-terracotta/40 rounded mr-2"></div>
            <span className="text-charcoal/80">Marked for review</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-mutedGold/40 border border-mutedGold rounded mr-2"></div>
            <span className="text-charcoal/80">Answered & marked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
            <span className="text-charcoal/80">Not visited</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Submit confirmation modal
  const renderSubmitModal = () => {
    if (!isSubmitModalOpen) return null;
    
    const totalQuestions = testType === 'mcq' ? mcqQuestions.length : sketchingQuestions.length;
    const answeredCount = Object.keys(selectedAnswers).length;
    const unansweredCount = totalQuestions - answeredCount;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-deepNavy">Submit Test?</h3>
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="text-charcoal/70 hover:text-deepNavy transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center mr-3">
                <AlertTriangle size={20} className="text-terracotta" />
              </div>
              <p className="text-deepNavy">
                Are you sure you want to submit your test? This action cannot be undone.
              </p>
            </div>
            
            <div className="bg-cream rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-sage">{answeredCount}</div>
                  <div className="text-sm text-charcoal/70">Answered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-terracotta">{unansweredCount}</div>
                  <div className="text-sm text-charcoal/70">Unanswered</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Continue Test
            </Button>
            <Button
              className="flex-1 group relative overflow-hidden"
              onClick={handleSubmitTest}
            >
              <span className="relative z-10">Submit Test</span>
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* Header with timer */}
      <div className="bg-deepNavy text-white py-4 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">
              {testType === 'mcq' ? 'Multiple Choice Test' : 'Sketching Test'}
            </h1>
            
            <div className="flex items-center">
              <div className={`flex items-center px-4 py-2 rounded-lg ${
                timeLeft < 300 ? 'bg-terracotta/20' : 'bg-white/10'
              }`}>
                <Clock size={18} className={timeLeft < 300 ? 'text-terracotta animate-pulse' : ''} />
                <span className="ml-2 font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question navigator sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            {renderQuestionNav()}
          </div>
          
          {/* Current question */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {renderQuestion()}
          </div>
        </div>
      </div>
      
      {/* Submit confirmation modal */}
      {renderSubmitModal()}
    </div>
  );
};

export default TestInterfacePage;