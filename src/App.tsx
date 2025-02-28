import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PracticeHub from "./pages/PracticeHub";
import ResourcesPage from "./pages/ResourcesPage";
import CommunityPage from "./pages/CommunityPage";
import DrawingToolsPage from "./pages/DrawingToolsPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import TestInstructionsPage from "./pages/TestInstructionsPage";
import TestInterfacePage from "./pages/TestInterfacePage";
import TestResultsPage from "./pages/TestResultsPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Initialize smooth scrolling with optimized settings
    const lenis = new Lenis({
      duration: 0.8, // Reduced for better performance
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route
                    path="/practice"
                    element={
                      <ProtectedRoute>
                        <PracticeHub />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/resources"
                    element={
                      <ProtectedRoute>
                        <ResourcesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <CommunityPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/drawing-tools"
                    element={
                      <ProtectedRoute>
                        <DrawingToolsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/events"
                    element={
                      <ProtectedRoute>
                        <EventsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about" element={<AboutPage />} />
                  <Route
                    path="/test-instructions"
                    element={
                      <ProtectedRoute>
                        <TestInstructionsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/test-interface"
                    element={
                      <ProtectedRoute>
                        <TestInterfacePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/test-results"
                    element={
                      <ProtectedRoute>
                        <TestResultsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
