import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
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

  return (
    <footer className="bg-deepNavy text-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-deepNavy via-deepNavy to-deepNavy/95" />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sage/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-6 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Compass className="h-8 w-8 text-terracotta group-hover:text-sage transition-colors duration-300" />
              </motion.div>
              <span className="font-serif font-bold text-xl">Prep NATA</span>
            </div>
            <p className="text-cream/80 mb-6">
              Comprehensive preparation platform for the National Aptitude Test
              in Architecture. Empowering future architects with interactive
              tools and resources.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Facebook size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="text-cream/70 hover:text-terracotta transition-colors p-2 bg-white/5 rounded-full"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-0 left-0 h-0.5 bg-terracotta/50"
                style={{ bottom: "-4px" }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Practice Hub", path: "/practice" },
                { name: "Resources", path: "/resources" },
                { name: "Community", path: "/community" },
                { name: "Profile", path: "/profile" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-terracotta transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:underline">{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-semibold mb-6 relative inline-block">
              Resources
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-0 left-0 h-0.5 bg-sage/50"
                style={{ bottom: "-4px" }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Study Materials", path: "/resources/study-materials" },
                { name: "Video Lessons", path: "/resources/video-lessons" },
                { name: "Practice Sets", path: "/resources/practice-sets" },
                { name: "Exam Patterns", path: "/resources/exam-patterns" },
                { name: "FAQs", path: "/faq" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-sage transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:underline">{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-0 left-0 h-0.5 bg-mutedGold/50"
                style={{ bottom: "-4px" }}
              />
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: (
                    <MapPin
                      size={20}
                      className="text-terracotta flex-shrink-0 mt-1"
                    />
                  ),
                  content:
                    "123 Architecture Avenue, Design District, New Delhi, 110001",
                  href: "#",
                },
                {
                  icon: (
                    <Mail size={20} className="text-terracotta flex-shrink-0" />
                  ),
                  content: "contact@nataprep.com",
                  href: "mailto:contact@nataprep.com",
                },
                {
                  icon: (
                    <Phone
                      size={20}
                      className="text-terracotta flex-shrink-0"
                    />
                  ),
                  content: "+91 123 456 7890",
                  href: "tel:+911234567890",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start space-x-3 group"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <a
                    href={item.href}
                    className="text-cream/70 hover:text-terracotta transition-colors group-hover:underline"
                  >
                    {item.content}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-cream/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-cream/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NATA Prep. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {[
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms of Service", path: "/terms-of-service" },
              { name: "Sitemap", path: "/sitemap" },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-cream/60 hover:text-terracotta transition-colors duration-200 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
