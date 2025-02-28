import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import StudyResources from '../components/home/StudyResources';
import PracticeSection from '../components/home/PracticeSection';
import Community from '../components/home/Community';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  useEffect(() => {
    // Initialize smooth scrolling with optimized settings
    const lenis = new Lenis({
      duration: 0.8, // Reduced for better performance
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
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
    <div>
      <Hero />
      <Features />
      <StudyResources />
      <PracticeSection />
      <Community />
      <CallToAction />
    </div>
  );
};

export default HomePage;