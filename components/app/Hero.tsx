"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import PFP4 from "@/public/PFP4.png";
import PFP4Mobile from "@/public/PFP4-Mobile.jpg";
export default function HeroSection({
  blocks,
  handleScrollAboutMe,
  handleScrollTechStack,
  handleScrollPrevious,
  handleScrollContact,
}: {
  blocks: { size: number; top: number; duration: number; delay: number }[];
  handleScrollAboutMe: () => void;
  handleScrollTechStack: () => void;
  handleScrollPrevious: () => void;
  handleScrollContact: () => void;
}) {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Image src={PFP4} alt="Background" fill sizes="(min-width:768px) 100vw" className="hidden md:block object-cover brightness-50" priority />
      <Image src={PFP4Mobile} alt="Background Mobile" fill sizes="(max-width:767px) 100vw" className="block md:hidden object-cover brightness-50" priority />
      <div className="absolute inset-0 bg-black/70" />
      {blocks.map((block, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-slide-x"
          style={{
            width: `${block.size}px`,
            height: `${block.size}px`,
            top: `${block.top}%`,
            animationDuration: `${block.duration}s`,
            animationDelay: `${block.delay}s`,
            transform: "translateX(-120%)",
            backgroundColor: "rgba(194,160,252,1)",
            opacity: 0.4,
          }}
        />
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          className="text-white text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ayaan Syed
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            Prompt Engineer
          </motion.span>
          <span className="mx-1">+</span>
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1 }}>
            Full-Stack Developer
          </motion.span>
        </motion.p>
        <motion.div
          className="mt-6 flex sm:hidden flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[
            { label: "About", onClick: handleScrollAboutMe },
            { label: "Stack", onClick: handleScrollTechStack },
            { label: "XP", onClick: handleScrollPrevious },
            { label: "Contact", onClick: handleScrollContact },
          ].map((btn, i) => (
            <motion.button
              key={i}
              onClick={btn.onClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
              className="relative text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-medium shadow-md hover:shadow-purple-400/60 transition-all duration-300 ease-out overflow-hidden backdrop-blur-md"
            >
              <span className="relative z-10">{btn.label}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          className="hidden sm:flex mt-10 flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[
            { label: "About Me", onClick: handleScrollAboutMe },
            { label: "Tech Stack", onClick: handleScrollTechStack },
            { label: "Experiences", onClick: handleScrollPrevious },
            { label: "Get In Touch", onClick: handleScrollContact },
          ].map((btn, i) => (
            <motion.button
              key={i}
              onClick={btn.onClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold shadow-lg hover:shadow-purple-400/60 transition-all duration-300 ease-out overflow-hidden backdrop-blur-md"
            >
              <span className="relative z-10">{btn.label}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
