import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

const CallToAction = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    // Calculate normalized position (-1 to 1)
    const x = ((clientX - left) / width) * 2 - 1;
    const y = ((clientY - top) / height) * 2 - 1;

    setMousePosition({ x, y });
  };

  const benefits = [
    "Access to 500+ practice resources",
    "Interactive drawing tools",
    "3D architectural model viewer",
    "Performance tracking dashboard",
    "Community support & events",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const handleStartFreeTrial = () => {
    if (user) {
      navigate("/test-instructions");
    } else {
      navigate("/auth");
    }
  };

  const handleExploreFeatures = () => {
    navigate("/resources");
  };

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      color: i % 3 === 0 ? "#C66B3D" : i % 3 === 1 ? "#8BA793" : "#F5F2ED",
      opacity: Math.random() * 0.5 + 0.1,
    }));

    setParticles(newParticles);
  }, []);

  // Create motion values for parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(mousePosition.x * 20);
    y.set(mousePosition.y * 20);
  }, [mousePosition, x, y]);

  return (
    <section
      ref={ref}
      className="py-20 bg-deepNavy text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-deepNavy via-deepNavy to-deepNavy/90" />

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-terracotta/10 to-deepNavy opacity-30 animate-gradient-shift" />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -100],
              opacity: [particle.opacity, 0],
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Decorative shapes with parallax effect */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 border border-terracotta/20 rounded-full opacity-30"
          style={{ x, y }}
        />

        <motion.div
          className="absolute bottom-40 right-10 w-16 h-16 border border-sage/30 rounded-full"
          style={{
            x: useTransform(x, value => value * 1.5),
            y: useTransform(y, value => value * 1.5),
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/20 text-terracotta text-sm font-medium mb-6"
          >
            <Sparkles size={16} className="mr-2" />
            <span>Start Your Journey</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6"
          >
            Ready to Begin Your{" "}
            <span className="text-terracotta relative">
              Architectural
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-terracotta/50"
                style={{ bottom: "-4px" }}
              />
            </span>{" "}
            Journey?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of successful NATA aspirants who have transformed
            their preparation with our comprehensive platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transition: { duration: 0.2 },
                }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm group"
              >
                <CheckCircle
                  size={16}
                  className="text-terracotta mr-2 group-hover:scale-110 transition-transform duration-300"
                />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={handleStartFreeTrial}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button
              onClick={handleExploreFeatures}
              variant="outline"
              className="group border-white text-white hover:bg-white/10"
            >
              <span className="flex items-center">
                Explore Features
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
