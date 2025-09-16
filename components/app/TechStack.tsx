"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Brain, Database, Globe, Paintbrush } from "lucide-react";

const TechStackSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        className="text-4xl font-bold text-gray-900 mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Current Tech Stack{" "}
        <div className="text-3xl font-bold text-purple-600 mb-4 text-center">
              AIMNT
        </div>
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        viewport={{ once: false }}
      >
        {[
          {
            icon: <Brain className="w-12 h-12 text-purple-600 mb-4" />,
            title: "AI",
            desc: "Leveraging AI to build intelligent, adaptive solutions.",
          },
          {
            icon: <Database className="w-12 h-12 text-green-600 mb-4" />,
            title: "MongoDB",
            desc: "A powerful NoSQL database for scalable applications.",
          },
          {
            icon: <Globe className="w-12 h-12 text-blue-600 mb-4" />,
            title: "Next.js",
            desc: "React framework for fast, modern web apps.",
          },
          {
            icon: <Paintbrush className="w-12 h-12 text-cyan-600 mb-4" />,
            title: "Tailwind CSS",
            desc: "Utility-first styling for sleek and responsive designs.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-gray-50"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-black">{item.title}</h3>
            <p className="text-gray-600 text-center mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

TechStackSection.displayName = "TechStackSection";
export default TechStackSection;
