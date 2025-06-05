import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { PenTool, Ruler, Compass, Eye, Layers, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const PracticeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const navigate = useNavigate();

  const tools = [
    {
      icon: <PenTool size={20} />,
      name: 'Drawing Tools',
      description: 'Sketch and draw with precision',
    },
    {
      icon: <Ruler size={20} />,
      name: 'Measurement',
      description: 'Accurate scaling and dimensions',
    },
    {
      icon: <Compass size={20} />,
      name: 'Perspective',
      description: 'Master spatial visualization',
    },
    {
      icon: <Layers size={20} />,
      name: 'Layering',
      description: 'Create complex compositions',
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
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      },
    },
  };

  const handleDrawingTools = () => {
    navigate('/drawing-tools');
  };

  return (
    <section ref={ref} className="py-20 bg-deepNavy text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-sage/20 rounded-full blur-3xl" 
        />
        
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Animated lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
                animation: `moveLeftRight ${8 + i * 2}s infinite linear ${i * 0.5}s`,
              }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-sage/30 to-transparent"
              style={{
                left: `${20 + i * 15}%`,
                top: 0,
                bottom: 0,
                animation: `moveTopBottom ${8 + i * 2}s infinite linear ${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Interactive drawing canvas visualization */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-deepNavy/80" />
                <img
                  src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Drawing Canvas"
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                
                {/* Grid overlay */}
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    animation: 'gridMove 15s linear infinite',
                  }}
                />
                
                {/* Drawing path animation */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    d="M20,50 C20,30 40,30 50,50 C60,70 80,70 80,50"
                    fill="none"
                    stroke="#C66B3D"
                    strokeWidth="0.5"
                    strokeDasharray="0 1"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                    d="M30,30 L70,30 L70,70 L30,70 Z"
                    fill="none"
                    stroke="#8BA793"
                    strokeWidth="0.5"
                    strokeDasharray="0 1"
                  />
                </svg>
              </div>
              
              {/* Tool overlay */}
              <div className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex justify-between">
                {[<PenTool key="pen" />, <Ruler key="ruler" />, <Compass key="compass" />, <Eye key="eye" />].map((icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -2, scale: 1.1 }}
                    className="w-10 h-10 flex items-center justify-center rounded-md bg-white/20 text-white cursor-pointer hover:bg-terracotta/60 transition-colors"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
              
              {/* Cursor animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="absolute"
                animate={{
                  x: [100, 200, 150, 250, 100],
                  y: [100, 150, 250, 200, 100],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1.5
                }}
              >
                <div className="w-4 h-4 rounded-full border-2 border-white" />
              </motion.div>
              
              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white text-deepNavy rounded-lg shadow-lg p-4"
              >
                <div className="text-sm font-medium mb-1">Drawing Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="bg-terracotta h-2 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/20 text-terracotta text-sm font-medium mb-6"
            >
              <PenTool size={16} className="mr-2" />
              <span>Interactive Practice</span>
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-serif font-bold mb-6"
            >
              Master Architectural Drawing Skills
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg mb-8"
            >
              Our interactive drawing tools simulate real exam conditions, allowing you to practice and perfect your architectural drawing skills with immediate feedback.
            </motion.p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {tools.map((tool, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="flex items-start group"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 rounded-lg bg-terracotta/20 mr-3 group-hover:bg-terracotta/40 transition-colors duration-300"
                  >
                    {tool.icon}
                   </motion.div>
                  <div>
                    <h3 className="font-medium">{tool.name}</h3>
                    <p className="text-sm text-white/70">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Button 
                className="group relative overflow-hidden"
                onClick={handleDrawingTools}
              >
                <span className="relative z-10 flex items-center">
                  Try Drawing Tools
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;
