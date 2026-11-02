import "./ChatConversation.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

export function ChatConversation() {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([
    {
      text: "hello ",
      person: "receiver",
      createdAt: dayjs("2026-09-29 10:20"),
    },
    {
      text: "iam fine",
      person: "sender",
      createdAt: dayjs("2026-09-29 10:20"),
    },
    {
      text: "have a good day",
      person: "receiver",
      createdAt: dayjs("2026-09-29 10:20"),
    },
    {
      text: "you too bro",
      person: "sender",
      createdAt: dayjs("2026-09-29 10:20"),
    },
  ]);
  function sendMessage() {
    if (message.trim() === "") {
      return;
    }

    const newmessage = {
      text: message,
      person: "sender",
      createdAt: dayjs(),
    };

    setConversations((previousconversations) => [
      ...previousconversations,
      newmessage,
    ]);
    setMessage("");
  }
  function handleKeydown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [conversations]);

  return (
    <section className="chat-conversation">
      <div className="conversational-header">
        <Link className="back-button" to={"/chat-dashboard"}>
          ← Back
        </Link>
        <p className="receiver-name">Receiver Name</p>
        <button> 🟢 Online</button>
      </div>
      <div className="conversational-messages">
        <div className="conversations">
          {conversations.map((conversation, index) => (
            <div
              className={
                conversation.person === "sender"
                  ? "sender-side"
                  : "receiver-side"
              }
              key={index}
            >
              <p className="message-bubble">
                {conversation.text}
                <span>{dayjs(conversations.createdAt).format("d:mm A")}</span>
              </p>
            </div>
          ))}
          <div className="referencepoint" ref={messageEndRef}></div>
        </div>
      </div>
      <div className="conversational-input">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="filebutton"
        >
          📎
        </button>
        <input type="file" ref={fileInputRef} className="file-input" />
        <input
          className="input-message"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeydown}
        />
        <button onClick={sendMessage} className="send-button-chat-convo">
          Send
        </button>
      </div>
    </section>
  );
}
