
/**
  Displays all conversations belonging to the logged-in user.
  Fetches conversation history from backend and highlights the active chat.
  Allows users to switch between conversations with persistence across refresh.
 */
 

import { useEffect, useState } from "react";
import API from "../api/api";

export default function ConversationList({ onSelect }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const res = await API.get("/chat/my-conversations");
      setConversations(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false); //  stop loader
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSelect = (id) => {
    setActiveId(id);
    onSelect(id);
  };

  // Loading state (page refresh
  if (loading) {
    return (
      <div className="text-center text-muted mt-3">
        <div className="spinner-border mb-2" style={{ color: "#005461" }} />
        <p className="small">Loading conversations...</p>
      </div>
    );
  }

  // Empty state
  if (!conversations.length) {
    return (
      <p className="text-muted small text-center mt-3">
        No conversations yet.<br />
        Start a new chat 🚀
      </p>
    );
  }

  return (
    <div className="list-group mb-3">
      {conversations.map((c) => (
        <button
          key={c.conversation_id}
          className="list-group-item list-group-item-action mb-2 text-truncate"
          onClick={() => handleSelect(c.conversation_id)}
          style={{
            borderRadius: "10px",
            backgroundColor:
              activeId === c.conversation_id ? "#005461" : "#fff",
            color: activeId === c.conversation_id ? "#fff" : "#000",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            if (activeId !== c.conversation_id)
              e.currentTarget.style.backgroundColor = "#CF4B00";
          }}
          onMouseLeave={(e) => {
            if (activeId !== c.conversation_id)
              e.currentTarget.style.backgroundColor = "#fff";
          }}
        >
          <strong>
            {c.message ? c.message.substring(0, 30) : "New Conversation"}
          </strong>
          <br />
          <small className="text-muted">
            {c.created_at
              ? new Date(c.created_at).toLocaleDateString()
              : ""}
          </small>
        </button>
      ))}
    </div>
  );
}

