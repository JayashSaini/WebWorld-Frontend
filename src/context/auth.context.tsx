import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordRequest,
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordRequest,
  verifyOTPRequest,
} from "../api";
import { Loader } from "../components";
import { UserInterface } from "../interfaces/user.ts";
import { LocalStorage, requestHandler } from "../util";
import { toast } from "sonner";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext<{
  user: UserInterface | null;
  email: string | null;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyOTP: (data: { email: string; otp: string }) => Promise<void>;
  resetPassword: (data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
}>({
  user: null,
  email: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  verifyOTP: async () => {},
  resetPassword: async () => {},
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const navigate = useNavigate();

  // Function to handle user login
  const login = async (data: { email: string; password: string }) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        setUser(data);
        setToken(data.accessToken);
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        navigate("/learn");
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  // Function to handle user registration
  const register = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    await requestHandler(
      async () => await registerUser(data),
      setIsLoading,
      () => {
        toast.success("Account created successfully! Go ahead and login.");
        navigate("/auth/login"); // Redirect to the login page after successful registration
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  // Function to handle user logout
  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      () => {
        setUser(null);
        setToken(null);
        LocalStorage.clear(); // Clear local storage on logout
        navigate("/auth/login"); // Redirect to the login page after successful logout
      },
      (message: string) => {
        toast.error(message);
      } // Display error alerts on request failure
    );
  };

  // Function to handle Forgot Password
  const forgotPassword = async (email: string) => {
    await requestHandler(
      async () => await forgotPasswordRequest(email),
      setIsLoading,
      () => {
        toast.success("OTP sent to your email!");
        setEmail(email);
        navigate("/auth/verify-otp"); // Redirect to the OTP verification page after sending OTP
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  const verifyOTP = async (data: { email: string; otp: string }) => {
    await requestHandler(
      async () => await verifyOTPRequest(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        setEmail(null);
        toast.success("OTP verified successfully!");
        navigate(`/auth/reset-password/${data.token}`);
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  const resetPassword = async (data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    await requestHandler(
      async () => await resetPasswordRequest(data),
      setIsLoading,
      () => {
        toast.success("Password reset successfully!");
        navigate("/auth/login");
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    setIsLoading(true);
    const _user: UserInterface | null = LocalStorage.get(
      "user"
    ) as UserInterface | null;
    const _token: string | null = LocalStorage.get("token") as string | null;
    if (_token && _user?._id) {
      setUser(_user);
      setToken(_token);
    }
    setIsLoading(false);
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        token,
        email,
        forgotPassword,
        verifyOTP,
        resetPassword,
      }}
    >
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
