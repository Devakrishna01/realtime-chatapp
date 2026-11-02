import "./ContactFooter.css";

export function ContactFooter() {
  return (
    <section className="contact-footer">
      <div className="contact-section">
        <h2>Contact</h2>

        <p>Get in touch with the ChatFlow team.</p>

        <div className="contact-details">
          <div className="contact-item">
            <span>📧</span>
            <h3>Email</h3>
            <p>support@chatflow.com</p>
          </div>

          <div className="contact-item">
            <span>📞</span>
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-item">
            <span>🌐</span>
            <h3>Social</h3>
            <p>@ChatFlow</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <h3>💬 ChatFlow</h3>

        <nav className="footer-nav">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        <p>© 2026 ChatFlow</p>
        <p>All rights reserved.</p>
      </footer>
    </section>
  );
}
