import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/settings"); // redirect to settings page upon login
    } catch (loginError) {
      setError(`Failed to log in. ${loginError.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email:
            <input type="email" id="email" ref={emailRef} required />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input type="password" id="password" ref={passwordRef} required />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
