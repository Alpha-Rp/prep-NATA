import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, MessageSquare, Award, Calendar, ArrowRight, Star } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'NATA 2024 Topper',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      quote: "The practice tools and community support were instrumental in my NATA preparation. I couldn't have scored 160+ without this platform.",
      rating: 5,
    },
    {
      name: 'Rahul Verma',
      role: 'Architecture Student',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      quote: "The 3D visualization tools helped me understand complex spatial concepts that were difficult to grasp from textbooks alone.",
      rating: 5,
    },
    {
      name: 'Ananya Patel',
      role: 'NATA Aspirant',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      quote: "The mock tests are incredibly similar to the actual NATA exam. My scores improved dramatically after just one month of practice.",
      rating: 4,
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
    hidden: { y: 30, opacity: 0 },
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

  const handleViewEvents = () => {
    navigate('/events');
  };

  return (
    <section ref={ref} className="py-20 bg-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cream via-cream to-white/50 opacity-80" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-mutedGold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sage/5 rounded-full blur-3xl" />
        
        {/* Animated pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #1F2937 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Floating elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: i * 0.2, duration: 1 }}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              background: i % 3 === 0 ? 'rgba(198, 107, 61, 0.1)' : i % 3 === 1 ? 'rgba(139, 167, 147, 0.1)' : 'rgba(196, 164, 132, 0.1)',
              animation: `float ${Math.random() * 10 + 10}s infinite alternate ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1 rounded-full bg-sage/10 text-sage text-sm font-medium mb-6"
          >
            <Users size={16} className="mr-2" />
            <span>Community & Success Stories</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-serif font-bold text-deepNavy mb-4 relative"
          >
            Learn from a Thriving Community of Aspirants
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: "40%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-sage to-mutedGold transform -translate-x-1/2"
              style={{ bottom: "-4px" }}
            />
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-charcoal/80 text-lg"
          >
            Connect with fellow NATA aspirants, share resources, participate in discussions, and learn from the success stories of top performers.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-lg p-6 shadow-md relative group"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-sage/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.3, type: "spring" }}
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-terracotta rounded-full flex items-center justify-center text-white text-xs"
                    >
                      <Users size={10} />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-medium text-deepNavy group-hover:text-terracotta transition-colors duration-300">{testimonial.name}</h3>
                    <p className="text-sm text-terracotta">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={`${i < testimonial.rating ? 'text-mutedGold' : 'text-gray-300'} mr-0.5`} 
                          fill={i < testimonial.rating ? '#C4A484' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-charcoal/80 italic relative">
                  <span className="absolute -top-2 -left-2 text-4xl text-terracotta/20 font-serif">"</span>
                  {testimonial.quote}
                  <span className="absolute -bottom-4 -right-2 text-4xl text-terracotta/20 font-serif">"</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ y }}
          className="bg-white rounded-lg shadow-lg overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/5 to-sage/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-12"
            >
              <h3 className="text-2xl font-serif font-bold text-deepNavy mb-4 relative inline-block">
                Join Our Community Events
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-terracotta to-sage"
                  style={{ bottom: "-4px" }}
                />
              </h3>
              <p className="text-charcoal/80 mb-6">
                Participate in webinars, workshops, and live doubt-clearing sessions conducted by architecture experts and successful NATA candidates.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <MessageSquare size={20} />, title: 'Live Doubt Clearing', subtitle: 'Every Wednesday & Saturday', color: 'bg-sage/10 text-sage' },
                  { icon: <Award size={20} />, title: 'Success Stories Webinar', subtitle: 'Monthly with NATA toppers', color: 'bg-terracotta/10 text-terracotta' },
                  { icon: <Calendar size={20} />, title: 'Workshop Series', subtitle: 'Architectural drawing techniques', color: 'bg-mutedGold/10 text-mutedGold' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="flex items-start group"
                  >
                    <motion.div 
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-2 rounded-lg ${item.color} mr-4 group-hover:shadow-md transition-all duration-300`}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-deepNavy group-hover:text-terracotta transition-colors duration-300">{item.title}</h4>
                      <p className="text-sm text-charcoal/70">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button 
                className="group relative overflow-hidden"
                onClick={handleViewEvents}
              >
                <span className="relative z-10 flex items-center">
                  View Upcoming Events
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sage to-mutedGold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-64 md:h-auto overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Community Events"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/60 to-deepNavy/30" />
              
              {/* Floating event indicators */}
              {[
                { top: '20%', left: '20%', delay: 0.5 },
                { top: '50%', left: '70%', delay: 0.7 },
                { top: '70%', left: '30%', delay: 0.9 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: pos.delay, duration: 0.5, type: "spring" }}
                  className="absolute w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="w-3 h-3 rounded-full bg-terracotta animate-ping" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;