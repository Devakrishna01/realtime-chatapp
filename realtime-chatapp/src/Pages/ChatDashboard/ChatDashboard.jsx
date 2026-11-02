import "./ChatDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

export function ChatDashboard() {
  const navigate = useNavigate();
  const [showChats, setShowChats] = useState(false);
  const [selectedcon, setSelectedCon] = useState(null);
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "deva",
      message: "See you tomorrow!",
      messages: [
        {
          text: "Hey, how are you?",
          sender: "them",
        },
        {
          text: "I'm good! How about you?",
          sender: "me",
        },

        {
          text: "That's good to hear!",
          sender: "me",
        },
      ],
    },

    {
      id: 2,
      name: "nathan",
      message: "Good morning!",
      messages: [
        {
          text: "Hey Nathan!",
          sender: "me",
        },
        {
          text: "Hi! How are you?",
          sender: "them",
        },
      ],
    },

    {
      id: 3,
      name: "rishi",
      message: "Let's meet at 5 PM.",
      messages: [
        {
          text: "Are you free today?",
          sender: "them",
        },
        {
          text: "Yes, I am free.",
          sender: "me",
        },
        {
          text: "Let's meet at 5 PM.",
          sender: "them",
        },
      ],
    },
  ]);

  const selectedconversation = conversations.find(
    (conversation) => conversation.id === selectedcon,
  );
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    console.log("Login status:", isLoggedIn);
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);
  function sendMessage() {
    if (message.trim() === "") {
      return;
    }

    setConversations((previousConversations) =>
      previousConversations.map((conversation) =>
        conversation.id === selectedcon
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                { text: message, sender: "me", createdAt: dayjs() },
              ],
              message: message,
            }
          : conversation,
      ),
    );
    setMessage("");
  }
  function handleKeydown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [selectedconversation?.messages]);

  return (
    <section className="dash-content">
      <div className="dash-navbar">
        <h1> 💬 ChatFlow</h1>
        <Link to={"/notifications"} className="notification-button">
          🔔
        </Link>
        <Link to={"/profile"} className="profile-button">
          👤 Profile
        </Link>
      </div>
      <div className="dash-body">
        <div className="dash-left">
          <Link to="/user-search">🔍 Search</Link>

          <button
            className="chats-sidebar"
            onClick={() => setShowChats(!showChats)}
          >
            💬 Chats
          </button>
          {showChats && (
            <div className="conversationslist">
              {conversations.map((conversation) => (
                <div
                  onClick={() => {
                    setSelectedCon(conversation.id);
                  }}
                  key={conversation.id}
                  className={
                    conversation.id === selectedcon
                      ? "conversation-selected"
                      : "conversation"
                  }
                >
                  <p className="conversation-name">👤 {conversation.name}</p>
                  <p className="conversation-preview">{conversation.message}</p>
                </div>
              ))}
            </div>
          )}

          <Link to="/contacts-page">👥 Contacts</Link>
          <Link to="/group-chat">👥 Group Chat</Link>
          <Link to="/settings">⚙ Settings</Link>
          <Link to="/logout">🚪 Logout</Link>
        </div>
        <div className="dash-right">
          <p>💬 Select a conversation</p>
          <p>Start chatting with your friends</p>

          {selectedcon && (
            <div className="selected-convo">
              <p>👤{selectedconversation.name}</p>
              <hr />

              <div className="membermess">
                {selectedconversation.messages.map((val, index) => (
                  <p
                    key={index}
                    className={
                      val.sender === "me" ? "sent-message" : "received-message"
                    }
                  >
                    {val.text}
                    {val.createdAt && (
                      <span>{dayjs(val.createdAt).format("h:mm A")}</span>
                    )}
                  </p>
                ))}
              </div>
              <div ref={messageEndRef}></div>

              <input
                className="getinputfromright"
                placeholder="type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeydown}
              ></input>
              <button className="send-button" onClick={sendMessage}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
