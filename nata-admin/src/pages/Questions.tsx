import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";

interface Question {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  status: "active" | "draft" | "archived";
  lastModified: string;
}

const mockQuestions: Question[] = [
  {
    id: "Q1",
    title: "Basic Navigation Rules",
    category: "Navigation",
    difficulty: "Easy",
    status: "active",
    lastModified: "2024-03-15",
  },
  {
    id: "Q2",
    title: "Weather Patterns",
    category: "Meteorology",
    difficulty: "Medium",
    status: "active",
    lastModified: "2024-03-14",
  },
  {
    id: "Q3",
    title: "Aircraft Systems",
    category: "Technical",
    difficulty: "Hard",
    status: "draft",
    lastModified: "2024-03-13",
  },
];

export default function Questions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredQuestions = mockQuestions.filter(
    question =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || question.category === selectedCategory)
  );

  const categories = ["all", ...new Set(mockQuestions.map(q => q.category))];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-deepNavy">Questions</h1>
          <p className="mt-2 text-charcoal">Manage your test questions</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Question</span>
        </button>
      </motion.div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="input appearance-none pl-10 pr-8"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-x-auto rounded-lg border border-gray-200 bg-white"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Last Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredQuestions.map(question => (
              <tr
                key={question.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-deepNavy">
                      {question.title}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">
                    {question.category}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">
                    {question.difficulty}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      question.status === "active"
                        ? "bg-sage/10 text-sage"
                        : question.status === "draft"
                        ? "bg-mutedGold/10 text-mutedGold"
                        : "bg-charcoal/10 text-charcoal"
                    }`}
                  >
                    {question.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">
                    {question.lastModified}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button className="text-charcoal hover:text-deepNavy">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
