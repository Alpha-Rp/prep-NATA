import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Menu,
  X,
  BookOpen,
  Users,
  PenTool,
  User,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Practice Hub", path: "/practice", icon: <PenTool size={18} /> },
    { name: "Resources", path: "/resources", icon: <BookOpen size={18} /> },
    { name: "Community", path: "/community", icon: <Users size={18} /> },
  ];

  const handleAuth = (isSignUp = false) => {
    navigate("/auth", { state: { isSignUp } });
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Compass className="h-8 w-8 text-terracotta group-hover:text-deepNavy transition-colors duration-300" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif font-bold text-xl text-deepNavy relative"
            >
              Prep NATA
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-terracotta to-sage"
                style={{ bottom: "-2px" }}
              />
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative text-deepNavy hover:text-terracotta transition-colors duration-200 flex items-center space-x-1"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-1"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.div>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-terracotta to-sage"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative"
              ref={userMenuRef}
            >
              <button
                onClick={toggleUserMenu}
                className="w-10 h-10 rounded-full bg-deepNavy/5 flex items-center justify-center hover:bg-deepNavy/10 transition-colors duration-300 group"
              >
                <User
                  size={20}
                  className="text-deepNavy group-hover:text-terracotta transition-colors duration-300"
                />
              </button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {user ? (
                      <>
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="text-lg font-serif font-bold text-deepNavy">
                            Welcome
                          </h3>
                          <p className="text-sm text-charcoal/70">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-3 space-y-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center p-2 rounded-md hover:bg-deepNavy/5 transition-colors duration-200"
                          >
                            <LogOut
                              size={18}
                              className="mr-3 text-terracotta"
                            />
                            <span className="text-deepNavy">Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="text-lg font-serif font-bold text-deepNavy">
                            Welcome Back
                          </h3>
                          <p className="text-sm text-charcoal/70">
                            Sign in to access your dashboard
                          </p>
                        </div>
                        <div className="p-3 space-y-2">
                          <button
                            onClick={() => handleAuth(false)}
                            className="w-full flex items-center p-2 rounded-md hover:bg-deepNavy/5 transition-colors duration-200"
                          >
                            <LogIn size={18} className="mr-3 text-terracotta" />
                            <span className="text-deepNavy">Sign In</span>
                          </button>
                          <button
                            onClick={() => handleAuth(true)}
                            className="w-full flex items-center p-2 rounded-md hover:bg-deepNavy/5 transition-colors duration-200"
                          >
                            <UserPlus size={18} className="mr-3 text-sage" />
                            <span className="text-deepNavy">
                              Create Account
                            </span>
                          </button>
                        </div>
                        <div className="bg-cream/50 p-3 text-xs text-center text-charcoal/70">
                          Access all features with a free account
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden flex items-center space-x-3"
          >
            <button
              onClick={toggleUserMenu}
              className="w-9 h-9 rounded-full bg-deepNavy/5 flex items-center justify-center hover:bg-deepNavy/10 transition-colors duration-300 mr-1"
            >
              <User size={18} className="text-deepNavy" />
            </button>

            <button
              className="text-deepNavy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence></AnimatePresence>
    </header>
  );
};

export default Navbar;
