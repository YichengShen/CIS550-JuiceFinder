import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/settings"); // redirect to settings page upon signup
    } catch (signupError) {
      setError(`Failed to create your account. ${signupError.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
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
        <div>
          <label htmlFor="passwordConfirm">
            Confirm Password:
            <input
              type="password"
              id="passwordConfirm"
              ref={passwordConfirmRef}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
