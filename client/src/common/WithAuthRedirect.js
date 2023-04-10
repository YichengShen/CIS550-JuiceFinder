import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../auth/AuthContext";

function WithAuthRedirect({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

WithAuthRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WithAuthRedirect;
