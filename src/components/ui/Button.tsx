import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  to?: string;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  to,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-terracotta text-white hover:bg-terracotta/90 focus-visible:ring-terracotta',
    secondary: 'bg-sage text-deepNavy hover:bg-sage/90 focus-visible:ring-sage',
    outline: 'border border-deepNavy text-deepNavy hover:bg-deepNavy/10 focus-visible:ring-deepNavy',
    ghost: 'text-deepNavy hover:bg-deepNavy/10 focus-visible:ring-deepNavy',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-6 text-lg',
  };

  const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className);
  
  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;