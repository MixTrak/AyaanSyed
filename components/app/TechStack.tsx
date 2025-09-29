"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import daisyUI from "@/public/mark-static.svg";
import Image from "next/image";

const TechStackSection = forwardRef<HTMLDivElement>((props, ref) => {
  const skills = [
    // Core Web
    { icon: <img src="https://skillicons.dev/icons?i=html" className="w-12 h-12" />, title: "HTML", percent: 95 },
    { icon: <img src="https://skillicons.dev/icons?i=css" className="w-12 h-12" />, title: "CSS", percent: 95 },
    { icon: <img src="https://skillicons.dev/icons?i=js" className="w-12 h-12" />, title: "JavaScript", percent: 95 },
    { icon: <img src="https://skillicons.dev/icons?i=ts" className="w-12 h-12" />, title: "TypeScript", percent: 85 },

    // Frontend Frameworks
    { icon: <img src="https://skillicons.dev/icons?i=react" className="w-12 h-12" />, title: "React", percent: 90 },
    { icon: <img src="https://skillicons.dev/icons?i=nextjs" className="w-12 h-12" />, title: "Next.js", percent: 95 },
    { icon: <img src="https://skillicons.dev/icons?i=tailwindcss" className="w-12 h-12" />, title: "Tailwind", percent: 90 },
    { icon: <Image src={daisyUI} className="w-12 h-12" alt="daisyUI" />, title: "DaisyUI", percent: 70 },

    // Backend
    { icon: <img src="https://skillicons.dev/icons?i=nodejs" className="w-12 h-12" />, title: "Node.js", percent: 70 },
    { icon: <img src="https://skillicons.dev/icons?i=express" className="w-12 h-12" />, title: "Express", percent: 70 },
    { icon: <img src="https://skillicons.dev/icons?i=mongodb" className="w-12 h-12" />, title: "MongoDB", percent: 95 },
    { icon: <img src="https://skillicons.dev/icons?i=firebase" className="w-12 h-12" />, title: "Firebase", percent: 95 },

    // Others
    { icon: <img src="https://skillicons.dev/icons?i=python" className="w-12 h-12" />, title: "Python", percent: 90 },
    { icon: <img src="https://skillicons.dev/icons?i=git" className="w-12 h-12" />, title: "Git", percent: 85 },
    { icon: <img src="https://skillicons.dev/icons?i=github" className="w-12 h-12" />, title: "GitHub", percent: 90 },
  ];

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        className="text-4xl font-bold text-gray-900 mb-12 overflow-y-hidden"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full"
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
        {skills.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col rounded-2xl shadow-lg bg-gray-50 p-6 space-y-4"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center space-x-4">
              {item.icon}
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <span className="ml-auto text-sm font-medium text-gray-600">{item.percent}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-blue-500 h-3 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

TechStackSection.displayName = "TechStackSection";
export default TechStackSection;
