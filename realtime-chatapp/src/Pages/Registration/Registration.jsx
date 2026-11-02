import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleRegister(event) {
    event.preventDefault();
    if (name === "") {
      setError("name empty");
    } else if (email === "") {
      setError("email empty");
    } else if (password === "") {
      setError("password empty");
    } else if (confirmpassword === "") {
      setError("confirmpassword empty");
    } else if (password !== confirmpassword) {
      setError("password not matched");
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          },
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Registration failed");
          return;
        }
        alert("Registration successful!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login");

        setError("");
      } catch (error) {
        setError("Unable to connect to server");
        console.log(error);
      }
    }
  }
  return (
    <section className="register-page">
      <div className="register-header">
        <h2>💬 ChatFlow</h2>
        <h3>Create Your Account Join ChatFlow Today</h3>
      </div>
      <div className="register-details">
        <form className="register-form" onSubmit={handleRegister}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm your password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button className="submit-button-form" type="submit">
            Register
          </button>
        </form>
        <div className="all-login-link">
          Already have an account?{" "}
          <Link to={"/login"} className="login-link">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
