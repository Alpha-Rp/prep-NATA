import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import { Compass, ArrowRight, Eye, EyeOff, User, Lock, Mail, Phone, UserPlus, LogIn, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

// Simple architectural model for the auth page
const AuthModel = () => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.2}
    >
      <group>
        {/* Base platform */}
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[3, 0.2, 3]} />
          <meshStandardMaterial color="#1F2937" metalness={0.3} roughness={0.8} />
        </mesh>
        
        {/* Main building */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 1.8, 1.5]} />
          <meshStandardMaterial color="#F5F2ED" metalness={0.1} roughness={0.2} />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <coneGeometry args={[1.2, 0.8, 4]} />
          <meshStandardMaterial color="#C66B3D" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Columns */}
        {[-0.6, 0.6].map((x) => (
          <mesh key={x} position={[x, 0, -0.8]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 1.6, 8]} />
            <meshStandardMaterial color="#8BA793" metalness={0.2} roughness={0.3} />
          </mesh>
        ))}
        
        {/* Windows */}
        {[[-0.4, 0.5, 0.76], [0.4, 0.5, 0.76], [-0.4, 0.5, -0.76], [0.4, 0.5, -0.76]].map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.3, 0.4, 0.05]} />
            <meshStandardMaterial color="#36454F" metalness={0.5} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Check if we have state passed from navigation
  useEffect(() => {
    if (location.state && typeof location.state === 'object') {
      if ('isSignUp' in location.state) {
        setIsSignUp(location.state.isSignUp);
      }
    }
  }, [location]);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Redirect to the page they were trying to access, or home
      const destination = location.state?.from || '/';
      navigate(destination, { replace: true });
    }
  }, [user, navigate, location.state]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Validate form
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        if (!agreeToTerms) {
          throw new Error('You must agree to the terms and conditions');
        }
        
        // Create user data object
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          gender: formData.gender
        };
        
        // Sign up
        const { error } = await signUp(formData.email, formData.password, userData);
        if (error) throw error;
        
      } else {
        // Sign in
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
      }
      
      // Redirect to the page they were trying to access, or home
      const destination = location.state?.from || '/';
      navigate(destination, { replace: true });
      
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  // Quotes for login and signup
  const loginQuotes = [
    "Welcome back, architect of tomorrow.",
    "Your creative journey continues here.",
    "Design your future, one login at a time.",
    "Great to see you again. Ready to build?",
    "Your architectural dreams await."
  ];

  const signupQuotes = [
    "Begin your architectural journey today.",
    "The first step to designing your future.",
    "Join a community of visionary architects.",
    "Your path to architectural excellence starts here.",
    "Create, design, and build with us."
  ];

  // Randomly select a quote based on mode
  const [quote, setQuote] = useState('');
  
  useEffect(() => {
    const quotes = isSignUp ? signupQuotes : loginQuotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, [isSignUp]);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-cream overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deepNavy/5 via-cream/10 to-terracotta/5" />
        
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#1F2937 0.5px, transparent 0.5px), linear-gradient(90deg, #1F2937 0.5px, transparent 0.5px)',
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Animated shapes */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 right-20 w-40 h-40 border border-terracotta/20 rounded-full opacity-30"
        />
        
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            x: [0, 20, 0],
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-20 w-60 h-60 border border-sage/20 rounded-full opacity-20"
        />
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -30],
              x: [0, Math.random() * 20 - 10]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-terracotta rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Left side - 3D model and motivational content */}
            <div className="lg:w-1/2 bg-deepNavy text-white relative">
              {/* 3D architectural model */}
              <div className="h-60 lg:h-full">
                <Canvas shadows camera={{ position: [5, 5, 5], fov: 30 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <AuthModel />
                  <Environment preset="city" />
                  <OrbitControls 
                    enableZoom={false} 
                    autoRotate 
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                  />
                </Canvas>
              </div>
              
              {/* Overlay content */}
              <div className="absolute inset-0 bg-gradient-to-t from-deepNavy via-deepNavy/80 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Compass size={24} className="text-terracotta" />
                  <h2 className="text-2xl font-serif font-bold">NATA Prep</h2>
                </div>
                
                <motion.h3 
                  key={quote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl font-medium mb-6"
                >
                  {quote}
                </motion.h3>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: 'Students', value: '10,000+' },
                    { label: 'Success Rate', value: '92%' },
                    { label: 'Top Scorers', value: '500+' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-xl font-bold text-terracotta">{stat.value}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border border-terracotta/30 rounded-full" />
                <div className="absolute bottom-40 right-10 w-16 h-16 border border-sage/30 rounded-full" />
              </div>
            </div>
            
            {/* Right side - Auth form */}
            <div className="lg:w-1/2 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => navigate(-1)}
                    className="mr-3 text-deepNavy/70 hover:text-deepNavy transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="text-3xl font-serif font-bold text-deepNavy flex items-center">
                    {isSignUp ? (
                      <>
                        <UserPlus size={28} className="mr-2 text-terracotta" />
                        Sign up
                      </>
                    ) : (
                      <>
                        <LogIn size={28} className="mr-2 text-terracotta" />
                        Welcome back
                      </>
                    )}
                  </h2>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {isSignUp && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-1">
                            First Name<span className="text-terracotta">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User size={18} className="text-charcoal/50" />
                            </div>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-colors"
                              placeholder="First Name"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-1">
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User size={18} className="text-charcoal/50" />
                            </div>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-colors"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                      Email{isSignUp && <span className="text-terracotta">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-charcoal/50" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-colors"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  
                  {isSignUp && (
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
                        Phone <span className="text-terracotta">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-charcoal/50" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-colors"
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">
                        Gender <span className="text-terracotta">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleGenderSelect('male')}
                          className={`flex items-center px-6 py-3 border ${
                            formData.gender === 'male' 
                              ? 'border-terracotta bg-terracotta/5 text-terracotta' 
                              : 'border-gray-300 bg-white text-charcoal'
                          } rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta transition-all duration-200 hover:bg-terracotta/5`}
                        >
                          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 13V21M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => handleGenderSelect('female')}
                          className={`flex items-center px-6 py-3 border ${
                            formData.gender === 'female' 
                              ? 'border-terracotta bg-terracotta/5 text-terracotta' 
                              : 'border-gray-300 bg-white text-charcoal'
                          } rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta transition-all duration-200 hover:bg-terracotta/5`}
                        >
                          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 21V13M12 21H9M12 21H15M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Female
                        </button>
                        <button
                          type="button"
                          onClick={() => handleGenderSelect('other')}
                          className={`flex items-center px-6 py-3 border ${
                            formData.gender === 'other' 
                              ? 'border-terracotta bg-terracotta/5 text-terracotta' 
                              : 'border-gray-300 bg-white text-charcoal'
                          } rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta transition-all duration-200 hover:bg-terracotta/5`}
                        >
                          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Other
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className={isSignUp ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                        Password{isSignUp && <span className="text-terracotta">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-charcoal/50" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-colors"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff size={18} className="text-charcoal/50" />
                          ) : (
                            <Eye size={18} className="text-charcoal/50" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {isSignUp && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-1">
                          Confirm Password <span className="text-terracotta">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-charcoal/50" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-terracotta transition-colors"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} className="text-charcoal/50" />
                            ) : (
                              <Eye size={18} className="text-charcoal/50" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-terracotta focus:ring-terracotta border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal cursor-pointer">
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="text-sm font-medium text-terracotta hover:text-terracotta/80 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  )}
                  
                  {isSignUp && (
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          checked={agreeToTerms}
                          onChange={() => setAgreeToTerms(!agreeToTerms)}
                          className="h-4 w-4 text-terracotta focus:ring-terracotta border-gray-300 rounded cursor-pointer"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-charcoal/80 cursor-pointer">
                          All your information is collected, stored and processed as per our data processing guidelines. By signing up on NATA Prep, you agree to our <a href="#" className="text-terracotta hover:underline">Privacy Policy</a> and <a href="#" className="text-terracotta hover:underline">Terms of Use</a>
                        </label>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {isSignUp ? (
                        <p>
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={toggleAuthMode}
                            className="font-medium text-terracotta hover:text-terracotta/80 transition-colors"
                          >
                            Login
                          </button>
                        </p>
                      ) : (
                        <p>
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={toggleAuthMode}
                            className="font-medium text-terracotta hover:text-terracotta/80 transition-colors"
                          >
                            Sign up
                          </button>
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="group relative overflow-hidden"
                      disabled={loading}
                    >
                      <span className="relative z-10 flex items-center">
                        {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
                        {!loading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Animated glow effect */}
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
                    </Button>
                  </div>
                </form>
                
                {/* Social proof */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-2">
                    <Sparkles size={14} className="mr-1" />
                    <span>Trusted by 10,000+ NATA aspirants</span>
                  </div>
                  <div className="flex justify-center mt-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                        >
                          <img
                            src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&w=100&q=80`}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-terracotta/10 border-2 border-white flex items-center justify-center text-xs text-terracotta font-medium">
                        +9K
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;