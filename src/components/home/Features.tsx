import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  BookOpen,
  PenTool,
  Users,
  Compass,
  Layers,
  BarChart,
  ArrowRight,
} from "lucide-react";
import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: <PenTool size={24} />,
      title: "Interactive Drawing Tools",
      description:
        "Practice architectural drawing with our digital tools that simulate real exam conditions.",
      color: "from-terracotta/20 to-burntOrange/10",
      path: "/drawing-tools",
      bgImage:
        "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      icon: <BookOpen size={24} />,
      title: "Comprehensive Resources",
      description:
        "Access a vast library of study materials, video lessons, and practice questions.",
      color: "from-sage/20 to-forestGreen/10",
      path: "/resources",
      bgImage:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      icon: <Compass size={24} />,
      title: "3D Model Viewer",
      description:
        "Explore architectural models in 3D to better understand spatial concepts and design principles.",
      color: "from-deepNavy/20 to-charcoal/10",
      path: "/practice",
      bgImage:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      icon: <BarChart size={24} />,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed analytics and personalized improvement suggestions.",
      color: "from-mutedGold/20 to-burntOrange/10",
      path: "/practice",
      bgImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      icon: <Users size={24} />,
      title: "Community Support",
      description:
        "Connect with fellow aspirants, share resources, and learn from successful candidates.",
      color: "from-terracotta/20 to-deepNavy/10",
      path: "/community",
      bgImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      icon: <Layers size={24} />,
      title: "Mock Tests",
      description:
        "Take full-length mock tests that mirror the actual NATA exam pattern and difficulty.",
      color: "from-sage/20 to-mutedGold/10",
      path: "/practice",
      bgImage:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
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
    hidden: { y: 50, opacity: 0 },
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

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleCardClick = path => {
    navigate(path);
  };

  // Mouse parallax effect for cards
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (normalized to -1 to 1)
    const moveX = (e.clientX - centerX) / (rect.width / 2);
    const moveY = (e.clientY - centerY) / (rect.height / 2);

    x.set(moveX * 10); // Limit movement to 10px
    y.set(moveY * 10);
  };

  const handleMouseLeave = () => {
    // Spring back to center
    x.set(0);
    y.set(0);
  };

  // Spring physics for smoother movement
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Transform values for parallax effect
  const rotateX = useTransform(springY, [-10, 10], [5, -5]);
  const rotateY = useTransform(springX, [-10, 10], [-5, 5]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-cream">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-cream via-terracotta/5 to-sage/5 animate-gradient-shift" />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#1F2937 0.5px, transparent 0.5px), linear-gradient(90deg, #1F2937 0.5px, transparent 0.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 4 + 2,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-terracotta/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1 rounded-full bg-deepNavy/10 text-deepNavy text-sm font-medium mb-4"
          >
            Features
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deepNavy mb-4 relative">
            Everything You Need to Ace NATA
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-terracotta to-sage"
              style={{ bottom: "-4px" }}
            />
          </h2>
          <p className="text-charcoal/80 text-lg">
            Our platform offers comprehensive tools and resources designed
            specifically for NATA preparation, helping you build the skills
            needed for success.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="h-full cursor-pointer perspective-1000"
              onClick={() => handleCardClick(feature.path)}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                style={{
                  rotateX: hoveredCard === feature.id ? rotateX : 0,
                  rotateY: hoveredCard === feature.id ? rotateY : 0,
                  transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="h-full"
              >
                <Card
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  className="h-full group relative overflow-hidden"
                  gradientColor={feature.color}
                  onClick={() => handleCardClick(feature.path)}
                  hoverEffect={false} // We're handling hover effects manually
                >
                  {/* Background image that appears on hover */}
                  <motion.div
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${feature.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Animated icon that appears on hover */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-white"
                  >
                    <ArrowRight size={18} />
                  </motion.div>

                  {/* 3D floating effect elements */}
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 bg-terracotta/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      translateZ: hoveredCard === feature.id ? "20px" : "0px",
                      transition: "transform 0.3s ease-out",
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-sage/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      translateZ: hoveredCard === feature.id ? "10px" : "0px",
                      transition: "transform 0.3s ease-out",
                    }}
                  />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
