import "./NavBar.css";
import { useNavigate } from "react-router-dom";
export function NavBar() {
  const navigate = useNavigate();
  return (
    <section className="homepage-header">
      <div className="header-content">
        <div className="left-content">
          <h1>💬 ChatFlow </h1>
        </div>
        <div className="right-content">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="lastcontent">
          <button onClick={() => navigate("/login")} className="login-button">
            Login
          </button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </section>
  );
}
