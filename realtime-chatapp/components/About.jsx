import "./About.css";
export function About() {
  return (
    <section className="about">
      <div className="about-contentfull">
        <div className="about-header">
          <h1>ABOUT CHATFLOW</h1>
        </div>
        <div className="about-content">
          <p>
            ChatFlow is a modern <strong>real-time </strong>communication
            platform designed to make messaging simple, fast and convenient.
          </p>
          <p className="icon-about"> 💬 👥 🔔 </p>
        </div>
      </div>
    </section>
  );
}
