import { Link } from "react-router-dom";
import "./GroupChat.css";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
export function GroupChatPage() {
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [group, setGroup] = useState({
    id: 1,
    name: "CSE Friends",
    members: [
      { id: 1, name: "Deva", role: "admin", status: "online" },
      { id: 2, name: "Arun", role: "member", status: "online" },
      { id: 3, name: "Priya", role: "member", status: "online" },
      { id: 4, name: "Rahul", role: "member", status: "offline" },
      { id: 5, name: "Karthik", role: "member", status: "online" },
    ],
    messages: [
      {
        id: 1,
        senderId: 2,
        senderName: "Arun",
        text: "Hey everyone!",
        createdAt: "2026-10-01 10:20",
      },
      {
        id: 2,
        senderId: 1,
        senderName: "Deva",
        text: "Hi everyone! 👋",
        createdAt: "2026-10-01 10:21",
      },
      {
        id: 3,
        senderId: 3,
        senderName: "Priya",
        text: "What are you doing tomorrow?",
        createdAt: "2026-10-01 10:22",
      },
      {
        id: 4,
        senderId: 1,
        senderName: "Deva",
        text: "Let's meet at 10 AM.",
        createdAt: "2026-10-01 10:23",
      },
      {
        id: 5,
        senderId: 5,
        senderName: "Karthik",
        text: "Sounds good 👍",
        createdAt: "2026-10-01 10:24",
      },
    ],
  });
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [group.messages]);
  function handlemessage() {
    if (message.trim() === "") {
      return;
    }
    const newMessage = {
      id: Date.now(),
      senderId: 1,
      senderName: "deva",
      text: message,
      createdAt: dayjs(),
    };
    setGroup((previousgroups) => ({
      ...previousgroups,
      messages: [...previousgroups.messages, newMessage],
    }));
    setMessage("");
  }
  return (
    <section className="group-chat">
      <div className="group-header">
        <Link to={"/chat-dashboard"}>← Back button</Link>
        <p>👥 Group icon</p>
        <p>{group.name}</p>
        <p>{group.members.length}</p>
        <Link to={"/group-details"}>⋮ </Link>
      </div>
      <div className="message-body">
        {group.messages.map((message) => (
          <div
            key={message.id}
            className={message.senderId === 1 ? "my-message" : "group-message"}
          >
            <p className="sender-name">{message.senderName}</p>

            <p className="message-text">{message.text}</p>

            <p className="message-time">
              {dayjs(message.createdAt).format("h:mm A")}
            </p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <div ref={messageEndRef}></div>
        <button onClick={() => fileInputRef.current?.click()}>📎</button>
        <input
          type="file"
          ref={fileInputRef}
          className="filechoose"
          onChange={(event) => {
            setSelectedFile(event.target.files[0]);
          }}
        />
        {selectedFile && <span>{selectedFile.name}</span>}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handlemessage();
            }
          }}
        />
        <button onClick={handlemessage}>Send</button>
      </div>
    </section>
  );
}
