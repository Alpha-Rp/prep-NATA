import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
import Hero from "./Hero";
import Features from "./Features";
import StudyResources from "./StudyResources";
import PracticeSection from "./PracticeSection";
import Community from "./Community";
import CallToAction from "./CallToAction";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  // Loading screen animation variants
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={loadingVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-50 bg-deepNavy flex flex-col items-center justify-center"
          >
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mb-8"
            >
              <div className="flex items-center space-x-3">
                <Compass className="h-12 w-12 text-terracotta" />
                <span className="font-serif font-bold text-3xl text-white">
                  NATA Prep
                </span>
              </div>
            </motion.div>

            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                variants={progressVariants}
                initial="initial"
                animate="animate"
                className="h-full bg-gradient-to-r from-terracotta to-sage rounded-full"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-white/70 text-sm"
            >
              Loading your architectural journey...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Hero />
            <Features />
            <StudyResources />
            <PracticeSection />
            <Community />
            <CallToAction />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
