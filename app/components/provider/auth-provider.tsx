import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useTransition,
} from "react";
import axios from "axios";
import type { RegisterFormType } from "@/models/register_form";
import type { LoginFormType } from "@/models/login_form";
import Cookies from "js-cookie";

interface AuthContextType {
  user: ResponseUserType | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormType, onSuccess: () => void) => void;
  logout: () => void;
  register: (data: RegisterFormType, onSuccess: () => void) => void;
  isAuthenticated: boolean;
  clearError: () => void;
}
 interface ResponseUserType {
  userId: string;
  email: string;
  username: string;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ResponseUserType | null>(null);
  const [isLoading, startLoding] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    startLoding(async () => {
      clearError();
      try {
        // Check for token in cookies
        const cookie_token = Cookies.get("token");
        const cookie_user = JSON.parse(
          Cookies.get("user") ?? "{}"
        ) as ResponseUserType;
        if (cookie_token && cookie_user) {
          // Validate token with your API
          const response = await axios.post("/api/auth/validate", {
            token: cookie_token,
            ...cookie_user,
          });
          // Save token to cookies
          Cookies.set("user", JSON.stringify(response.data.user), {
            expires: 30,
          });
          setUser(response.data.user);
        }
      } catch (err: any) {
        Cookies.remove("token");
        Cookies.remove("user");
        setError(err?.response?.data?.message || err.message);
      }
    });
  }, []);

  // Login function
  const login = (data: LoginFormType, onSuccess: () => void) => {
    startLoding(async () => {
      try {
        clearError();
        const response = await axios.post("/api/auth/login", data);

        // Save token to cookies
        Cookies.set("token", response.data.token, { expires: 30 });
        Cookies.set("user", JSON.stringify(response.data.user), {
          expires: 30,
        });

        // Set user data
        setUser(response.data?.user);
        onSuccess();
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || "Failed to login, please try again.";
        setError(errorMessage);
      }
    });
  };

  // Logout function
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
  };

  // Register function
  const register = (
    { terms_accepted, confirm_password, ...submitData }: RegisterFormType,
    onSuccess: () => void
  ) => {
    startLoding(async () => {
      setError(null);
      try {
        const response = await axios.post("/api/auth/register", submitData);
        // Save token to cookies
        Cookies.set("token", response.data.token, { expires: 30 });
        Cookies.set("user", JSON.stringify(response.data.user), {
          expires: 30,
        });
        setUser(response.data.user);
        onSuccess();
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      }
    });
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      logout,
      register,
      isAuthenticated: !!user,
      clearError,
    }),
    [user, login, logout, register, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
