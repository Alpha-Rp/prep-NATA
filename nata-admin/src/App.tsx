import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import TestResults from "./pages/TestResults";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";

function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-cream">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-terracotta border-t-transparent mx-auto mb-4" />
        <p className="text-deepNavy">Loading...</p>
        <p className="text-sm text-gray-500 mt-2">
          If this takes too long, try refreshing the page
        </p>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, session } = useAuth();
  const [localLoading, setLocalLoading] = React.useState(true);
  const initialLoadRef = React.useRef(true);

  // Add a safety timeout to prevent infinite loading
  React.useEffect(() => {
    setLocalLoading(loading);

    // Safety timeout - if loading takes more than 2 seconds, force it to complete
    const timer = setTimeout(() => {
      if (loading) {
        console.log(
          "PrivateRoute: Loading timeout reached, forcing completion"
        );
        setLocalLoading(false);
      }
    }, 2000);

    // Extra safety - if this is the initial load, force completion after 3 seconds
    let initialTimer: NodeJS.Timeout | null = null;
    if (initialLoadRef.current) {
      initialTimer = setTimeout(() => {
        initialLoadRef.current = false;
        setLocalLoading(false);
        console.log("PrivateRoute: Initial load timeout reached");
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      if (initialTimer) clearTimeout(initialTimer);
    };
  }, [loading]);

  // Show loading spinner while authentication is being checked
  if (localLoading) {
    return <LoadingSpinner />;
  }

  // Check both session and user to ensure authentication is complete
  // Also verify the user has admin privileges
  if (!session || !user || !isAdmin) {
    console.log(
      "PrivateRoute: Not authenticated or not admin, redirecting to login"
    );
    return <Navigate to="/login" replace />;
  }

  console.log("PrivateRoute: User is authenticated and is admin");
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, session } = useAuth();
  const [localLoading, setLocalLoading] = React.useState(true);
  const initialLoadRef = React.useRef(true);

  // Add a safety timeout to prevent infinite loading
  React.useEffect(() => {
    setLocalLoading(loading);

    // Safety timeout - if loading takes more than 2 seconds, force it to complete
    const timer = setTimeout(() => {
      if (loading) {
        console.log("PublicRoute: Loading timeout reached, forcing completion");
        setLocalLoading(false);
      }
    }, 2000);

    // Extra safety - if this is the initial load, force completion after 3 seconds
    let initialTimer: NodeJS.Timeout | null = null;
    if (initialLoadRef.current) {
      initialTimer = setTimeout(() => {
        initialLoadRef.current = false;
        setLocalLoading(false);
        console.log("PublicRoute: Initial load timeout reached");
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      if (initialTimer) clearTimeout(initialTimer);
    };
  }, [loading]);

  // Show loading spinner while authentication is being checked
  if (localLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to dashboard if user is authenticated and is admin
  if (session && user && isAdmin) {
    console.log(
      "PublicRoute: User is authenticated and is admin, redirecting to dashboard"
    );
    return <Navigate to="/dashboard" replace />;
  }

  console.log("PublicRoute: User is not authenticated or not admin");
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="questions" element={<Questions />} />
            <Route path="test-results" element={<TestResults />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
