import React from "react";
import { Redirect } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Redirect to="/" />;
  }
  return children;
};

export default ProtectedRoute;