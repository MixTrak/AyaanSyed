"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Chatbot from "./Chatbot";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Live availability update every second
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch("/api/availability");
        const data = await res.json();
        setAvailable(data.available);
      } catch {
        setAvailable(false);
      }
    };

    fetchAvailability();
    const interval = setInterval(fetchAvailability, 600000);
    return () => clearInterval(interval);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Menu Button: only visible when sidebar is closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 right-4 sm:right-6 z-50 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-xl"
        >
          <MenuIcon size={24} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.aside
            ref={sidebarRef}
            key="sidebar"
            initial={{ x: 350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 350, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 h-full w-72 bg-black/30 backdrop-blur-xl p-6 flex flex-col gap-6 z-40 shadow-none"
          >
            {/* Date + Time */}
            <motion.div
              className="bg-gray-800/50 rounded-2xl p-4 text-white shadow-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg font-bold">
                {dateTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <p className="text-2xl mt-1 font-mono">
                {dateTime.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </motion.div>

            {/* Availability (Live Reload) */}
            <motion.div
              className="bg-gray-800/50 rounded-2xl p-4 text-white shadow-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg font-semibold">Status</p>
              <motion.p
                className={`mt-2 font-bold ${available ? "text-green-400" : "text-red-400"}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {available ? "Available" : "Not Available"}
              </motion.p>
            </motion.div>

            {/* ChatBot Card */}
            <motion.div
              className="bg-gray-800/50 rounded-2xl p-4 text-gray-300 shadow-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Chatbot />
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}