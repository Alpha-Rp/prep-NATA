import React, { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  gradientColor?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Card = ({
  title,
  description,
  icon,
  className,
  hoverEffect = true,
  gradientColor = "from-terracotta/10 to-sage/10",
  onClick,
  children,
}: CardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "relative bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-cream overflow-hidden group",
        hoverEffect && "hover:shadow-xl transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradientColor
        )}
      />

      {/* Card content */}
      <div className="relative z-10">
        {icon && (
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-terracotta p-3 bg-terracotta/10 inline-flex rounded-lg group-hover:bg-terracotta/20 transition-colors duration-300"
          >
            {icon}
          </motion.div>
        )}
        <h3 className="text-xl font-serif font-semibold text-deepNavy mb-2 group-hover:text-terracotta transition-colors duration-300">
          {title}
        </h3>
        <p className="text-charcoal/80 group-hover:text-charcoal transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-cream/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-2 right-2 w-1 h-1 bg-terracotta rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Additional content */}
      {children}
    </motion.div>
  );
};

export default Card;
