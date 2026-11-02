import "./NotificationsPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "friend",
      title: "Arun Kumar",
      message: "Sent you a friend request",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "Priya",
      message: "Sent you a message",
      time: "15 minutes ago",
      read: true,
    },
    {
      id: 3,
      type: "group",
      title: "ChatFlow Group",
      message: "Added you to a group",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      type: "message",
      title: "Rahul",
      message: "Sent you a message",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "friend",
      title: "Karthik",
      message: "Accepted your friend request",
      time: "Yesterday",
      read: true,
    },
  ]);
  function handleindividualread(key) {
    if (key.read !== false) {
      return;
    }
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === key.id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  }
  function handleall() {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }
  return (
    <section className="notification-page">
      <div className="header">
        <Link to={"/chat-dashboard"} className="backlink">
          {" "}
          ← Back
        </Link>
        <p>🔔 Notifications</p>
        <button className="all-read" onClick={handleall}>
          All Read
        </button>
      </div>
      <div className="notifi-body">
        <h2>Notifications</h2>
        {notifications.map((notification) => (
          <div key={notification.id} className="notifi-card">
            <div className="title">{notification.title}</div>
            <div className="message">{notification.message}</div>
            <div className="timeofmessage">{notification.time}</div>
            <button
              className="readmessage"
              onClick={() => handleindividualread(notification)}
            >
              {notification.read !== true ? "🔵" : "✓"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
