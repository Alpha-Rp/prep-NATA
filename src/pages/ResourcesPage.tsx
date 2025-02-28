import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  Search,
  Filter,
  ArrowRight,
  Star,
  Clock,
  Eye,
} from "lucide-react";
import Button from "../components/ui/Button";

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Resources", icon: <BookOpen /> },
    { id: "videos", name: "Video Tutorials", icon: <Video /> },
    { id: "pdfs", name: "PDF Resources", icon: <FileText /> },
    { id: "practice", name: "Practice Papers", icon: <FileText /> },
  ];

  const resources = [
    {
      id: 1,
      title: "Fundamentals of Architectural Drawing",
      category: "videos",
      type: "Video Series",
      rating: 4.8,
      views: 12500,
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/watch?v=wg7yT3mmCNk",
    },
    {
      id: 2,
      title: "NATA 2024 Complete Study Guide",
      category: "pdfs",
      type: "PDF",
      rating: 4.9,
      downloads: 8750,
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://caad.ac.in/nata-study-materials-2024/",
    },
    {
      id: 3,
      title: "Mathematical Concepts for Architecture",
      category: "videos",
      type: "Video Series",
      rating: 4.6,
      views: 9800,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/watch?v=DeyzUysMLy0",
    },
    {
      id: 4,
      title: "NATA Previous Year Papers (2020-2023)",
      category: "practice",
      type: "PDF Bundle",
      rating: 4.7,
      downloads: 15200,
      image:
        "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://admission.aglasem.com/nata-previous-year-question-paper/",
    },
    {
      id: 5,
      title: "Perspective Drawing Masterclass",
      category: "videos",
      type: "Video Course",
      rating: 4.9,
      views: 7600,
      image:
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/watch?v=fp8JDG9i1rE",
    },
    {
      id: 6,
      title: "Architectural Awareness Handbook",
      category: "pdfs",
      type: "PDF",
      rating: 4.5,
      downloads: 6300,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://denverarchitecture.org/wp-content/uploads/2018/01/Arch_Awareness.pdf",
    },
    {
      id: 7,
      title: "NATA Mock Test Series (Set of 10)",
      category: "practice",
      type: "Practice Tests",
      rating: 4.8,
      downloads: 5900,
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://www.embibe.com/exams/nata-mock-test/",
    },
    {
      id: 8,
      title: "Color Theory for Architectural Drawings",
      category: "videos",
      type: "Video Tutorial",
      rating: 4.7,
      views: 4800,
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://www.youtube.com/watch?v=w-hua5kWzU0",
    },
    {
      id: 9,
      title: "Spatial Visualization Practice Workbook",
      category: "pdfs",
      type: "PDF Workbook",
      rating: 4.6,
      downloads: 4200,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://www.colorado.edu/program/ide/sites/default/files/attached-files/sv_workshop2.pdf",
    },
  ];

  const filteredResources = resources.filter(
    resource =>
      (activeCategory === "all" || resource.category === activeCategory) &&
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredResource = {
    title: "Complete NATA 2025 Preparation Bundle",
    description:
      "Everything you need to ace the NATA exam in one comprehensive package. Includes video courses, study materials, practice tests, and more.",
    features: [
      "50+ hours of video tutorials",
      "25 PDF study guides",
      "15 full-length mock tests",
      "Personalized progress tracking",
      "Expert feedback on drawing submissions",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    price: "₹499",
    originalPrice: "₹4,999",
  };

  return (
    <div className="min-h-screen pt-16 bg-cream">
      {/* Header section */}
      <div className="bg-deepNavy text-white relative overflow-hidden">
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
              Study Resources
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Access a vast library of study materials, video lessons, and
              practice papers to boost your NATA preparation
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
                placeholder="Search for resources..."
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
        {/* Categories */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg ${
                  activeCategory === category.id
                    ? "bg-sage text-white"
                    : "bg-white text-deepNavy hover:bg-white/80"
                } transition-colors duration-300`}
              >
                <span
                  className={
                    activeCategory === category.id ? "text-white" : "text-sage"
                  }
                >
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured resource */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage/10 text-sage text-sm font-medium mb-6">
                <Star size={16} className="mr-2" />
                <span>Featured Resource</span>
              </div>

              <h2 className="text-3xl font-serif font-bold text-deepNavy mb-4">
                {featuredResource.title}
              </h2>

              <p className="text-charcoal/80 mb-6">
                {featuredResource.description}
              </p>

              <div className="space-y-4 mb-8">
                {featuredResource.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sage/20 text-sage flex items-center justify-center mr-3">
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
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-deepNavy">
                  {featuredResource.price}
                </span>
                <span className="ml-2 text-lg text-charcoal/60 line-through">
                  {featuredResource.originalPrice}
                </span>
                <span className="ml-3 px-2 py-1 bg-sage/10 text-sage text-sm rounded">
                  90% OFF
                </span>
              </div>

              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={() =>
                  window.open(
                    "https://www.toprankers.com/nata-mock-test-series",
                    "_blank"
                  )
                }
              >
                <span className="relative z-10 flex items-center">
                  Get Bundle
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-sage to-forestGreen opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={featuredResource.image}
                alt={featuredResource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/60 to-deepNavy/30" />

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-sage">Limited Time</div>
                <div className="text-deepNavy text-sm">
                  Offer ends in 3 days
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white ${
                      resource.category === "videos"
                        ? "bg-terracotta/80"
                        : resource.category === "pdfs"
                        ? "bg-sage/80"
                        : "bg-mutedGold/80"
                    } backdrop-blur-sm`}
                  >
                    {resource.type}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-medium text-white mb-1 line-clamp-2">
                    {resource.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star
                        size={14}
                        className="text-mutedGold fill-mutedGold"
                      />
                      <span className="ml-1 text-white text-sm">
                        {resource.rating}
                      </span>
                    </div>

                    {resource.category === "videos" && (
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock size={14} className="mr-1" />
                        {resource.views.toLocaleString()} views
                      </div>
                    )}

                    {(resource.category === "pdfs" ||
                      resource.category === "practice") && (
                      <div className="flex items-center text-white/80 text-sm">
                        <FileText size={14} className="mr-1" />
                        {resource.downloads.toLocaleString()} downloads
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  {resource.category === "videos" && (
                    <div className="flex items-center text-charcoal/70 text-sm">
                      <Eye size={16} className="mr-1" />
                      {resource.views.toLocaleString()} views
                    </div>
                  )}

                  {(resource.category === "pdfs" ||
                    resource.category === "practice") && (
                    <div className="flex items-center text-charcoal/70 text-sm">
                      <Download size={16} className="mr-1" />
                      {resource.downloads.toLocaleString()} downloads
                    </div>
                  )}

                  <span className="text-sm font-medium text-sage">
                    {resource.category === "videos"
                      ? "Video"
                      : resource.category === "pdfs"
                      ? "PDF"
                      : "Practice"}
                  </span>
                </div>

                <Button
                  className="w-full group relative overflow-hidden"
                  onClick={() =>
                    resource.url && window.open(resource.url, "_blank")
                  }
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {resource.category === "videos" ? "Watch Now" : "Download"}
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <span
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      resource.category === "videos"
                        ? "bg-gradient-to-r from-terracotta to-burntOrange"
                        : resource.category === "pdfs"
                        ? "bg-gradient-to-r from-sage to-forestGreen"
                        : "bg-gradient-to-r from-mutedGold to-burntOrange"
                    }`}
                  />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif font-bold text-deepNavy mb-2">
              No resources found
            </h3>
            <p className="text-charcoal/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              variant="outline"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-deepNavy text-white rounded-xl shadow-lg overflow-hidden relative"
        >
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
              className="absolute top-0 right-0 w-40 h-40 border border-terracotta/20 rounded-full opacity-30"
            />
          </div>

          <div className="relative z-10 p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Get Weekly NATA Updates
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter to receive the latest study resources,
              exam updates, and preparation tips directly in your inbox.
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
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
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

export default ResourcesPage;
