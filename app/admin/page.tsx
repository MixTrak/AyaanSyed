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

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Animated Heading */}
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-900"
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
          >
            <p className="text-gray-500">No messages found.</p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className="grid gap-4"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                className="p-4 bg-white rounded-xl shadow-md flex justify-between items-start hover:shadow-lg transition"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {msg.name}{" "}
                    <span className="text-sm text-gray-500">({msg.email})</span>
                  </p>
                  <p className="text-gray-700 mt-1">{msg.message}</p>
                </div>
                <motion.button
                  onClick={() => handleDelete(msg._id)}
                  className="btn btn-error btn-sm ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout button separate to avoid AnimatePresence key conflicts */}
      <motion.button
        key="logout"
        onClick={handleLogout}
        className="btn btn-error mt-8"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
      >
        Logout
      </motion.button>
    </div>
  );
}
