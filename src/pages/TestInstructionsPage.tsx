import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, CheckCircle, AlertTriangle, Wifi, 
  Monitor, Info, ArrowRight, Play, Shield, HelpCircle, 
  Compass, BookOpen, Brain, PenTool, Calculator
} from 'lucide-react';
import Button from '../components/ui/Button';

const TestInstructionsPage = () => {
  const navigate = useNavigate();
  const [systemChecks, setSystemChecks] = useState({
    browser: false,
    internet: false,
    fullscreen: false
  });
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [testType, setTestType] = useState<string | null>(null);

  // Simulate system checks
  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemChecks({
        browser: true,
        internet: true,
        fullscreen: true
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Check if all system requirements are met
  useEffect(() => {
    if (Object.values(systemChecks).every(check => check)) {
      setIsReady(true);
    }
  }, [systemChecks]);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleStartTest = () => {
    if (testType) {
      navigate('/test-interface', { state: { testType } });
    }
  };

  const handleTutorial = () => {
    navigate('/tutorial');
  };

  const handleSelectTestType = (type: string) => {
    setTestType(type);
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
          
          {/* Animated shapes */}
          <motion.div 
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-80 h-80 border border-terracotta/20 rounded-full opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-terracotta/20 text-terracotta text-sm font-medium mb-4"
            >
              <Compass size={18} className="mr-2" />
              <span>NATA Practice Test</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Choose Your Test Type</h1>
            <p className="text-xl text-white/80 mb-8">
              Select the type of test you'd like to take
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Test type selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
          >
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${testType === 'mcq' ? 'ring-4 ring-terracotta' : ''}`}
              onClick={() => handleSelectTestType('mcq')}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mr-4">
                    <Calculator size={32} className="text-terracotta" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-deepNavy">Multiple Choice Test</h2>
                    <p className="text-charcoal/70">Test your architectural knowledge</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">20 multiple-choice questions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">30 minutes duration</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">Covers architectural history, design principles, and more</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">Instant results and analysis</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-charcoal/70">
                  <span>Difficulty: Moderate</span>
                  <span>Recommended for all levels</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${testType === 'sketching' ? 'ring-4 ring-sage' : ''}`}
              onClick={() => handleSelectTestType('sketching')}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mr-4">
                    <PenTool size={32} className="text-sage" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-deepNavy">Sketching Test</h2>
                    <p className="text-charcoal/70">Practice your drawing skills</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">5 drawing tasks</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">60 minutes duration</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">Includes perspective drawing, architectural sketching</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">Digital drawing tools provided</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-charcoal/70">
                  <span>Difficulty: Challenging</span>
                  <span>Recommended for intermediate+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* System requirements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
          >
            <div className="p-8">
              <h2 className="text-2xl font-serif font-bold text-deepNavy mb-6 flex items-center">
                <Shield size={24} className="mr-2 text-terracotta" />
                System Requirements Check
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    systemChecks.browser ? 'bg-sage/20 text-sage' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {systemChecks.browser ? <CheckCircle size={18} /> : <Monitor size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-deepNavy">Compatible Browser</h3>
                      {systemChecks.browser ? (
                        <span className="text-sage text-sm">Passed</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Checking...</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: systemChecks.browser ? '100%' : '60%' }}
                        transition={{ duration: 1 }}
                        className={`h-1.5 rounded-full ${systemChecks.browser ? 'bg-sage' : 'bg-gray-400'}`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    systemChecks.internet ? 'bg-sage/20 text-sage' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {systemChecks.internet ? <CheckCircle size={18} /> : <Wifi size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-deepNavy">Internet Connectivity</h3>
                      {systemChecks.internet ? (
                        <span className="text-sage text-sm">Passed</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Checking...</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: systemChecks.internet ? '100%' : '80%' }}
                        transition={{ duration: 1.2 }}
                        className={`h-1.5 rounded-full ${systemChecks.internet ? 'bg-sage' : 'bg-gray-400'}`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    systemChecks.fullscreen ? 'bg-sage/20 text-sage' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {systemChecks.fullscreen ? <CheckCircle size={18} /> : <Monitor size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-deepNavy">Screen Resolution</h3>
                      {systemChecks.fullscreen ? (
                        <span className="text-sage text-sm">Passed</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Checking...</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: systemChecks.fullscreen ? '100%' : '40%' }}
                        transition={{ duration: 1.4 }}
                        className={`h-1.5 rounded-full ${systemChecks.fullscreen ? 'bg-sage' : 'bg-gray-400'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Test instructions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
          >
            <div className="p-8">
              <h2 className="text-2xl font-serif font-bold text-deepNavy mb-6 flex items-center">
                <Info size={24} className="mr-2 text-terracotta" />
                Test Instructions
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    id: 'general',
                    title: 'General Instructions',
                    content: (
                      <ul className="space-y-2 text-charcoal/80">
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>Read each question carefully before selecting an answer.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>You can navigate between questions using the previous and next buttons.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>Your answers are automatically saved as you proceed.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>The test will automatically submit when the time expires.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>You can mark questions for review and return to them later.</span>
                        </li>
                      </ul>
                    )
                  },
                  {
                    id: 'mcq',
                    title: 'Multiple Choice Test Instructions',
                    content: (
                      <ul className="space-y-2 text-charcoal/80">
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                          <span>Each question has four options with only one correct answer.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                          <span>Questions cover architectural history, design principles, building materials, and more.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                          <span>Some questions may include images for reference.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                          <span>There is no negative marking for incorrect answers.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-terracotta mr-2 mt-0.5 flex-shrink-0" />
                          <span>Try to attempt all questions within the time limit.</span>
                        </li>
                      </ul>
                    )
                  },
                  {
                    id: 'sketching',
                    title: 'Sketching Test Instructions',
                    content: (
                      <ul className="space-y-2 text-charcoal/80">
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>Use the provided digital drawing tools to complete sketching tasks.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>Tools include pencil, pen, eraser, shapes, and color palette.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>Drawing tasks may include perspective drawing, architectural sketching, and composition.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>Your drawings are automatically saved as you work.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-sage mr-2 mt-0.5 flex-shrink-0" />
                          <span>You can zoom in/out and use grid overlays for precision.</span>
                        </li>
                      </ul>
                    )
                  }
                ].map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 bg-cream text-left focus:outline-none"
                    >
                      <h3 className="font-medium text-deepNavy">{section.title}</h3>
                      <div className={`w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform duration-300 ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`}>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>
                    
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-white"
                      >
                        {section.content}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto group"
              onClick={handleTutorial}
            >
              <span className="flex items-center">
                <HelpCircle size={18} className="mr-2" />
                View Tutorial
              </span>
            </Button>
            
            <Button
              size="lg"
              className={`w-full md:w-auto group relative overflow-hidden ${
                !isReady || !testType ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              onClick={handleStartTest}
              disabled={!isReady || !testType}
            >
              <span className="relative z-10 flex items-center">
                Start Test
                {isReady && testType ? (
                  <Play size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <span className="ml-2 text-sm">
                    {!isReady ? "(System check in progress...)" : "(Select a test type)"}
                  </span>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated glow effect */}
              {isReady && testType && (
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(198, 107, 61, 0)",
                      "0 0 0 10px rgba(198, 107, 61, 0.1)",
                      "0 0 0 20px rgba(198, 107, 61, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 rounded-md"
                />
              )}
            </Button>
          </motion.div>
          
          {/* Tips section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-deepNavy text-white rounded-xl shadow-lg overflow-hidden relative"
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
            
            <div className="relative z-10 p-8">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
                <Compass size={24} className="mr-2 text-terracotta" />
                Tips for Success
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Calculator size={20} className="text-terracotta mr-2" />
                    Multiple Choice Tips
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      'Read each question carefully before selecting an answer',
                      'Eliminate obviously incorrect options first',
                      'Manage your time - don\'t spend too long on any one question',
                      'If unsure, mark the question for review and return later',
                      'Review all answers before final submission if time permits'
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
                    <PenTool size={20} className="text-sage mr-2" />
                    Sketching Tips
                  </h3>
                  
                  <ul className="space-y-3">
                    {[
                      'Start with light guidelines before committing to darker lines',
                      'Use the grid overlay for accurate proportions',
                      'Practice time management - allocate time per drawing task',
                      'Use perspective guides for architectural drawings',
                      'Save your work frequently using the auto-save feature'
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
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionsPage;