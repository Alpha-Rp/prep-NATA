import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BookOpen, FileText, Video, PenTool, Clock, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const StudyResources = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const navigate = useNavigate();

  const resources = [
    {
      icon: <FileText size={20} />,
      title: 'Study Materials',
      count: '200+',
      color: 'bg-terracotta/10 text-terracotta',
    },
    {
      icon: <Video size={20} />,
      title: 'Video Lessons',
      count: '150+',
      color: 'bg-sage/10 text-sage',
    },
    {
      icon: <PenTool size={20} />,
      title: 'Practice Sets',
      count: '300+',
      color: 'bg-mutedGold/10 text-mutedGold',
    },
    {
      icon: <Clock size={20} />,
      title: 'Mock Tests',
      count: '50+',
      color: 'bg-deepNavy/10 text-deepNavy',
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

  const handleExploreResources = () => {
    navigate('/resources');
  };

  const handleWatchVideo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-cream/50 opacity-80" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl" />
        
        {/* Animated dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-sage/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse ${Math.random() * 4 + 2}s infinite alternate ${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Decorative lines */}
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="#C66B3D"
            strokeWidth="0.2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full bg-sage/10 text-sage text-sm font-medium mb-6"
            >
              <BookOpen size={16} className="mr-2" />
              <span>Comprehensive Resources</span>
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-serif font-bold text-deepNavy mb-6 relative"
            >
              Extensive Study Materials for Complete Preparation
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "60%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sage to-terracotta"
                style={{ bottom: "-4px" }}
              />
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-charcoal/80 text-lg mb-8"
            >
              Access a vast library of carefully curated study materials, video lessons, practice sets, and mock tests designed to cover all aspects of the NATA syllabus.
            </motion.p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {resources.map((resource, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start group"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`p-3 rounded-lg ${resource.color} mr-4 group-hover:shadow-md transition-all duration-300`}
                  >
                    {resource.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-deepNavy group-hover:text-terracotta transition-colors duration-300">{resource.title}</h3>
                    <p className="text-2xl font-bold text-terracotta group-hover:scale-110 origin-left transition-transform duration-300">{resource.count}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Button 
                className="group relative overflow-hidden"
                onClick={handleExploreResources}
              >
                <span className="relative z-10 flex items-center">
                  Explore Resources
                  <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sage to-deepNavy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              style={{ y, rotate }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl cursor-pointer"
              onClick={handleWatchVideo}
            >
              {/* 3D bookshelf visualization would be implemented with Three.js */}
              <div className="absolute inset-0 bg-gradient-to-br from-deepNavy/80 to-terracotta/80 mix-blend-multiply" />
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Study Resources"
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-terracotta rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/60 to-transparent" />
              
              {/* Floating book elements */}
              <div className="absolute inset-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, i % 2 === 0 ? 2 : -2, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="absolute bg-white/90 rounded shadow-lg p-2 flex items-center"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + i * (i % 2 === 0 ? 15 : 5)}%`,
                      transform: `rotate(${i % 2 === 0 ? 5 : -5}deg)`,
                      width: `${100 + i * 10}px`,
                      height: `${30 + i * 2}px`,
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full ${i % 3 === 0 ? 'bg-terracotta' : i % 3 === 1 ? 'bg-sage' : 'bg-mutedGold'} mr-2`} />
                    <div className="w-full h-2 bg-gray-200 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating UI elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs backdrop-blur-sm bg-white/90"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-white">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-deepNavy">Latest Resources</h4>
                  <p className="text-sm text-charcoal/70">Updated weekly</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 backdrop-blur-sm bg-white/90"
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white"
                >
                  <Video size={16} />
                </motion.div>
                <span className="font-medium text-deepNavy">Video Tutorials</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudyResources;