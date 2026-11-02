import "./FeaturesSection.css";
export function FeaturesSection() {
  return (
    <section className="feature-section">
      <div className="feature-cards">
        <h1>💬</h1>
        <p>Real-Time Messaging</p>
        <p>Send messaages instantly.</p>
      </div>
      <div className="feature-cards">
        <h1> 👥</h1>
        <p>Group Conversations</p>
        <p>Create groups and chat.</p>
      </div>
      <div className="feature-cards">
        <h1> 🔔 </h1>
        <p>Notifications</p>
        <p>Never miss messages.</p>
      </div>
    </section>
  );
}
