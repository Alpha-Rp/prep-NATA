import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// Dynamic 3D architectural model with interactive elements
const ArchitecturalModel = ({ hovered, setHovered }) => {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const groupRef = useRef();

  useEffect(() => {
    if (hovered) {
      setRotationSpeed(0.2);
    } else {
      setRotationSpeed(0.5);
    }
  }, [hovered]);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main building structure */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#C66B3D"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Secondary structures */}
        <mesh position={[-0.8, 0.8, 0.8]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#8BA793"
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0.8, -0.8, 0.8]} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial
            color="#C4A484"
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        {/* Roof structure */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <coneGeometry args={[0.7, 0.5, 4]} />
          <meshStandardMaterial
            color="#1F2937"
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>

        {/* Base platform */}
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

        {/* Animated elements that appear on hover */}
        <AnimatePresence>
          {hovered && (
            <>
              <mesh position={[0, 1.5, 0]} castShadow>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color="#C66B3D"
                  emissive="#C66B3D"
                  emissiveIntensity={0.5}
                />
              </mesh>

              <mesh position={[-1.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
                <meshStandardMaterial
                  color="#8BA793"
                  metalness={0.5}
                  roughness={0.2}
                />
              </mesh>

              <mesh position={[1.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
                <meshStandardMaterial
                  color="#8BA793"
                  metalness={0.5}
                  roughness={0.2}
                />
              </mesh>
            </>
          )}
        </AnimatePresence>
      </group>
    </Float>
  );
};

// Dynamic floating text elements
const FloatingText = ({ text, position, color = "#ffffff", size = 0.15 }) => {
  return (
    <Text
      position={position}
      color={color}
      fontSize={size}
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
    >
      {text}
    </Text>
  );
};

// Dynamic background particles
const ParticleField = () => {
  const count = 500;
  const positions = useRef(new Float32Array(count * 3));
  const sizes = useRef(new Float32Array(count));
  const colors = useRef(new Float32Array(count * 3));
  const particleRef = useRef();

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.current[i3] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 2] = (Math.random() - 0.5) * 10;

      sizes.current[i] = Math.random() * 0.1;

      // Color variations
      if (i % 3 === 0) {
        // Terracotta
        colors.current[i3] = 0.776;
        colors.current[i3 + 1] = 0.42;
        colors.current[i3 + 2] = 0.24;
      } else if (i % 3 === 1) {
        // Sage
        colors.current[i3] = 0.545;
        colors.current[i3 + 1] = 0.655;
        colors.current[i3 + 2] = 0.576;
      } else {
        // Cream
        colors.current[i3] = 0.96;
        colors.current[i3 + 1] = 0.95;
        colors.current[i3 + 2] = 0.93;
      }
    }

    // Animate particles
    gsap.to(particleRef.current.rotation, {
      y: Math.PI * 2,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <points ref={particleRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Hero = () => {
  const blueprintRef = useRef(null);
  const shapesRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const navigate = useNavigate();

  // Dynamic parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Dynamic 3D scene state
  const [activeScene, setActiveScene] = useState("default");
  const [showArchitectureTerms, setShowArchitectureTerms] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Architecture terms that will float around the 3D model
  const architectureTerms = [
    { text: "Perspective", position: [2, 0, 0], color: "#C66B3D" },
    { text: "Proportion", position: [-2, 0.5, 0], color: "#8BA793" },
    { text: "Balance", position: [0, 2, 0], color: "#F5F2ED" },
    { text: "Rhythm", position: [1.5, -1.5, 0], color: "#C4A484" },
    { text: "Harmony", position: [-1.5, -1, 0], color: "#C66B3D" },
  ];

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
    const handleMouseMove = e => {
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

    // Show architecture terms after a delay
    const termsTimer = setTimeout(() => {
      setShowArchitectureTerms(true);
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(termsTimer);
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

  // Change 3D scene on interaction
  const cycleScene = () => {
    setActiveScene(prev => {
      if (prev === "default") return "expanded";
      if (prev === "expanded") return "detailed";
      return "default";
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Dynamic animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-deepNavy/90 to-deepNavy/80 overflow-hidden">
        {/* Blueprint background with enhanced animation */}
        <div
          ref={blueprintRef}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-deepNavy/10 via-transparent to-terracotta/10 animate-gradient-shift" />

        {/* Dynamic particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-1 h-1 bg-terracotta rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes with enhanced animation */}
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

          {/* Additional geometric elements with mouse parallax */}
          <div
            className="absolute top-1/3 left-2/3 w-24 h-24 bg-deepNavy/10 rotate-45 blur-sm"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${
                mousePosition.y * 10
              }px) rotate(${mousePosition.x * 5}deg)`,
            }}
          />

          {/* Animated lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 2, delay: 0.5 }}
              d="M0,50 C20,20 50,80 100,50"
              stroke="#C66B3D"
              strokeWidth="0.2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 2, delay: 1 }}
              d="M0,30 C30,10 70,90 100,70"
              stroke="#8BA793"
              strokeWidth="0.2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
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
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
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
                  {word === "Architectural" && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1.5 }}
                      className="absolute bottom-0 left-0 h-1 bg-terracotta/50"
                      style={{ bottom: "-4px" }}
                    />
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/80 mb-8 max-w-lg"
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
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden text-white border-white/30 hover:border-white"
                onClick={handleExploreResources}
              >
                <span className="relative z-10">Explore Resources</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-deepNavy overflow-hidden"
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
              <div className="text-sm text-white/80">
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
            onClick={cycleScene}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Interactive 3D scene with Three.js */}
              <div className="absolute inset-0 rounded-lg overflow-hidden cursor-pointer">
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

                  {/* Dynamic 3D content based on active scene */}
                  <ArchitecturalModel
                    hovered={hovered}
                    setHovered={setHovered}
                  />

                  {/* Floating architecture terms */}
                  {showArchitectureTerms &&
                    architectureTerms.map((term, index) => (
                      <motion.group
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                      >
                        <FloatingText
                          text={term.text}
                          position={term.position}
                          color={term.color}
                        />
                      </motion.group>
                    ))}

                  {/* Dynamic particle field */}
                  <ParticleField />

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

              {/* Animated frame */}
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

              {/* Interactive prompt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-terracotta rounded-full mr-2 animate-pulse"></span>
                  Click to explore the 3D model
                </span>
              </motion.div>
            </div>

            {/* Floating UI elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs text-white border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-terracotta" />
                <span className="font-medium">Drawing Skills</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
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
              className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 text-white border border-white/20"
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
                <span className="font-medium">Top Scorers</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
