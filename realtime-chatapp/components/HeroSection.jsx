import "./HeroSection.css";
import image from "./images/homepage.png";
import { useNavigate } from "react-router-dom";
export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="left-hero">
        <h1>Connect. Chat.</h1>
        <h1>Stay Connected.</h1>
        <p>Simple real-time messaging for everyone</p>
        <p>
          Chat with friends, create groups and stay connected anytime, anywhere.
        </p>
        <div className="hero-buttons">
          <button>Get Started</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
      <div className="right-hero">
        <h2>💬 ChatFlow</h2>
        <div className="mess">👤 Hey! How are you?</div>
        <div className="mess">I'm doing great! 😊 </div>
        <div className="mess"> 👤 See you soon!</div>
      </div>
      <div>
        <img className="hero-image" src={image}></img>
      </div>
    </section>
  );
}
