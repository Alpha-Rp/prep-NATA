import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface SuggestionChipProps {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:border-terracotta/50 hover:bg-terracotta/10 transition-colors flex items-center"
    >
      {icon && <span className="mr-1.5 text-terracotta">{icon}</span>}
      {text}
    </motion.button>
  );
};

export default SuggestionChip;
