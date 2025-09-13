"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // start at half volume

      // Try to autoplay on load
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setMessage("🔊 Tap The Button To Start Music (Autoplay Is Blocked)");
        });
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setMessage("Music Paused");
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setMessage(null); // clear once music plays
      }).catch(() => {
        setMessage("🔊 Please Tap Again To Allow Music");
      });
    }
  };

  return (
    <div
      className="
        fixed inset-x-0 bottom-4 
        flex flex-col items-end gap-2
        pr-6 pb-[env(safe-area-inset-bottom)]
        z-50
      "
    >
      {/* Hidden audio */}
      <audio ref={audioRef} src="/east_duo.mp3" loop />

      {/* Message */}
      {message && (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          {message}
        </div>
      )}

      {/* Button */}
      <motion.button
        onClick={toggleAudio}
        className="p-3 rounded-full bg-gray-900 text-white shadow-lg hover:scale-110 transition-transform"
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </motion.button>
    </div>
  );
}
