import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Compass,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/questions", icon: BookOpen, label: "Questions" },
  { to: "/test-results", icon: ClipboardList, label: "Test Results" },
  { to: "/users", icon: Users, label: "Users" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="flex h-screen w-64 flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2"
        >
          <div className="bg-terracotta/10 p-2 rounded-lg">
            <Compass className="h-6 w-6 text-terracotta" />
          </div>
          <h1 className="text-xl font-bold text-deepNavy">NATA Admin</h1>
        </motion.div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.button
        onClick={async () => {
          await signOut();
          navigate("/login", { replace: true });
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center space-x-3 border-t border-gray-200 p-4 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-50"
      >
        <LogOut className="h-5 w-5" />
        <span>Sign Out</span>
      </motion.button>
    </aside>
  );
}
