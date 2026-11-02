import "./LoginPage.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handlelogin(event) {
    event.preventDefault();
    setError("");

    // Validate email
    if (email.trim() === "") {
      setError("Email is required");
      return;
    }

    // Validate password
    if (password === "") {
      setError("Password is required");
      return;
    }

    try {
      // Connect to backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Check backend response
      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store login information
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to dashboard
      navigate("/chat-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    }
  }

  return (
    <section className="login-page">
      <div className="page-header">
        <h1>💬 ChatFlow</h1>
        <p>Welcome Back Login to continue chatting</p>
      </div>

      <form className="login-form" onSubmit={handlelogin}>
        <label htmlFor="email">Email:</label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="enter your email"
        />

        <label htmlFor="password">Password:</label>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="enter your password"
        />

        <div className="remember-row">
          <div className="remember-option">
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox">Remember Me</label>
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Login</button>

        <label>Don't have an account?</label>

        <Link to="/register-page">Register</Link>
      </form>

      <div></div>
      <div></div>
    </section>
  );
}
