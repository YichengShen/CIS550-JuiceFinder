import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Settings() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (logoutError) {
      setError(`Failed to log out. ${logoutError.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      {error && <div>{error}</div>}
      <div>
        <h3>Email:</h3>
        <p>{currentUser.email}</p>
      </div>
      <div>
        <h3>Creation Time:</h3>
        <p>{new Date(currentUser.metadata.creationTime).toLocaleString()}</p>
      </div>
      <div>
        <h3>User ID:</h3>
        <p>{currentUser.uid}</p>
      </div>
      <button type="button" disabled={loading} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Settings;
