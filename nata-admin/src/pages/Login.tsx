import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Compass } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

interface AuthError {
  type: "not-found" | "not-verified" | "invalid-credentials" | "other";
  title: string;
  message: string;
}

const ADMIN_EMAIL = "prajwal.r.p196@gmail.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const createAdminTable = async () => {
    const { error } = await supabase.rpc("create_admin_users_table");
    if (error) {
      console.error("Error creating admin_users table:", error);
      return false;
    }
    return true;
  };

  const createAdminUser = async (email: string) => {
    try {
      // First try to create the table if it doesn't exist
      await createAdminTable();

      // Then insert the admin user
      const { error: insertError } = await supabase
        .from("admin_users")
        .insert([
          {
            email: email,
            role: "admin",
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating admin user:", insertError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in createAdminUser:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First sign in with Supabase
      await signIn(email, password);

      // Only proceed with admin check for the specific email
      if (email !== ADMIN_EMAIL) {
        throw new Error("not_admin");
      }

      // After successful sign in, check or create admin user
      const { error: checkError } = await supabase
        .from("admin_users")
        .select()
        .eq("email", email)
        .single();

      if (checkError) {
        // If table doesn't exist or user not found, create them
        const success = await createAdminUser(email);
        if (!success) {
          throw new Error("admin_creation_failed");
        }
      }

      toast.success("Welcome back, Admin!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        if (error.message === "not_admin") {
          setError({
            type: "invalid-credentials",
            title: "Access Denied",
            message: "This email is not registered as an admin user.",
          });
        } else if (error.message === "admin_creation_failed") {
          setError({
            type: "other",
            title: "Setup Error",
            message: "Failed to set up admin access. Please contact support.",
          });
        } else if (error.message === "Invalid login credentials") {
          setError({
            type: "invalid-credentials",
            title: "Invalid Credentials",
            message: "The email or password you entered is incorrect.",
          });
        } else if (error.message.includes("Email not confirmed")) {
          setError({
            type: "not-verified",
            title: "Email Not Verified",
            message: "Please verify your email address before logging in.",
          });
        } else {
          setError({
            type: "other",
            title: "Authentication Error",
            message: "An error occurred during login. Please try again.",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deepNavy/5 via-cream/10 to-terracotta/5" />

        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#1F2937 0.5px, transparent 0.5px), linear-gradient(90deg, #1F2937 0.5px, transparent 0.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-20 right-20 w-40 h-40 border border-terracotta/20 rounded-full opacity-30"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            x: [0, 20, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-20 left-20 w-60 h-60 border border-sage/20 rounded-full opacity-20"
        />
      </div>

      <div className="w-full max-w-md relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="bg-terracotta/10 p-3 rounded-full">
              <Compass className="h-8 w-8 text-terracotta" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-deepNavy mb-2">
            NATA Admin Login
          </h1>
          <p className="text-center text-text-secondary mb-8">
            Sign in to access the admin dashboard
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200"
            >
              <h3 className="text-sm font-semibold text-red-800">
                {error.title}
              </h3>
              <p className="text-sm text-red-600">{error.message}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-deepNavy"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Enter your email"
                />
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-deepNavy"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta text-white py-3 px-4 rounded-lg hover:bg-terracotta/90 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
