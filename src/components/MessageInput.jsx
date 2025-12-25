/**
  Handles user message input and submit action.
  Disables input when bot is typing or page is loading to prevent duplicate sends.
 Sends messages to backend via callback provided by parent component.
 */


import { useState } from "react";
export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div
      className="d-flex mt-2"
      style={{ gap: "8px", padding: "0 5px" }}
    >
    {/* to get input from users */}
      <input
        className="form-control"
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          disabled ? "Click New Chat or select a conversation" : "Type a message..."
        }
        style={{
          borderRadius: "20px",
          padding: "10px 15px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        className="btn"
        disabled={disabled || !text.trim()}
        onClick={handleSend}
        style={{
          backgroundColor: "#CF4B00",
          color: "#fff",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => !disabled && (e.target.style.backgroundColor = "#ff5a1f")}
        onMouseLeave={(e) => !disabled && (e.target.style.backgroundColor = "#CF4B00")}
      >
        ➤
      </button>
    </div>
  );
}
