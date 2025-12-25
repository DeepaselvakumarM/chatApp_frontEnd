/**
 
 Main chat container that manages conversation state and message flow.
  Handles message sending, loading indicators, and chat persistence on refresh.
  Integrates ConversationList, MessageList, and MessageInput components.
 */




import { useEffect, useState } from "react";
import API from "../api/api";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import ConversationList from "../components/ConversationList";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isNewChat, setIsNewChat] = useState(false);
  const [botTyping, setBotTyping] = useState(false);


  // Restore active conversation
  useEffect(() => {
    const savedConvId = localStorage.getItem("conversationId");
    if (savedConvId) {
      setConversationId(savedConvId);
      setIsNewChat(false);
    }
  }, []);

  // Load messages
  useEffect(() => {
    if (conversationId) {
      API.get(`/chat/${conversationId}`)
        .then((res) => setMessages(res.data))
        .catch(() => setMessages([]));
    } else {
      setMessages([]);
    }
  }, [conversationId]);

  // const sendMessage = async (text) => {
  //   const res = await API.post("/chat/send", {
  //     message: text,
  //     conversationId: conversationId || null
  //   });

  //   setConversationId(res.data.conversationId);
  //   localStorage.setItem("conversationId", res.data.conversationId);
  //   setIsNewChat(false);

  //   setMessages((prev) => [
  //     ...prev,
  //     { sender: "user", message: text },
  //     { sender: "bot", message: res.data.reply }
  //   ]);
  // };


  const sendMessage = async (text) => {
  try {
    // show user message instantly
    setMessages((prev) => [
      ...prev,
      { sender: "user", message: text },
      { sender: "bot", message: "Typing...", typing: true }
    ]);

    setBotTyping(true);

    const res = await API.post("/chat/send", {
      message: text,
      conversationId: conversationId || null
    });

    setConversationId(res.data.conversationId);
    localStorage.setItem("conversationId", res.data.conversationId);

    // replace Typing with actual reply
    setMessages((prev) =>
      prev
        .filter((m) => !m.typing)
        .concat({ sender: "bot", message: res.data.reply })
    );

    setBotTyping(false);
  } catch (err) {
    setBotTyping(false);
    alert("Server error");
  }
};

  


  return (
    <div className="container-fluid px-3 px-md-4 mt-3">
      <div className="row chat-wrapper shadow-sm rounded">
    <p
  className="d-flex justify-content-center align-items-center text-center mb-1 text-white"
  style={{
    backgroundColor: "#df7e46ff",
    padding: "10px 12px",
    borderRadius: "8px"
  }}
>
  I am a demo bot. I can respond to keywords like help,stack,login,date,time or new chat.
</p>
       
        <div className="col-md-3 chat-sidebar p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0 text-white">Conversations</h6>
            <button
              className="btn btn-sm btn-light"
              onClick={() => {
                setConversationId(null);
                setMessages([]);
                setIsNewChat(true);
                localStorage.removeItem("conversationId");
              }}
            >
              + New
            </button>
            
          </div>

          <ConversationList
            onSelect={(id) => {
              setConversationId(id);
              localStorage.setItem("conversationId", id);
              setIsNewChat(false);
            }}
          />
        </div>

        
        <div className="col-md-9 chat-main d-flex flex-column p-0">
          <div className="chat-header px-3 py-2">
            <strong>
              {conversationId ? "Active Conversation" : "Start a New Chat"}
            </strong>
          </div>

          <div className="chat-messages flex-grow-1 px-3 py-3">
            <MessageList messages={messages} />
          </div>

          <div className="chat-input px-3 py-2 border-top">
            <MessageInput
              onSend={sendMessage}
              disabled={!isNewChat && !conversationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


