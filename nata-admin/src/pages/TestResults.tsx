import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface TestResult {
  id: string;
  studentName: string;
  testName: string;
  score: number;
  maxScore: number;
  timeTaken: string;
  date: string;
  status: "passed" | "failed";
}

const mockResults: TestResult[] = [
  {
    id: "TR1",
    studentName: "John Doe",
    testName: "NATA Practice Test 1",
    score: 85,
    maxScore: 100,
    timeTaken: "45 min",
    date: "2024-03-15",
    status: "passed",
  },
  {
    id: "TR2",
    studentName: "Jane Smith",
    testName: "NATA Mock Test",
    score: 92,
    maxScore: 100,
    timeTaken: "38 min",
    date: "2024-03-14",
    status: "passed",
  },
  {
    id: "TR3",
    studentName: "Mike Johnson",
    testName: "Drawing Skills Test",
    score: 65,
    maxScore: 100,
    timeTaken: "52 min",
    date: "2024-03-13",
    status: "failed",
  },
];

export default function TestResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredResults = mockResults.filter(
    result =>
      (result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.testName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedStatus === "all" || result.status === selectedStatus)
  );

  const statuses = ["all", ...new Set(mockResults.map(r => r.status))];

  const getScoreIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) {
      return <TrendingUp className="h-5 w-5 text-sage" />;
    } else if (percentage >= 60) {
      return <Minus className="h-5 w-5 text-mutedGold" />;
    } else {
      return <TrendingDown className="h-5 w-5 text-terracotta" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-deepNavy">Test Results</h1>
          <p className="mt-2 text-charcoal">View and analyze test results</p>
        </div>
        <button className="btn-outline flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Results</span>
        </button>
      </motion.div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal" />
          <input
            type="text"
            placeholder="Search by student or test name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal" />
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="input appearance-none pl-10 pr-8"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Test
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Time Taken
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredResults.map(result => (
              <tr
                key={result.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-deepNavy">
                    {result.studentName}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">{result.testName}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getScoreIcon(result.score, result.maxScore)}
                    <span className="text-sm text-charcoal">
                      {result.score}/{result.maxScore}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">
                    {result.timeTaken}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">{result.date}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      result.status === "passed"
                        ? "bg-sage/10 text-sage"
                        : "bg-terracotta/10 text-terracotta"
                    }`}
                  >
                    {result.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
