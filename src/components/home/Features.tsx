import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, PenTool, Users, Compass, Layers, BarChart } from 'lucide-react';
import Card from '../ui/Card';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const features = [
    {
      icon: <PenTool size={24} />,
      title: 'Interactive Drawing Tools',
      description: 'Practice architectural drawing with our digital tools that simulate real exam conditions.',
      color: 'from-terracotta/20 to-burntOrange/10',
      path: '/drawing-tools'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Comprehensive Resources',
      description: 'Access a vast library of study materials, video lessons, and practice questions.',
      color: 'from-sage/20 to-forestGreen/10',
      path: '/resources'
    },
    {
      icon: <Compass size={24} />,
      title: '3D Model Viewer',
      description: 'Explore architectural models in 3D to better understand spatial concepts and design principles.',
      color: 'from-deepNavy/20 to-charcoal/10',
      path: '/practice'
    },
    {
      icon: <BarChart size={24} />,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and personalized improvement suggestions.',
      color: 'from-mutedGold/20 to-burntOrange/10',
      path: '/practice'
    },
    {
      icon: <Users size={24} />,
      title: 'Community Support',
      description: 'Connect with fellow aspirants, share resources, and learn from successful candidates.',
      color: 'from-terracotta/20 to-deepNavy/10',
      path: '/community'
    },
    {
      icon: <Layers size={24} />,
      title: 'Mock Tests',
      description: 'Take full-length mock tests that mirror the actual NATA exam pattern and difficulty.',
      color: 'from-sage/20 to-mutedGold/10',
      path: '/practice'
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
        damping: 12 
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
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cream via-cream to-white opacity-80" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sage/5 rounded-full blur-3xl" />
        
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#1F2937 0.5px, transparent 0.5px), linear-gradient(90deg, #1F2937 0.5px, transparent 0.5px)',
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Animated dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-terracotta/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse ${Math.random() * 4 + 2}s infinite alternate ${Math.random() * 2}s`,
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
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
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
            Our platform offers comprehensive tools and resources designed specifically for NATA preparation, helping you build the skills needed for success.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="h-full cursor-pointer"
              onClick={() => handleCardClick(feature.path)}
            >
              <Card
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="h-full group"
                gradientColor={feature.color}
                onClick={() => handleCardClick(feature.path)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;