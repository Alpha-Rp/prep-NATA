import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Calendar,
  Award,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  User,
  Search,
  Eye,
} from "lucide-react";
import Button from "../components/ui/Button";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    {
      id: "discussions",
      name: "Discussions",
      icon: <MessageSquare size={18} />,
    },
    { id: "portfolios", name: "Student Portfolios", icon: <Users size={18} /> },
    { id: "events", name: "Upcoming Events", icon: <Calendar size={18} /> },
    { id: "success", name: "Success Stories", icon: <Award size={18} /> },
  ];

  const discussions = [
    {
      id: 1,
      title: "Tips for improving perspective drawing skills?",
      author: {
        name: "Priya Sharma",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        badge: "Top Contributor",
      },
      content:
        "I've been struggling with perspective drawings, especially when it comes to complex architectural forms. Any tips or resources that helped you improve?",
      likes: 42,
      comments: 18,
      time: "2 hours ago",
      tags: ["Drawing", "Perspective", "Skills"],
    },
    {
      id: 2,
      title: "How to prepare for the mathematical section of NATA?",
      author: {
        name: "Rahul Verma",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        badge: "NATA 2023 Topper",
      },
      content:
        "The mathematical section seems challenging. What topics should I focus on? Are there specific books or resources you recommend for this section?",
      likes: 35,
      comments: 24,
      time: "1 day ago",
      tags: ["Mathematics", "Preparation", "Resources"],
    },
    {
      id: 3,
      title: "Portfolio review request - Architectural sketches",
      author: {
        name: "Ananya Patel",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        badge: "Active Member",
      },
      content:
        "I've been working on my architectural sketching skills for NATA. Would appreciate feedback on my portfolio. Link in the comments!",
      likes: 28,
      comments: 32,
      time: "3 days ago",
      tags: ["Portfolio", "Sketching", "Feedback"],
    },
    {
      id: 4,
      title: "NATA 2024 exam pattern changes - Discussion",
      author: {
        name: "Arjun Singh",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        badge: "Mentor",
      },
      content:
        "There are some changes in the NATA 2024 exam pattern. Let's discuss how this affects our preparation strategy and what new areas we need to focus on.",
      likes: 56,
      comments: 41,
      time: "5 days ago",
      tags: ["Exam Pattern", "NATA 2024", "Strategy"],
    },
  ];

  const portfolios = [
    {
      id: 1,
      title: "Urban Landscape Sketches",
      author: {
        name: "Vikram Mehta",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        college: "CEPT University",
      },
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      likes: 124,
      views: 1850,
      tags: ["Urban", "Sketching", "Landscape"],
    },
    {
      id: 2,
      title: "Architectural Form Studies",
      author: {
        name: "Neha Kapoor",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        college: "SPA Delhi",
      },
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      likes: 98,
      views: 1240,
      tags: ["Form", "Studies", "Architectural"],
    },
    {
      id: 3,
      title: "Perspective Drawing Collection",
      author: {
        name: "Raj Malhotra",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        college: "JJ College of Architecture",
      },
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      likes: 156,
      views: 2100,
      tags: ["Perspective", "Drawing", "Collection"],
    },
    {
      id: 4,
      title: "Minimalist Architectural Concepts",
      author: {
        name: "Aisha Khan",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        college: "NIT Calicut",
      },
      image:
        "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      likes: 87,
      views: 1320,
      tags: ["Minimalist", "Concept", "Design"],
    },
  ];

  const events = [
    {
      id: 1,
      title: "NATA 2025 Preparation Workshop",
      date: "June 15, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Online (Zoom)",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      attendees: 245,
      type: "Workshop",
    },
    {
      id: 2,
      title: "Live Drawing Session with Ar. Rajiv Mehta",
      date: "June 20, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Online (YouTube Live)",
      image:
        "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      attendees: 178,
      type: "Live Session",
    },
    {
      id: 3,
      title: "NATA Toppers Panel Discussion",
      date: "June 25, 2025",
      time: "5:00 PM - 7:00 PM",
      location: "Online (Zoom)",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      attendees: 320,
      type: "Panel Discussion",
    },
    {
      id: 4,
      title: "Architecture Portfolio Building Workshop",
      date: "July 5, 2025",
      time: "11:00 AM - 2:00 PM",
      location: "Delhi (SPA Campus)",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      attendees: 120,
      type: "Workshop",
    },
  ];

  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      college: "SPA Delhi",
      score: "185/200",
      rank: 12,
      year: 2023,
      quote:
        "The community support and practice resources on this platform were instrumental in my NATA preparation. The mock tests were incredibly similar to the actual exam.",
      tips: [
        "Practice perspective drawing daily",
        "Focus on time management during the exam",
        "Understand architectural concepts rather than memorizing",
      ],
    },
    {
      id: 2,
      name: "Rahul Verma",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      college: "CEPT University",
      score: "178/200",
      rank: 25,
      year: 2023,
      quote:
        "The drawing tools and 3D visualization features helped me understand complex spatial concepts that were difficult to grasp from textbooks alone.",
      tips: [
        "Strengthen your mathematics fundamentals",
        "Study famous architectural works and their elements",
        "Practice with timed drawing exercises",
      ],
    },
    {
      id: 3,
      name: "Ananya Patel",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      college: "JJ College of Architecture",
      score: "182/200",
      rank: 18,
      year: 2023,
      quote:
        "From struggling with basic sketches to scoring in the top 20, this platform transformed my preparation journey. The community feedback was invaluable.",
      tips: [
        "Develop a consistent study schedule",
        "Get your drawings reviewed by peers",
        "Focus on improving your weakest areas first",
      ],
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "discussions":
        return (
          <div className="space-y-6">
            {discussions.map(discussion => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <img
                      src={discussion.author.image}
                      alt={discussion.author.name}
                      className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-deepNavy">
                            {discussion.author.name}
                          </h3>
                          <span className="text-xs text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                            {discussion.author.badge}
                          </span>
                        </div>
                        <span className="text-sm text-charcoal/60">
                          {discussion.time}
                        </span>
                      </div>

                      <h2 className="text-xl font-serif font-bold text-deepNavy mt-3 group-hover:text-terracotta transition-colors duration-300">
                        {discussion.title}
                      </h2>

                      <p className="text-charcoal/80 mt-2">
                        {discussion.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {discussion.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-cream px-2 py-1 rounded-full text-charcoal/70"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex space-x-4">
                          <button className="flex items-center text-charcoal/70 hover:text-terracotta transition-colors">
                            <Heart size={18} className="mr-1" />
                            <span>{discussion.likes}</span>
                          </button>
                          <button className="flex items-center text-charcoal/70 hover:text-terracotta transition-colors">
                            <MessageCircle size={18} className="mr-1" />
                            <span>{discussion.comments}</span>
                          </button>
                          <button className="flex items-center text-charcoal/70 hover:text-terracotta transition-colors">
                            <Share2 size={18} />
                          </button>
                        </div>

                        <Button variant="outline" size="sm" className="group">
                          <span className="flex items-center">
                            View Discussion
                            <ArrowRight
                              size={16}
                              className="ml-2 group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "portfolios":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolios.map(portfolio => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={portfolio.image}
                    alt={portfolio.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-medium text-white">
                      {portfolio.title}
                    </h3>

                    <div className="flex items-center mt-1">
                      <img
                        src={portfolio.author.image}
                        alt={portfolio.author.name}
                        className="w-6 h-6 rounded-full object-cover mr-2"
                      />
                      <span className="text-sm text-white/90">
                        {portfolio.author.name}
                      </span>
                      <span className="text-xs text-white/70 ml-2">
                        • {portfolio.author.college}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {portfolio.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-cream px-2 py-1 rounded-full text-charcoal/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div className="flex items-center text-charcoal/70">
                        <Heart size={16} className="mr-1 text-terracotta" />
                        <span>{portfolio.likes}</span>
                      </div>
                      <div className="flex items-center text-charcoal/70">
                        <Eye size={16} className="mr-1" />
                        <span>{portfolio.views}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="group">
                      <span className="flex items-center">
                        View
                        <ArrowRight
                          size={16}
                          className="ml-1 group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            {events.map(event => (
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
                      <span className="px-3 py-1 bg-terracotta/80 text-white text-xs rounded-full backdrop-blur-sm">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-serif font-bold text-deepNavy group-hover:text-terracotta transition-colors duration-300">
                      {event.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-charcoal/60">Date</div>
                        <div className="font-medium">{event.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-charcoal/60">Time</div>
                        <div className="font-medium">{event.time}</div>
                      </div>
                      <div>
                        <div className="text-sm text-charcoal/60">Location</div>
                        <div className="font-medium">{event.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-charcoal/60">
                          Attendees
                        </div>
                        <div className="font-medium">
                          {event.attendees} registered
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                          >
                            <img
                              src={`https://images.unsplash.com/photo-${
                                1500000000000 + i * 1000
                              }?auto=format&fit=crop&w=100&q=80`}
                              alt="Attendee"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-terracotta/10 border-2 border-white flex items-center justify-center text-xs text-terracotta font-medium">
                          +{event.attendees - 4}
                        </div>
                      </div>

                      <Button className="group relative overflow-hidden">
                        <span className="relative z-10 flex items-center">
                          Register Now
                          <ArrowRight
                            size={18}
                            className="ml-2 group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "success":
        return (
          <div className="space-y-8">
            {successStories.map(story => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/4 flex flex-col items-center text-center mb-6 md:mb-0">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-terracotta/20"
                      />
                      <h3 className="font-serif font-bold text-xl text-deepNavy mt-3">
                        {story.name}
                      </h3>
                      <div className="text-terracotta font-medium">
                        {story.college}
                      </div>
                      <div className="mt-2 flex flex-col items-center">
                        <div className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                          NATA Score: {story.score}
                        </div>
                        <div className="text-sm text-charcoal/70 mt-1">
                          All India Rank: {story.rank} ({story.year})
                        </div>
                      </div>
                    </div>

                    <div className="md:w-3/4 md:pl-8 md:border-l border-gray-200">
                      <div className="text-2xl text-terracotta/80 font-serif mb-2">
                        "
                      </div>
                      <p className="text-charcoal/80 italic mb-6">
                        {story.quote}
                      </p>

                      <h4 className="font-medium text-deepNavy mb-3">
                        Tips for NATA Aspirants:
                      </h4>
                      <ul className="space-y-2">
                        {story.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mr-3 mt-0.5">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L4.5 8.5L2 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex justify-end">
                        <Button variant="outline" size="sm" className="group">
                          <span className="flex items-center">
                            Read Full Story
                            <ArrowRight
                              size={16}
                              className="ml-2 group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header section */}
      <div className="bg-deepNavy text-white relative overflow-hidden pt-16">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-deepNavy to-deepNavy/90" />

          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
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
              ease: "linear",
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
              ease: "linear",
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Community Hub
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Connect with fellow NATA aspirants, share resources, participate
              in discussions, and learn from success stories
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
                placeholder="Search discussions, portfolios, events..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-mutedGold text-white"
                    : "bg-white text-deepNavy hover:bg-white/80"
                } transition-colors duration-300`}
              >
                <span
                  className={
                    activeTab === tab.id ? "text-white" : "text-mutedGold"
                  }
                >
                  {tab.icon}
                </span>
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-12">{renderContent()}</div>

        {/* Community stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-serif font-bold text-deepNavy mb-8 text-center">
              Our Growing Community
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  value: "15,000+",
                  label: "Active Members",
                  icon: <Users size={24} />,
                },
                {
                  value: "5,000+",
                  label: "Discussions",
                  icon: <MessageSquare size={24} />,
                },
                {
                  value: "1,200+",
                  label: "Success Stories",
                  icon: <Award size={24} />,
                },
                {
                  value: "250+",
                  label: "Monthly Events",
                  icon: <Calendar size={24} />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mutedGold/20 text-mutedGold mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-deepNavy">
                    {stat.value}
                  </div>
                  <div className="text-charcoal/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Join Our Community
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-mutedGold to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mentors section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-deepNavy mb-4">
              Meet Our Mentors
            </h2>
            <p className="text-charcoal/80 max-w-2xl mx-auto">
              Learn from experienced architects and NATA toppers who provide
              guidance, feedback, and support to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Ar. Rajiv Mehta",
                role: "Senior Architect & NATA Expert",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                specialization: "Architectural Drawing",
              },
              {
                name: "Dr. Priya Sharma",
                role: "Professor, SPA Delhi",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                specialization: "Architectural Theory",
              },
              {
                name: "Ar. Vikram Singh",
                role: "NATA Examiner & Educator",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                specialization: "Spatial Reasoning",
              },
              {
                name: "Ar. Aisha Khan",
                role: "Design Consultant & Mentor",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                specialization: "Portfolio Development",
              },
            ].map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl shadow-md overflow-hidden text-center group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent" />
                </div>

                <div className="relative mt-[-40px] z-10 px-6 pb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mx-auto">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-deepNavy mt-3 group-hover:text-terracotta transition-colors duration-300">
                    {mentor.name}
                  </h3>

                  <div className="text-charcoal/70 mb-2">{mentor.role}</div>

                  <div className="inline-block px-3 py-1 bg-mutedGold/10 text-mutedGold text-sm rounded-full">
                    {mentor.specialization}
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group"
                    >
                      <span className="flex items-center justify-center">
                        Connect
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage;
