import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Mail, Phone, MapPin, ArrowRight, Users, BookOpen, Award, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Ar. Rajiv Mehta',
      role: 'Founder & Lead Architect',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Rajiv is a practicing architect with over 15 years of experience and a passion for architectural education. He founded NATA Prep to help aspiring architects achieve their dreams.'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Academic Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Priya holds a PhD in Architecture and has been teaching at prestigious architecture schools for over a decade. She oversees all academic content and curriculum development.'
    },
    {
      name: 'Vikram Singh',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Vikram combines his architectural background with technical expertise to develop innovative digital tools that enhance the learning experience for NATA aspirants.'
    },
    {
      name: 'Aisha Khan',
      role: 'Design Mentor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Aisha specializes in architectural visualization and drawing techniques. She leads workshops and provides personalized feedback to help students improve their drawing skills.'
    }, {
      name: 'Arjun Patel',
      role: 'Student Success Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      bio: 'Arjun works closely with students to understand their needs and challenges. He coordinates mentorship programs and ensures students receive the support they need to succeed.'
    },
  ];
  
  const milestones = [
    {
      year: 2020,
      title: 'Foundation',
      description: 'NATA Prep was founded with a mission to provide quality resources for architecture aspirants.'
    },
    {
      year: 2021,
      title: 'Digital Platform Launch',
      description: 'Launched our comprehensive online platform with interactive tools and resources.'
    },
    {
      year: 2022,
      title: 'Community Growth',
      description: 'Reached 5,000+ active students and expanded our team of mentors and educators.'
    },
    {
      year: 2023,
      title: 'Success Stories',
      description: '92% of our students successfully cleared NATA, with many securing top ranks.'
    },
    {
      year: 2024,
      title: 'Advanced Tools',
      description: 'Introduced AI-powered drawing feedback and personalized learning paths.'
    },
    {
      year: 2025,
      title: 'Nationwide Expansion',
      description: 'Established partnerships with leading architecture colleges across India.'
    },
  ];
  
  const stats = [
    { value: '15,000+', label: 'Active Students', icon: <Users size={24} /> },
    { value: '500+', label: 'Practice Resources', icon: <BookOpen size={24} /> },
    { value: '92%', label: 'Success Rate', icon: <Award size={24} /> },
    { value: '250+', label: 'Events Conducted', icon: <Calendar size={24} /> },
  ];
  
  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* Hero section */}
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
          
          <motion.div 
            animate={{ 
              rotate: [360, 0],
            }}
            transition={{ 
              duration: 40, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -left-40 w-120 h-120 border border-sage/20 rounded-full opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Compass size={24} className="text-terracotta" />
                <span className="font-serif text-xl">NATA Prep</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Empowering Future Architects
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                We're on a mission to make quality architectural education accessible to all aspiring architects. Our comprehensive platform provides the tools, resources, and community support needed to excel in NATA and beyond.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Our Story
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <span className="flex items-center">
                    Meet Our Team
                  </span>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="NATA Prep Team"
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent rounded-lg" />
                
                {/* Floating elements */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs backdrop-blur-sm bg-white/90">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-deepNavy">Our Impact</h4>
                      <p className="text-sm text-charcoal/70">Since 2020</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-xl font-bold text-terracotta">15K+</div>
                      <div className="text-xs text-charcoal/70">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-terracotta">92%</div>
                      <div className="text-xs text-charcoal/70">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-terracotta">50+</div>
                      <div className="text-xs text-charcoal/70">Mentors</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-deepNavy mb-6"
          >
            Our Mission & Vision
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-medium text-terracotta mb-3">Our Mission</h3>
              <p className="text-charcoal/80">
                To democratize architectural education by providing accessible, high-quality resources and tools that empower students to excel in NATA and pursue their architectural dreams, regardless of their background or location.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-medium text-sage mb-3">Our Vision</h3>
              <p className="text-charcoal/80">
                To build a vibrant community of architectural learners and professionals that fosters innovation, creativity, and excellence in architectural education, creating pathways for the next generation of architects to shape our built environment.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-medium text-mutedGold mb-3">Our Values</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {['Excellence', 'Accessibility', 'Innovation', 'Community'].map((value) => (
                  <div key={value} className="text-center p-3 bg-cream rounded-lg">
                    <span className="font-medium text-deepNavy">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-20"
        >
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-serif font-bold text-deepNavy mb-12 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/20 text-terracotta mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-deepNavy">{stat.value}</div>
                  <div className="text-charcoal/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Timeline */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-deepNavy mb-12 text-center"
          >
            Our Journey
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-terracotta/20 z-0"></div>
            
            <div className="relative z-10">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="text-xl font-bold text-terracotta mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-medium text-deepNavy mb-2">{milestone.title}</h3>
                      <p className="text-charcoal/80">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white">
                    {milestone.year.toString().slice(-2)}
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-deepNavy mb-6 text-center"
          >
            Meet Our Team
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal/80 text-center max-w-3xl mx-auto mb-12"
          >
            Our team consists of experienced architects, educators, and technology experts who are passionate about architectural education and student success.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl shadow-md overflow-hidden text-center group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent" />
                </div>
                
                <div className="relative mt-[-40px] z-10 px-6 pb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-deepNavy mt-3 group-hover:text-terracotta transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="text-terracotta mb-4">{member.role}</div>
                  
                  <p className="text-charcoal/80 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Get in Touch</h2>
                <p className="text-white/80 mb-8">
                  Have questions about our platform or need assistance? We're here to help. Reach out to us through any of the following channels.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-terracotta mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Our Office</h3>
                      <p className="text-white/70">
                        123 Architecture Avenue, Design District<br />
                        New Delhi, 110001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="text-terracotta mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-white/70">
                        contact@nataprep.com<br />
                        support@nataprep.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="text-terracotta mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-white/70">
                        +91 123 456 7890<br />
                        +91 987 654 3210
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full group relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;