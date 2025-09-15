'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      router.push("/admin/login");
      return;
    }

    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [router]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  const [available, setAvailable] = useState(false);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data) => setAvailable(data.available));
  }, []);

  const handleToggle = async () => {
    const newVal = !available;
    setAvailable(newVal);
    await fetch("/api/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: newVal }),
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Messages Dashboard
      </motion.h1>

      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 mt-16"
          >
            No messages found.
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                className="p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {msg.name}{" "}
                    <span className="text-sm text-gray-500">({msg.email})</span>
                  </p>
                  <p className="text-gray-700 mt-2">{msg.message}</p>
                </div>
                <motion.button
                  onClick={() => handleDelete(msg._id)}
                  className="mt-4 btn btn-error w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Availability Toggle */}
<div className="mt-10 flex justify-center">
  <label className="relative flex items-center gap-3 cursor-pointer select-none bg-purple-500 p-5 rounded-full shadow-lg">
    <span className="text-lg font-medium text-white z-10 relative">
      {available ? "Available" : "Unavailable"}
    </span>
    <div className="w-20 h-10 bg-purple-300 backdrop-blur-md rounded-full flex items-center px-1 transition-all duration-300">
      <input
        type="checkbox"
        checked={available}
        onChange={handleToggle}
        className="sr-only"
      />
      <div
        className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          available ? "translate-x-10" : "translate-x-0"
        }`}
      />
    </div>
  </label>
</div>


      {/* Logout button */}
      <motion.div className="flex justify-center mt-12">
        <motion.button
          onClick={handleLogout}
          className="btn btn-error px-10 py-3 text-lg font-semibold rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
