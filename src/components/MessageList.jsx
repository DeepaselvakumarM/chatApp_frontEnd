/**
 
 Renders chat messages for the selected conversation.
 Displays messages as styled chat bubbles for user and bot.
  Automatically updates when new messages are added or loaded from backend.
 */


export default function MessageList({ messages }) {
  return (
    <div
      className="p-3 mb-3"
      style={{
        height: "400px",
        overflowY: "auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px"
      }}
    >
      {/* iterate over the conversation and display the messages */}
      {messages.map((m, i) => (
        <div
          key={i}
          className={`d-flex mb-2 ${
            m.sender === "user" ? "justify-content-end" : "justify-content-start"
          }`}
        >
          <div
            style={{
              maxWidth: "70%",
              padding: "10px 14px",
              borderRadius: "20px",
              backgroundColor:
                m.sender === "user" ? "#CF4B00" : "#005461",
              color: "#fff",
              opacity: m.typing ? 0.7 : 1
            }}
          >
            {m.message}
          </div>
        </div>
      ))}
    </div>
  );
}
