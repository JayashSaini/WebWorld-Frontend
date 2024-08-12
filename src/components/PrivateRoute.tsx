import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // If there's no token or user, redirect to the login page
  useEffect(() => {
    if (!(token && user)) {
      return navigate("/auth/login");
    }
  }, []);

  // If authenticated, render the child components
  return <>{children}</>;
};

export default PrivateRoute;
