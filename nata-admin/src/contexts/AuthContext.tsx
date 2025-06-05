import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: Error | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "prajwal.r.p196@gmail.com";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Use a ref to track if component is mounted
  const isMounted = useRef(true);

  // Force loading to complete after a timeout
  const forceLoadingComplete = () => {
    if (isMounted.current) {
      console.log("Force loading complete after timeout");
      setLoading(false);
    }
  };

  // Set up cleanup when component unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      console.log("Starting auth initialization...");
      setLoading(true); // Ensure loading is true at the start

      // Set a hard timeout to force loading to complete after 3 seconds
      const timeoutId = setTimeout(forceLoadingComplete, 3000);

      try {
        // Get the current session
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        console.log("Got session:", currentSession ? "Yes" : "No");

        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          if (currentSession.user?.email) {
            await checkAdminStatus(currentSession.user.email);
          } else {
            setIsAdmin(false);
            if (isMounted.current) setLoading(false);
          }
        } else {
          // No session found
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          if (isMounted.current) setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Reset state on error
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        if (isMounted.current) setLoading(false);
      }

      // Clear the timeout if auth completes normally
      clearTimeout(timeoutId);
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.email);
      console.log("Setting new session and user");

      // Set loading to true during auth state change
      if (isMounted.current) setLoading(true);

      // Set a hard timeout to force loading to complete after 3 seconds
      const timeoutId = setTimeout(forceLoadingComplete, 3000);

      try {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log("Checking admin status for", session.user.email);
          await checkAdminStatus(session.user.email);
        } else {
          setIsAdmin(false);
          if (isMounted.current) setLoading(false);
        }
        console.log("Auth state change complete");
      } catch (error) {
        console.error("Error during auth state change:", error);
        setIsAdmin(false);
        if (isMounted.current) setLoading(false);
      }

      // Clear the timeout if auth completes normally
      clearTimeout(timeoutId);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (email: string | undefined) => {
    console.log("Checking admin status for email:", email);

    // Set a hard timeout to force loading to complete after 3 seconds
    const timeoutId = setTimeout(forceLoadingComplete, 3000);

    if (!email || email !== ADMIN_EMAIL) {
      console.log("Not admin email, setting isAdmin to false");
      setIsAdmin(false);
      if (isMounted.current) setLoading(false);
      clearTimeout(timeoutId);
      return;
    }

    try {
      // Simplified admin check - just check if it's the admin email
      if (email === ADMIN_EMAIL) {
        console.log("Admin email confirmed, setting isAdmin to true");
        setIsAdmin(true);

        // Try to create/verify admin user in the background
        try {
          const { data, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("email", email)
            .single();

          if (error && error.code === "PGRST116") {
            // Admin user not found, create it
            await supabase.rpc("create_admin_users_table").catch(() => {});
            await supabase
              .from("admin_users")
              .insert([{ email: email, role: "admin" }])
              .catch(err => console.error("Failed to create admin user:", err));
          }
        } catch (e) {
          console.error("Background admin check failed:", e);
          // Don't change admin status or loading state on background check failure
        }
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Exception in checkAdminStatus:", error);
      setIsAdmin(false);
    } finally {
      console.log("Admin status check complete, setting loading to false");
      if (isMounted.current) setLoading(false);
      clearTimeout(timeoutId);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    console.log("AuthContext: signIn called with email:", email);
    try {
      console.log("AuthContext: Calling Supabase auth.signInWithPassword");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(
        "AuthContext: Supabase response:",
        error ? "Error" : "Success"
      );

      if (error) {
        console.log("AuthContext: Returning error:", error);
        return { data: null, error };
      }

      console.log("AuthContext: Returning success data");
      return { data, error: null };
    } catch (error) {
      console.log("AuthContext: Caught exception:", error);
      return { data: null, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAdmin(false);
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    signIn,
    signOut,
    loading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
