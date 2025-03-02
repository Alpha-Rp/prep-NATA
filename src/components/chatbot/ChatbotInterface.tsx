import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  X,
  Sparkles,
  Compass,
  BookOpen,
  Brain,
  PenTool,
  Zap,
} from "lucide-react";
import ChatMessage from "./ChatMessage";
import SuggestionChip from "./SuggestionChip";
import { generateGeminiResponse } from "../../lib/gemini";

interface ChatbotInterfaceProps {
  onClose: () => void;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm Pragna, your NATA preparation assistant. I can help you with information about the exam, preparation strategies, and answer your architecture-related questions. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    { id: "1", text: "What is NATA exam?", icon: <Compass size={14} /> },
    {
      id: "2",
      text: "How to prepare for drawing test?",
      icon: <PenTool size={14} />,
    },
    { id: "3", text: "NATA syllabus", icon: <BookOpen size={14} /> },
    { id: "4", text: "Tips for aptitude section", icon: <Brain size={14} /> },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    // Simulate API call delay
    setTimeout(() => {
      generateResponse(userMessage.content);
    }, 1000);
  };

  const generateResponse = async (userMessage: string) => {
    try {
      setIsTyping(true);
      console.log("Requesting response for:", userMessage);

      const response = await generateGeminiResponse(userMessage);
      console.log("Received response:", response);

      if (!response) {
        throw new Error("Empty response received");
      }

      const newBotMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error in chat response:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "I apologize, but I'm having trouble processing your request. Please try asking about NATA exam preparation or our website's features.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);

    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-deepNavy via-deepNavy to-deepNavy/90 text-white">
      {/* Header */}
      <div className="relative p-4 flex items-center justify-between">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 border border-terracotta/20 rounded-full opacity-30" />
          <div className="absolute -bottom-10 -left-10 w-20 h-20 border border-sage/20 rounded-full opacity-20" />
        </div>

        <div className="flex items-center relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-sage p-0.5 mr-3">
            <div className="w-full h-full rounded-full overflow-hidden bg-deepNavy p-0.5">
              <img
                src="https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Pragna"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium flex items-center text-lg">
              Pragna
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="ml-2 bg-gradient-to-r from-terracotta to-sage text-white text-xs px-2 py-0.5 rounded-full flex items-center"
              >
                <Sparkles size={10} className="mr-1" />
                NATA Expert
              </motion.span>
            </h3>
            <p className="text-xs text-white/70">Your Architecture Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors relative z-10"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white/5 backdrop-blur-sm scrollbar-hide">
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            onCopy={() => handleCopyMessage(message.id, message.content)}
            isCopied={copiedMessageId === message.id}
          />
        ))}

        {isTyping && (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-terracotta to-sage p-0.5 mr-2">
              <div className="w-full h-full rounded-full overflow-hidden bg-deepNavy p-0.5">
                <img
                  src="https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Pragna"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg rounded-tl-none">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 bg-terracotta rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-terracotta rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-terracotta rounded-full"
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <p className="text-xs text-white/60 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(suggestion => (
              <SuggestionChip
                key={suggestion.id}
                text={suggestion.text}
                icon={suggestion.icon}
                onClick={() => handleSuggestionClick(suggestion.text)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-end bg-white/10 rounded-lg border border-white/20 focus-within:border-terracotta transition-colors">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Pragna about NATA..."
            className="flex-1 bg-transparent border-0 max-h-[120px] min-h-[40px] p-3 focus:ring-0 focus:outline-none resize-none text-white placeholder-white/50"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className={`p-3 rounded-lg ${
              inputValue.trim() === ""
                ? "text-white/30 cursor-not-allowed"
                : "text-terracotta hover:bg-white/10 transition-colors"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-2 text-xs text-center text-white/40">
          <span className="flex items-center justify-center">
            <Zap size={12} className="mr-1 text-terracotta" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
