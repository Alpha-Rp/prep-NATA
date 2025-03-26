import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, ClipboardList, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    change: "+12%",
    color: "bg-terracotta/10 text-terracotta",
  },
  {
    title: "Questions",
    value: "567",
    icon: BookOpen,
    change: "+5%",
    color: "bg-sage/10 text-sage",
  },
  {
    title: "Tests Taken",
    value: "890",
    icon: ClipboardList,
    change: "+8%",
    color: "bg-mutedGold/10 text-mutedGold",
  },
  {
    title: "Pass Rate",
    value: "78%",
    icon: TrendingUp,
    change: "+3%",
    color: "bg-burntOrange/10 text-burntOrange",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-deepNavy">Dashboard</h1>
        <p className="mt-2 text-charcoal">
          Welcome to your NATA admin dashboard
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-charcoal">
                  {stat.title}
                </p>
                <p className="mt-1 text-2xl font-semibold text-deepNavy">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium text-sage">
                {stat.change}
              </span>
              <span className="text-sm text-charcoal">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-deepNavy">
            Recent Activity
          </h2>
          <div className="mt-4">
            <p className="text-charcoal">Coming soon...</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-deepNavy">Quick Actions</h2>
          <div className="mt-4">
            <p className="text-charcoal">Coming soon...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
