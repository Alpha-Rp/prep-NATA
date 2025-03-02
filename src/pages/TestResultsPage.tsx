import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart,
  PieChart,
  Clock,
  Award,
  Target,
  ArrowRight,
  Download,
  Share2,
  Home,
  CheckCircle,
  X,
  AlertTriangle,
  TrendingUp,
  Compass,
} from "lucide-react";
import Button from "../components/ui/Button";

interface TestResultsState {
  testType: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  selectedAnswers: Record<number, string>;
}

const TestResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // Get test results from location state
  const [testResults, setTestResults] = useState({
    testType: "mcq",
    score: 0,
    totalQuestions: 20,
    timeSpent: 0,
    percentage: 0,
    selectedAnswers: {},
  });

  useEffect(() => {
    // Check if we have valid state data
    if (
      location.state &&
      typeof location.state === "object" &&
      "testType" in location.state
    ) {
      const state = location.state as TestResultsState;
      const { testType, score, totalQuestions, timeSpent, selectedAnswers } =
        state;

      // Calculate percentage correctly
      const calculatedPercentage =
        totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

      setTestResults({
        testType: testType || "mcq",
        score: score || 0,
        totalQuestions: totalQuestions || 20,
        timeSpent: timeSpent || 0,
        percentage: calculatedPercentage,
        selectedAnswers: selectedAnswers || {},
      });
    } else {
      // If no state is passed, redirect to instructions page
      navigate("/test-instructions");
    }
  }, [location.state, navigate]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}m ${secs}s`;
  };

  // Determine result status
  const getResultStatus = () => {
    if (testResults.percentage >= 80)
      return { label: "Excellent", color: "text-sage" };
    if (testResults.percentage >= 60)
      return { label: "Good", color: "text-terracotta" };
    if (testResults.percentage >= 40)
      return { label: "Average", color: "text-mutedGold" };
    return { label: "Needs Improvement", color: "text-red-500" };
  };

  const resultStatus = getResultStatus();

  // Mock data for strengths and improvements
  const strengths = [
    "Architectural History",
    "Building Materials",
    "Design Principles",
  ];

  const improvements = [
    "Construction Technology",
    "Spatial Reasoning",
    "Technical Drawing",
  ];

  // Mock data for question analysis
  const questionAnalysis = {
    correct: testResults.score,
    unattempted:
      testResults.totalQuestions -
      Object.keys(testResults.selectedAnswers || {}).length,
    incorrect:
      Object.keys(testResults.selectedAnswers || {}).length - testResults.score,
    timePerQuestion: formatTime(
      Math.floor(testResults.timeSpent / testResults.totalQuestions)
    ),
  };

  // Handle retry test
  const handleRetryTest = () => {
    navigate("/test-instructions");
  };

  // Handle go home
  const handleGoHome = () => {
    navigate("/");
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
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-terracotta/20 text-terracotta text-sm font-medium mb-4"
            >
              <CheckCircle size={18} className="mr-2" />
              <span>Test Completed</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Your Test Results
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {testResults.testType === "mcq"
                ? "Comprehensive analysis of your multiple choice test performance"
                : "Your sketching test has been submitted successfully"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Score overview card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-serif font-bold text-deepNavy mb-2">
                    {testResults.testType === "mcq"
                      ? "Multiple Choice Test Results"
                      : "Sketching Test Results"}
                  </h2>
                  <p className="text-charcoal/70">
                    Completed on {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" className="group">
                    <span className="flex items-center">
                      <Download size={18} className="mr-2" />
                      Download
                    </span>
                  </Button>
                  <Button variant="outline" className="group">
                    <span className="flex items-center">
                      <Share2 size={18} className="mr-2" />
                      Share
                    </span>
                  </Button>
                </div>
              </div>

              {testResults.testType === "mcq" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                        />

                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={
                            testResults.percentage >= 80
                              ? "#8BA793"
                              : testResults.percentage >= 60
                              ? "#C66B3D"
                              : testResults.percentage >= 40
                              ? "#C4A484"
                              : "#EF4444"
                          }
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={
                            283 - (283 * testResults.percentage) / 100
                          }
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-deepNavy">
                          {Math.round(testResults.percentage)}%
                        </span>
                        <span
                          className={`text-sm font-medium ${resultStatus.color}`}
                        >
                          {resultStatus.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-lg font-medium text-deepNavy">
                        {testResults.score} / {testResults.totalQuestions}{" "}
                        correct
                      </div>
                      <div className="text-sm text-charcoal/70">
                        Time spent: {formatTime(testResults.timeSpent)}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-cream rounded-lg p-4">
                        <h3 className="font-medium text-deepNavy mb-3 flex items-center">
                          <Award size={18} className="text-terracotta mr-2" />
                          Strengths
                        </h3>
                        <ul className="space-y-2">
                          {strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mr-3 mt-0.5">
                                <CheckCircle size={12} />
                              </div>
                              <span className="text-charcoal/80">
                                {strength}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-cream rounded-lg p-4">
                        <h3 className="font-medium text-deepNavy mb-3 flex items-center">
                          <TrendingUp size={18} className="text-sage mr-2" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                          {improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-5 h-5 rounded-full bg-sage/20 text-sage flex items-center justify-center mr-3 mt-0.5">
                                <ArrowRight size={12} />
                              </div>
                              <span className="text-charcoal/80">
                                {improvement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 bg-cream rounded-lg p-4">
                      <h3 className="font-medium text-deepNavy mb-3 flex items-center">
                        <BarChart size={18} className="text-mutedGold mr-2" />
                        Question Analysis
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-sage">
                            {questionAnalysis.correct}
                          </div>
                          <div className="text-sm text-charcoal/70">
                            Correct
                          </div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-terracotta">
                            {questionAnalysis.incorrect}
                          </div>
                          <div className="text-sm text-charcoal/70">
                            Incorrect
                          </div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-mutedGold">
                            {questionAnalysis.unattempted}
                          </div>
                          <div className="text-sm text-charcoal/70">
                            Unattempted
                          </div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-deepNavy">
                            {questionAnalysis.timePerQuestion}
                          </div>
                          <div className="text-sm text-charcoal/70">
                            Avg. Time/Q
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {testResults.testType === "sketching" && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/20 text-sage mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-deepNavy">
                      Submission Successful
                    </h3>
                    <p className="text-charcoal/70 mt-2">
                      Your sketching test has been submitted successfully. Our
                      team will review your drawings and provide feedback within
                      48 hours.
                    </p>
                  </div>

                  <div className="bg-cream rounded-lg p-6 max-w-md mx-auto">
                    <h4 className="font-medium text-deepNavy mb-3">
                      Submission Details
                    </h4>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Test Type:</span>
                        <span className="font-medium text-deepNavy">
                          Sketching Test
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">
                          Submission Date:
                        </span>
                        <span className="font-medium text-deepNavy">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Time Spent:</span>
                        <span className="font-medium text-deepNavy">
                          {formatTime(testResults.timeSpent)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">
                          Tasks Completed:
                        </span>
                        <span className="font-medium text-deepNavy">
                          {testResults.totalQuestions}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={handleGoHome}
                >
                  <span className="flex items-center">
                    <Home size={18} className="mr-2" />
                    Back to Home
                  </span>
                </Button>
                <Button
                  size="lg"
                  className="group relative overflow-hidden"
                  onClick={handleRetryTest}
                >
                  <span className="relative z-10 flex items-center">
                    Try Another Test
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Recommendations section */}
          {testResults.testType === "mcq" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
            >
              <div className="p-8">
                <h2 className="text-2xl font-serif font-bold text-deepNavy mb-6 flex items-center">
                  <Compass size={24} className="mr-2 text-terracotta" />
                  Recommended Resources
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Construction Technology Masterclass",
                      type: "Video Course",
                      duration: "4h 30m",
                      image:
                        "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                      link: "https://www.udemy.com/course/introduction-to-bim/",
                    },
                    {
                      title: "Spatial Reasoning Practice Workbook",
                      type: "PDF Resource",
                      pages: "85 pages",
                      image:
                        "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                      link: "https://www.practiceaptitudetests.com/spatial-reasoning-test.pdf",
                    },
                    {
                      title: "Technical Drawing Workshop",
                      type: "Live Session",
                      date: "June 15, 2025",
                      image:
                        "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
                      link: "https://www.youtube.com/watch?v=iaKuc7UdqBI&t=2s",
                    },
                  ].map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      className="bg-cream rounded-lg overflow-hidden group"
                    >
                      <div className="relative h-40">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="text-xs text-white/80">
                            {resource.type}
                          </div>
                          <h3 className="text-lg font-medium text-white">
                            {resource.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 flex justify-between items-center">
                        <div className="text-sm text-charcoal/70">
                          {resource.duration || resource.pages || resource.date}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group"
                          onClick={() => window.open(resource.link, "_blank")}
                        >
                          <span className="flex items-center">
                            View
                            <ArrowRight
                              size={14}
                              className="ml-1 group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;
