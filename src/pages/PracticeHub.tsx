import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Calculator,
  Brain,
  Compass,
  Clock,
  Trophy,
  Users,
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  Award,
  BarChart2,
} from "lucide-react";
import Button from "../components/ui/Button";

const PracticeHub = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStartPractice = (testId: number) => {
    switch (testId) {
      case 1:
        window.open(
          "https://helloartsy.com/perspective-drawing-exercises/",
          "_blank"
        );
        break;
      case 2:
        window.open(
          "https://architecturecourses.org/design/architectural-shapes-and-forms-how-they-define-our-spaces",
          "_blank"
        );
        break;
      case 3:
        window.open(
          "https://www.center.edu/MANUSCRIPT/06-GeometryPart1.pdf",
          "_blank"
        );
        break;
      case 4:
        window.open(
          "https://www.iscalepro.com/post/spatial-visualisation-reasoning-questions/",
          "_blank"
        );
        break;
      case 5:
        window.open("https://www.toprankers.com/nata-exam-analysis", "_blank");
        break;
      case 6:
        window.open("https://architectureaptitude.com/nata", "_blank");
        break;
    }
  };

  const handleExploreProgram = () => {
    window.open("https://www.iarch.co.in/nata-jee-b-arch/", "_blank");
  };

  const categories = [
    { id: "all", name: "All Categories", icon: <Compass /> },
    { id: "drawing", name: "Drawing & Sketching", icon: <PenTool /> },
    { id: "math", name: "Mathematics", icon: <Calculator /> },
    { id: "aptitude", name: "General Aptitude", icon: <Brain /> },
    { id: "previous", name: "Previous Papers", icon: <BookOpen /> },
  ];

  const practiceTests = [
    {
      id: 1,
      title: "Perspective Drawing Basics",
      category: "drawing",
      difficulty: "Beginner",
      duration: "45 mins",
      questions: 15,
      completionRate: 78,
      image:
        "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Architectural Forms & Shapes",
      category: "drawing",
      difficulty: "Intermediate",
      duration: "60 mins",
      questions: 20,
      completionRate: 65,
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Mathematical Reasoning",
      category: "math",
      difficulty: "Advanced",
      duration: "30 mins",
      questions: 25,
      completionRate: 42,
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Spatial Visualization",
      category: "aptitude",
      difficulty: "Intermediate",
      duration: "40 mins",
      questions: 18,
      completionRate: 55,
      image:
        "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "NATA 2025 Paper Analysis",
      category: "previous",
      difficulty: "Advanced",
      duration: "180 mins",
      questions: 125,
      completionRate: 32,
      image:
        "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Architectural Awareness",
      category: "aptitude",
      difficulty: "Intermediate",
      duration: "50 mins",
      questions: 30,
      completionRate: 61,
      image:
        "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredTests = practiceTests.filter(
    test =>
      (activeCategory === "all" || test.category === activeCategory) &&
      test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          {/* Animated lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"
                style={{
                  top: `${20 + i * 20}%`,
                  left: 0,
                  right: 0,
                  animation: `moveLeftRight ${8 + i * 2}s infinite linear ${
                    i * 0.5
                  }s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Practice Hub
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Enhance your skills with our comprehensive practice tests and
              interactive exercises
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: <PenTool size={24} />,
                  value: "500+",
                  label: "Practice Tests",
                },
                {
                  icon: <Users size={24} />,
                  value: "10K+",
                  label: "Active Students",
                },
                {
                  icon: <Trophy size={24} />,
                  value: "92%",
                  label: "Success Rate",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta/20 text-terracotta mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-white/50" />
              </div>
              <input
                type="text"
                placeholder="Search for practice tests..."
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
                    ? "bg-terracotta text-white"
                    : "bg-white text-deepNavy hover:bg-white/80"
                } transition-colors duration-300`}
              >
                <span
                  className={
                    activeCategory === category.id
                      ? "text-white"
                      : "text-terracotta"
                  }
                >
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Practice tests grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={test.image}
                  alt={test.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                      {test.difficulty}
                    </span>
                    <span className="flex items-center text-white text-sm">
                      <Clock size={14} className="mr-1" />
                      {test.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-deepNavy mb-2 group-hover:text-terracotta transition-colors duration-300">
                  {test.title}
                </h3>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-charcoal/70">
                    {test.questions} questions
                  </span>
                  <span className="text-sm font-medium text-terracotta">
                    {categories.find(c => c.id === test.category)?.name}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion Rate</span>
                    <span className="font-medium">{test.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-terracotta h-2 rounded-full"
                      style={{ width: `${test.completionRate}%` }}
                    />
                  </div>
                </div>

                <Button
                  className="w-full group relative overflow-hidden"
                  onClick={() => handleStartPractice(test.id)}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Practice
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredTests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif font-bold text-deepNavy mb-2">
              No practice tests found
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

        {/* Featured section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-6">
                <Trophy size={16} className="mr-2" />
                <span>Featured Program</span>
              </div>

              <h2 className="text-3xl font-serif font-bold text-deepNavy mb-4">
                NATA 2025 Complete Preparation Course
              </h2>

              <p className="text-charcoal/80 mb-6">
                A comprehensive program designed by top architects and NATA
                experts to help you ace the exam with confidence.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Structured learning path with 200+ lessons",
                  "Weekly live doubt clearing sessions",
                  "Personalized feedback on drawing submissions",
                  "Full-length mock tests with detailed analysis",
                  "One-on-one mentoring sessions",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mr-3">
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

              <Button
                size="lg"
                className="group relative overflow-hidden"
                onClick={handleExploreProgram}
              >
                <span className="relative z-10 flex items-center">
                  Explore Program
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="NATA Preparation Course"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/60 to-deepNavy/30" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-xs text-center">
                  <div className="text-3xl font-bold text-terracotta mb-2">
                    92%
                  </div>
                  <div className="text-deepNavy font-medium">
                    of our students cleared NATA in first attempt
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PracticeHub;
