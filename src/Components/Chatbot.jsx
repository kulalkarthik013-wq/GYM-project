import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const replyText =
        data.reply || "⚠️ No response from AI";

      const botMsg = { sender: "bot", text: replyText };

      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error(err);

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "❌ Server error. Try again." }
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* CHAT BOX */}
      {open && (
        <div className="chat-container">

          <div className="chat-header">
            🤖 AI Trainer
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === "user" ? "msg user" : "msg bot"}
              >
                {msg.text}
              </div>
            ))}

            {/* 🔥 TYPING INDICATOR */}
            {loading && <div className="msg bot">Typing...</div>}

            <div ref={chatEndRef}></div>
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your trainer..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>

        </div>
      )}
    </>
  );
};

export default Chatbot;