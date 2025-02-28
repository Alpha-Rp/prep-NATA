import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// Optimized architectural model with better performance
const ArchitecturalModel = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C66B3D" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[-0.8, 0.8, 0.8]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#8BA793" metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0.8, -0.8, 0.8]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#C4A484" metalness={0.4} roughness={0.2} />
      </mesh>
      <group position={[0, -1, 0]}>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial
            color="#1F2937"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Hero = () => {
  const blueprintRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const navigate = useNavigate();

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Animate blueprint grid with optimized performance
    if (blueprintRef.current) {
      gsap.to(blueprintRef.current, {
        backgroundPosition: "100px 100px",
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

    // Animate floating shapes with reduced complexity
    if (shapesRef.current) {
      const shapes = shapesRef.current.children;
      for (let i = 0; i < shapes.length; i++) {
        gsap.to(shapes[i], {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      }
    }

    // Optimized mouse parallax effect with throttling
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 30) return; // Throttle to 30ms
      lastTime = now;

      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate normalized mouse position (-1 to 1)
      const normalizedX = (clientX / windowWidth) * 2 - 1;
      const normalizedY = (clientY / windowHeight) * 2 - 1;

      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger for better performance
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const titleText = "Build Your Path to Architectural Excellence";
  const titleWords = titleText.split(" ");

  const handleStartPracticing = () => {
    navigate("/test-instructions");
  };

  const handleExploreResources = () => {
    navigate("/resources");
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ y, opacity }}
    >
      {/* Blueprint background with enhanced animation */}
      <div
        ref={blueprintRef}
        className="absolute inset-0 opacity-5 bg-deepNavy"
        style={{
          backgroundImage:
            "linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deepNavy/10 via-transparent to-terracotta/10 animate-gradient-shift" />

      {/* Floating geometric shapes with enhanced animation - reduced number for better performance */}
      <div
        ref={shapesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute top-1/4 left-1/5 w-40 h-40 bg-terracotta/15 rounded-full blur-xl"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${
              mousePosition.y * -15
            }px)`,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-52 h-52 bg-sage/15 rounded-full blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-mutedGold/15 rounded-full blur-xl"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${
              mousePosition.y * 25
            }px)`,
          }}
        />

        {/* Additional geometric elements - reduced for better performance */}
        <div
          className="absolute top-1/3 left-2/3 w-24 h-24 bg-deepNavy/10 rotate-45 blur-sm"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${
              mousePosition.y * 10
            }px) rotate(${mousePosition.x * 5}deg)`,
          }}
        />
      </div>

      {/* Animated particles - reduced number for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/20 text-terracotta text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Compass size={16} className="mr-2" />
              <span>NATA Preparation Platform</span>
              <Sparkles size={14} className="ml-2 animate-pulse" />
            </motion.div>

            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-deepNavy leading-tight mb-6"
            >
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block mr-2 relative">
                  {word.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      variants={letterVariants}
                      className={`inline-block ${
                        word === "Architectural" ? "text-terracotta" : ""
                      }`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-charcoal/80 mb-8 max-w-lg"
            >
              Comprehensive preparation for the National Aptitude Test in
              Architecture with interactive tools, practice resources, and a
              supportive community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={handleStartPracticing}
              >
                <span className="relative z-10 flex items-center">
                  Start Practicing
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden"
                onClick={handleExploreResources}
              >
                <span className="relative z-10">Explore Resources</span>
                <span className="absolute inset-0 bg-deepNavy opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex items-center space-x-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        1500000000000 + i * 1000
                      }?auto=format&fit=crop&w=100&q=80`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="text-sm text-charcoal">
                <span className="font-semibold">2,500+</span> students already
                preparing
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-blueprint bg-cover bg-center rounded-lg opacity-10" />

              {/* 3D Model with Three.js - optimized for performance */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Canvas shadows dpr={[1, 1.5]} className="rounded-lg">
                  <PerspectiveCamera makeDefault position={[3, 3, 3]} />
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                  />
                  <ArchitecturalModel />
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

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{
                    rotate: [0, 3, 0, -3, 0],
                    scale: [1, 1.02, 1, 0.98, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-4/5 h-4/5 border-2 border-terracotta/50 rounded-lg"
                />
                <motion.div
                  animate={{
                    rotate: [0, -3, 0, 3, 0],
                    scale: [1, 0.98, 1, 1.02, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute w-3/4 h-3/4 border-2 border-sage/50 rounded-lg"
                />
              </div>

              {/* Animated grid lines */}
              <div className="absolute inset-0 rounded-lg overflow-hidden opacity-20 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #C66B3D 1px, transparent 1px), linear-gradient(to bottom, #C66B3D 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    animation: "gridMove 20s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* Floating UI elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs backdrop-blur-sm bg-white/80"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-terracotta" />
                <span className="font-medium text-deepNavy">
                  Drawing Skills
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                  className="bg-terracotta h-2 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 backdrop-blur-sm bg-white/80"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-white font-bold"
                >
                  A+
                </motion.div>
                <span className="font-medium text-deepNavy">Top Scorers</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
