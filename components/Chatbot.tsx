"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "⚠️ No response from server." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Error connecting to server." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[400px] w-full max-w-sm rounded-2xl shadow-lg bg-gradient-to-b from-purple-800 to-purple-300 text-white overflow-hidden"
    >
      <div className="px-4 py-2 bg-slate-950 text-white text-sm font-medium border-b border-slate-700">
      Ayaan Syed
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-3 py-2 rounded-xl max-w-[80%] break-words ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-slate-700 text-slate-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto px-3 py-2 rounded-xl bg-slate-700 text-slate-400 text-xs animate-pulse">
            Thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-2 border-t border-slate-700 flex items-center gap-1 bg-slate-900">
        <input
          type="text"
          value={input}
          placeholder="Hi, How Can I Help?"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-xl bg-slate-800 px-2 py-1 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 rounded-xcl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition"
        >
          <SendHorizonal size={10} />
        </button>
      </div>
    </motion.div>
  );
}
