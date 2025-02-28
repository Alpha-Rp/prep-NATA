import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Bell, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/ui/Button';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  
  const filters = [
    { id: 'all', name: 'All Events' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'webinars', name: 'Webinars' },
    { id: 'competitions', name: 'Competitions' },
  ];
  
  const events = [
    {
      id: 1,
      title: 'NATA 2025 Preparation Workshop',
      date: 'June 15, 2025',
      time: '10:00 AM - 1:00 PM',
      location: 'Online (Zoom)',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      attendees: 245,
      type: 'Workshop',
      description: 'A comprehensive workshop covering all aspects of NATA preparation, including drawing techniques, mathematical concepts, and general aptitude. Led by experienced architects and NATA experts.',
      speakers: [
        { name: 'Ar. Rajiv Mehta', role: 'Senior Architect & NATA Expert' },
        { name: 'Dr. Priya Sharma', role: 'Professor, SPA Delhi' }
      ],
      agenda: [
        { time: '10:00 AM - 10:30 AM', title: 'Introduction to NATA 2025' },
        { time: '10:30 AM - 11:30 AM', title: 'Drawing Techniques Workshop' },
        { time: '11:30 AM - 12:30 PM', title: 'Mathematical Concepts Review' },
        { time: '12:30 PM - 1:00 PM', title: 'Q&A Session' }
      ]
    },
    {
      id: 2,
      title: 'Live Drawing Session with Ar. Rajiv Mehta',
      date: 'June 20, 2025',
      time: '4:00 PM - 6:00 PM',
      location: 'Online (YouTube Live)',
      image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      attendees: 178,
      type: 'Webinar',
      description: 'Join renowned architect Rajiv Mehta for a live drawing session where he will demonstrate perspective drawing techniques and provide real-time feedback on participant submissions.',
      speakers: [
        { name: 'Ar. Rajiv Mehta', role: 'Senior Architect & NATA Expert' }
      ],
      agenda: [
        { time: '4:00 PM - 4:15 PM', title: 'Introduction and Overview' },
        { time: '4:15 PM - 5:15 PM', title: 'Live Drawing Demonstration' },
        { time: '5:15 PM - 6:00 PM', title: 'Participant Feedback and Q&A' }
      ]
    },
    {
      id: 3,
      title: 'NATA Toppers Panel Discussion',
      date: 'June 25, 2025',
      time: '5:00 PM - 7:00 PM',
      location: 'Online (Zoom)',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      attendees: 320,
      type: 'Webinar',
      description: 'Learn from the experiences of NATA toppers as they share their preparation strategies, challenges faced, and tips for success. Includes a Q&A session where you can ask your questions directly.',
      speakers: [
        { name: 'Priya Sharma', role: 'NATA 2024 Topper (AIR 12)' },
        { name: 'Rahul Verma', role: 'NATA 2024 Topper (AIR 25)' },
        { name: 'Ananya Patel', role: 'NATA 2024 Topper (AIR 18)' }
      ],
      agenda: [
        { time: '5:00 PM - 5:15 PM', title: 'Introduction of Panelists' },
        { time: '5:15 PM - 6:00 PM', title: 'Panel Discussion on NATA Preparation' },
        { time: '6:00 PM - 7:00 PM', title: 'Open Q&A Session' }
      ]
    },
    {
      id: 4,
      title: 'Architecture Portfolio Building Workshop',
      date: 'July 5, 2025',
      time: '11:00 AM - 2:00 PM',
      location: 'Delhi (SPA Campus)',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      attendees: 120,
      type: 'Workshop',
      description: 'A hands-on workshop focused on building an impressive architecture portfolio. Learn how to showcase your skills, select your best work, and present it effectively for college applications and interviews.',
      speakers: [
        { name: 'Ar. Aisha Khan', role: 'Design Consultant & Portfolio Expert' },
        { name: 'Prof. Vikram Singh', role: 'Admissions Committee Member, SPA Delhi' }
      ],
      agenda: [
        { time: '11:00 AM - 11:30 AM', title: 'Portfolio Fundamentals' },
        { time: '11:30 AM - 12:30 PM', title: 'Work Selection and Curation' },
        { time: '12:30 PM - 1:30 PM', title: 'Presentation Techniques' },
        { time: '1:30 PM - 2:00 PM', title: 'Individual Feedback Session' }
      ]
    },
    {
      id: 5,
      title: 'National Architectural Design Competition',
      date: 'July 15-30, 2025',
      time: 'Submission Deadline: July 30, 5:00 PM',
      location: 'Online Submission',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      attendees: 450,
      type: 'Competition',
      description: 'A nationwide architectural design competition for students. This year\'s theme is "Sustainable Urban Housing". Winners will receive cash prizes, internship opportunities, and national recognition.',
      speakers: [
        { name: 'Jury Panel', role: 'Leading Architects and Educators' }
      ],
      agenda: [
        { time: 'July 15', title: 'Competition Launch and Brief Release' },
        { time: 'July 15-30', title: 'Design Development Period' },
        { time: 'July 30, 5:00 PM', title: 'Submission Deadline' },
        { time: 'August 15', title: 'Results Announcement' }
      ]
    },
    {
      id: 6,
      title: 'Architectural Sketching Masterclass',
      date: 'August 10, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Mumbai (JJ College of Architecture)',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      attendees: 85,
      type: 'Workshop',
      description: 'An intensive one-day masterclass on architectural sketching techniques. Learn from master sketchers and improve your hand drawing skills essential for NATA and architectural education.',
      speakers: [
        { name: 'Ar. Sunil Patil', role: 'Urban Sketcher & Architectural Illustrator' },
        { name: 'Prof. Meera Joshi', role: 'Head of Design, JJ College of Architecture' }
      ],
      agenda: [
        { time: '10:00 AM - 11:00 AM', title: 'Fundamentals of Architectural Sketching' },
        { time: '11:00 AM - 1:00 PM', title: 'On-site Sketching Session' },
        { time: '1:00 PM - 2:00 PM', title: 'Lunch Break' },
        { time: '2:00 PM - 3:30 PM', title: 'Advanced Techniques Workshop' },
        { time: '3:30 PM - 4:00 PM', title: 'Sketch Review and Feedback' }
      ]
    },
  ];
  
  const filteredEvents = events.filter(event => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return new Date(event.date) > new Date();
    return event.type.toLowerCase() === activeFilter.slice(0, -1).toLowerCase();
  }).filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleEventExpansion = (id: number) => {
    if (expandedEvent === id) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(id);
    }
  };
  
  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* Header section */}
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
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Events & Updates</h1>
            <p className="text-xl text-white/80 mb-8">
              Stay updated with the latest NATA events, workshops, webinars, and competitions
            </p>
            
            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-white/50" />
              </div>
              <input
                type="text"
                placeholder="Search for events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
                className={`px-5 py-3 rounded-lg ${
                  activeFilter === filter.id
                    ? 'bg-mutedGold text-white'
                    : 'bg-white text-deepNavy hover:bg-white/80'
                } transition-colors duration-300`}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Events list */}
        <div className="space-y-8">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-xs rounded-full backdrop-blur-sm ${
                      event.type === 'Workshop' ? 'bg-terracotta/80' :
                      event.type === 'Webinar' ? 'bg-sage/80' : 'bg-mutedGold/80'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-serif font-bold text-deepNavy group-hover:text-terracotta transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-charcoal/80 mt-2 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start">
                      <Calendar size={18} className="text-terracotta mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm text-charcoal/60">Date</div>
                        <div className="font-medium">{event.date}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock size={18} className="text-terracotta mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm text-charcoal/60">Time</div>
                        <div className="font-medium">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={18} className="text-terracotta mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm text-charcoal/60">Location</div>
                        <div className="font-medium">{event.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users size={18} className="text-terracotta mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm text-charcoal/60">Attendees</div>
                        <div className="font-medium">{event.attendees} registered</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleEventExpansion(event.id)}
                      className="group"
                    >
                      <span className="flex items-center">
                        {expandedEvent === event.id ? 'Show Less' : 'Show More'}
                        {expandedEvent === event.id ? (
                          <ChevronUp size={16} className="ml-2" />
                        ) : (
                          <ChevronDown size={16} className="ml-2" />
                        )}
                      </span>
                    </Button>
                    
                    <Button className="group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Register Now
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        event.type === 'Workshop' ? 'bg-gradient-to-r from-terracotta to-burntOrange' :
                        event.type === 'Webinar' ? 'bg-gradient-to-r from-sage to-forestGreen' : 
                        'bg-gradient-to-r from-mutedGold to-burntOrange'
                      }`} />
                    </Button>
                  </div>
                  
                  {/* Expanded content */}
                  {expandedEvent === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-deepNavy mb-3">Speakers/Presenters</h4>
                          <div className="space-y-3">
                            {event.speakers.map((speaker, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-deepNavy/10 flex items-center justify-center text-deepNavy mr-3">
                                  {speaker.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium">{speaker.name}</div>
                                  <div className="text-sm text-charcoal/70">{speaker.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-deepNavy mb-3">Event Agenda</h4>
                          <div className="space-y-3">
                            {event.agenda.map((item, index) => (
                              <div key={index} className="flex">
                                <div className="w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mt-0.5 mr-3">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium">{item.title}</div>
                                  <div className="text-sm text-charcoal/70">{item.time}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="group"
                        >
                          <span className="flex items-center">
                            <Bell size={16} className="mr-2" />
                            Set Reminder
                          </span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="group"
                        >
                          <span className="flex items-center">
                            Share Event
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* No results */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif font-bold text-deepNavy mb-2">No events found</h3>
            <p className="text-charcoal/70 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              variant="outline"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
        
        {/* Calendar section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-serif font-bold text-deepNavy mb-8 text-center">Event Calendar</h2>
            
            <div className="text-center mb-8">
              <p className="text-charcoal/80 max-w-2xl mx-auto">
                Stay organized with our interactive event calendar. Never miss an important NATA-related event, workshop, or deadline.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  View Full Calendar
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-mutedGold to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-deepNavy text-white rounded-xl shadow-lg overflow-hidden relative"
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
              className="absolute top-0 right-0 w-40 h-40 border border-terracotta/20 rounded-full opacity-30"
            />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter to receive notifications about upcoming events, workshops, and important NATA updates.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
              <Button className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Subscribe
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-white/60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;