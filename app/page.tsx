'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import PFP3 from "@/public/PFP3.svg";
const MotionImage = motion(Image);
import { useRef, useState, useEffect } from "react";
import {
  Brain,
  Database,
  Globe,
  Paintbrush,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const AnimatedElement = ({
  children,
  variant,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  variant: "fadeInLeft" | "fadeInUp";
  delay?: number;
  duration?: number;
}) => {
  const variants = {
    fadeInLeft: { hidden: { x: -50, opacity: 0 }, show: { x: 0, opacity: 1 } },
    fadeInUp: { hidden: { y: 50, opacity: 0 }, show: { y: 0, opacity: 1 } },
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      transition={{ delay, duration }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({
  children,
  delayChildren = 0.2,
  staggerChildren = 0.1,
  ...props
}: {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren, delayChildren } },
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const techRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [blocks, setBlocks] = useState<
    { size: number; top: number; duration: number; delay: number }[]
  >([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map(() => {
      const size = Math.floor(Math.random() * 30) + 10;
      const top = Math.random() * 100;
      const duration = Math.random() * 15 + 8;
      const delay = Math.random() * 10;
      return { size, top, duration, delay };
    });
    setBlocks(generated);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScrollTechStack = () => techRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth" }); 
  const handleScrollAboutMe = () => aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  const router = useRouter();

  return (
    <div className="w-full">
      {/* HERO */}
<section className="relative w-full h-screen overflow-hidden bg-black">
  {/* Background floating blocks */}
  {blocks.map((block, i) => (
    <div
      key={i}
      className="absolute bg-purple-500 opacity-40 rounded animate-slide-x"
      style={{
        width: `${block.size}px`,
        height: `${block.size}px`,
        top: `${block.top}%`,
        animationDuration: `${block.duration}s`,
        animationDelay: `${block.delay}s`,
        transform: "translateX(-120%)",
      }}
    />
  ))}

  {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
    {/* Title */}
    <motion.h1
      className="text-white text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Ayaan Syed
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      Web Developer
    </motion.p>

    {/* Button Group */}
    <motion.div
  className="mt-10 flex flex-wrap gap-4 justify-center"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.6 }}
>

  <motion.button
    onClick={handleScrollAboutMe}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-3 rounded-md bg-purple-500 text-white font-semibold shadow-xl hover:bg-purple-600 transition 
               hover:shadow-2xl hover:shadow-purple-400/40"
  >
    About Me
  </motion.button>

  <motion.button
    onClick={handleScrollTechStack}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-3 rounded-md bg-purple-500 text-white font-semibold shadow-xl hover:bg-purple-600 transition 
               hover:shadow-2xl hover:shadow-purple-400/40"
  >
    Tech Stack
  </motion.button>

  <motion.button
    onClick={handleScrollContact}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-3 rounded-md bg-purple-500 text-white font-semibold shadow-xl hover:bg-purple-600 transition 
               hover:shadow-2xl hover:shadow-purple-400/40"
  >
    Get In Touch
  </motion.button>
</motion.div>
  </div>
</section>

      {/* ABOUT ME */}
<section
  ref={aboutRef}
  className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-6 py-20"
>
  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 max-w-5xl">
    
    {/* LEFT: Profile Picture */}
    <motion.div className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
      <MotionImage
        src={PFP3}
        alt="Profile Picture"
        className="w-48 h-48 object-cover"
        animate={{ scale: [1, 1.1, 1] }} // pulse effect
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>

    {/* RIGHT: Text */}
    <div className="flex flex-col gap-8 text-center lg:text-left">
      {/* About Me */}
      <div>
        <div className="text-3xl font-bold text-gray-900 mb-4">About Me<div onClick={() => {router.push('/admin')}} className="text-lg inline">🙂</div></div>
        <div className="text-gray-700 max-w-lg">
          I&apos;m <div className="text-blue-400 inline">Ayaan</div>, a 9th-grade student at <div className="text-blue-400 inline">Vibgyor High Bangalore</div>,
          who discovered a deep passion for programming at the age of 12.
          Since then, I have been relentlessly pursuing mastery in the art of coding,
          constantly expanding my knowledge and refining my skills. My current mission is to excel in <div className="text-blue-400 inline">Web Development</div>,
          with a particular focus on building modern, scalable,
          and user-centric e-commerce platforms. With a growing expertise in designing seamless digital storefronts,
          I aim to blend creativity with technical precision to deliver impactful online experiences.
        </div>
      </div>

      {/* Why Hire Me */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why You Should Hire Me?
        </h2>
        <p className="text-gray-700 max-w-lg">
        I Have Two Years Of Experience In Web Development Which Is More Than Most Freshman In College.
        I Have Worked On Several Projects, That Demonstrate My Ability To Create Functional And Visually Appealing Websites.
        I Am Proficient In Typescript And Popular Frameworks Like React And Next.js. My Passion For Coding Drives Me To Continuously
        Learn And Stay Updated With The Latest Industry Trends. I Am A Quick Learner, And I Thrive In Dynamic Environments Where I Can Constantly Learn.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* TECH STACK */}
      <section
        ref={techRef}
        className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Current Tech Stack <span className="text-purple-600 block text-center mt-2">AIMNT</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full">
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
            <div
              key={i}
              className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-gray-50"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <p className="text-gray-600 text-center mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        ref={contactRef}
        className="w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-center gap-12 px-6 py-20 items-center"
      >
        {/* Contact Info */}
        <aside className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-6 text-black">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-black" />
              <span className="text-lg text-black">+91 8618792769</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-black" />
              <span className="text-lg text-black">ayaanplays18@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-black" />
              <span className="text-lg text-black">Bangalore</span>
            </div>
          </div>
          <motion.a
            href="https://wa.me/918618792769"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success w-full flex items-center justify-center gap-2 mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} /> WhatsApp
          </motion.a>
        </aside>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between"
        >
          <h3 className="text-2xl font-bold text-black mb-6">Contact Me?</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Your Name
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full bg-white border-gray-400 text-black"
                required
                placeholder='John Smith'
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full bg-white border-gray-400 text-black"
                required
                placeholder='JohnSmith@gmail.com'
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                className="textarea textarea-bordered w-full bg-white border-gray-400 text-black"
                required
                placeholder='Hi Ayaan, I would like to...'
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary w-full mt-6 flex items-center justify-center disabled:opacity-50"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      </section>
    </div>
  );
}
