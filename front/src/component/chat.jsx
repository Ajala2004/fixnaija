import React, { useState } from "react";
import "./chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Hello! How can I help you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputMessage },
    ]);

    // Clear the input field
    setInputMessage("");

    // Simulate admin reply (you can replace this with a backend response)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "admin", text: "Thank you for your message! I'll respond shortly." },
      ]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat with Admin</h3>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === "admin" ? "admin-message" : "user-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chat-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;