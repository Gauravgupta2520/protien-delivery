import React, { useState } from "react";
import "./SignIn.css";

const BACKEND_URL = "http://localhost:8080/api/users";

function SignIn() {
  const [mode, setMode] = useState("Login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const endpoint =
      mode === "Sign Up" ? `${BACKEND_URL}/signup` : `${BACKEND_URL}/login`;

    const payload =
      mode === "Sign Up"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.text();
      setMessage(result);

      if (result.includes("successful")) {
        setFormData({ name: "", email: "", password: "" });

        if (mode === "Login") {
          setTimeout(() => (window.location.href = "/"), 2000);
        }
      }
    } catch (err) {
      setMessage("Unable to connect to server!");
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">{mode}</h1>

        {message && (
          <p className={message.includes("success") ? "msg success" : "msg error"}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <button className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : mode}
          </button>
        </form>

        <p className="switch-text">
          {mode === "Login" ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setMode("Sign Up")}>Create one</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("Login")}>Login here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default SignIn;
