import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const benefits = [
    "Access to 500+ practice resources",
    "Interactive drawing tools",
    "3D architectural model viewer",
    "Performance tracking dashboard",
    "Community support & events",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const handleStartFreeTrial = () => {
    window.open("https://www.nata.in/", "_blank");
  };

  const handleExploreFeatures = () => {
    navigate("/resources");
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-deepNavy text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-deepNavy via-deepNavy to-deepNavy/90" />

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deepNavy via-terracotta/10 to-deepNavy opacity-30 animate-gradient-shift" />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="absolute w-1 h-1 bg-terracotta rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 10 + 10
              }s infinite alternate ease-in-out`,
            }}
          />
        ))}

        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 border border-terracotta/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-sage/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-mutedGold/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1 rounded-full bg-terracotta/20 text-terracotta text-sm font-medium mb-6"
          >
            <Sparkles size={16} className="mr-2" />
            <span>Start Your Journey</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6"
          >
            Ready to Begin Your{" "}
            <span className="text-terracotta relative">
              Architectural
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-terracotta/50"
                style={{ bottom: "-4px" }}
              />
            </span>{" "}
            Journey?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of successful NATA aspirants who have transformed
            their preparation with our comprehensive platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transition: { duration: 0.2 },
                }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm group"
              >
                <CheckCircle
                  size={16}
                  className="text-terracotta mr-2 group-hover:scale-110 transition-transform duration-300"
                />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden"
              onClick={handleStartFreeTrial}
            >
              <span className="relative z-10 flex items-center">
                Click Here
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-terracotta to-burntOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Animated glow effect */}
              <motion.span
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(198, 107, 61, 0)",
                    "0 0 0 10px rgba(198, 107, 61, 0.1)",
                    "0 0 0 20px rgba(198, 107, 61, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="absolute inset-0 rounded-md"
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden"
              onClick={handleExploreFeatures}
            >
              <span className="relative z-10">Explore Features</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {/* Floating decorative elements */}
          <div className="absolute top-10 right-10 w-20 h-20 opacity-20">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-full h-full border-2 border-dashed border-terracotta rounded-full"
            />
          </div>
          <div className="absolute bottom-10 left-10 w-16 h-16 opacity-20">
            <motion.div
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-full h-full border-2 border-dashed border-sage rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
