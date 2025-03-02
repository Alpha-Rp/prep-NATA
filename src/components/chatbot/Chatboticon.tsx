import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChatbotInterface from "./ChatbotInterface";

const ChatbotIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("pragnaIntroShown");
    if (!hasVisited) {
      // Show welcome message after a delay
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);

    // Mark as visited
    if (isFirstVisit) {
      localStorage.setItem("pragnaIntroShown", "true");
      setIsFirstVisit(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[600px] max-h-[calc(100vh-120px)] rounded-2xl shadow-2xl overflow-hidden"
          >
            <ChatbotInterface onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification bubble */}
      <AnimatePresence>
        {hasNewMessage && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-24 right-6 z-50 bg-white p-4 rounded-xl shadow-lg max-w-[250px]"
          >
            <div className="absolute left-1/2 bottom-[-8px] transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            <p className="text-sm font-medium text-deepNavy">
              Hi there! I'm Pragna, your NATA assistant. Need help with your
              preparation?
            </p>
            <button
              onClick={() => setHasNewMessage(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChatbot}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg flex items-center justify-center group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-deepNavy via-terracotta to-sage"
          animate={{
            backgroundPosition: isHovered ? "100% 0%" : "0% 0%",
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            backgroundPosition: { duration: 2.5 },
            rotate: { duration: 0.5 },
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* SVG Icon */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L15.5 8.5L22 9.5L17 14.5L18.5 21L12 18L5.5 21L7 14.5L2 9.5L8.5 8.5L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path
                d="M7 7L5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 7L19 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 21V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.div>

        {/* Notification dot */}
        {hasNewMessage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 w-4 h-4 bg-sage rounded-full"
          />
        )}

        {/* Pulsing effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: hasNewMessage
              ? [
                  "0 0 0 0 rgba(139, 167, 147, 0)",
                  "0 0 0 10px rgba(139, 167, 147, 0.3)",
                  "0 0 0 20px rgba(139, 167, 147, 0)",
                ]
              : "none",
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        />
      </motion.button>
    </>
  );
};

export default ChatbotIcon;
