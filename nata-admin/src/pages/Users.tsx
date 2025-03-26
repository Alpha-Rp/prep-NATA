import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, UserPlus } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "inactive";
  joinedDate: string;
}

const mockUsers: User[] = [
  {
    id: "U1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    status: "active",
    joinedDate: "2024-03-15",
  },
  {
    id: "U2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "instructor",
    status: "active",
    joinedDate: "2024-03-14",
  },
  {
    id: "U3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2024-03-13",
  },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = mockUsers.filter(
    user =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole === "all" || user.role === selectedRole)
  );

  const roles = ["all", ...new Set(mockUsers.map(u => u.role))];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-deepNavy">Users</h1>
          <p className="mt-2 text-charcoal">Manage your users</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </motion.div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal" />
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="input appearance-none pl-10 pr-8"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredUsers.map(user => (
              <tr key={user.id} className="transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-terracotta/10 text-terracotta">
                      <div className="flex h-full w-full items-center justify-center text-sm font-medium">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-deepNavy">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">{user.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.role === "admin"
                        ? "bg-terracotta/10 text-terracotta"
                        : user.role === "instructor"
                        ? "bg-sage/10 text-sage"
                        : "bg-mutedGold/10 text-mutedGold"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status === "active"
                        ? "bg-sage/10 text-sage"
                        : "bg-charcoal/10 text-charcoal"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-charcoal">{user.joinedDate}</div>
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
