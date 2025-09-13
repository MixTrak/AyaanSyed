'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";

// Profile Picture
import PFP3 from "@/public/PFP3.svg";

// Background Images
import PFP4 from "@/public/PFP4.png";
import PFP4Mobile from "@/public/PFP4-Mobile.jpg";

// Chatify Project Images
import Chatify1 from "@/public/Chatify1.svg";
import Chatify2 from "@/public/Chatify2.svg";
import Chatify3 from "@/public/Chatify3.svg";

// ETS Project Images
import ETS1 from "@/public/ETS1.svg";
import ETS2 from "@/public/ETS2.svg";
import ETS3 from "@/public/ETS3.svg";
import ETS4 from "@/public/ETS4.svg";

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
      viewport={{ once: false }}
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
    viewport={{ once: false }}
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
  const previousRef = useRef<HTMLDivElement>(null);

  const [blocks, setBlocks] = useState<
    { size: number; top: number; duration: number; delay: number }[]
  >([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generated = Array.from({ length: 100 }).map(() => {
      const size = Math.floor(Math.random() * 30) + 10;
      const top = Math.random() * 100;
      const duration = Math.random() * 15 + 8;
      const delay = Math.random() * 10;
      console.log("Blocks Generated Properly");
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
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScrollTechStack = () => techRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth" }); 
  const handleScrollAboutMe = () => aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollPrevious = () => previousRef.current?.scrollIntoView({ behavior: "smooth" });
  const router = useRouter();

  return (
    <div className="w-full">
    {/* HERO */}
<section className="relative w-full h-screen overflow-hidden bg-black">
  {/* Desktop Background */}
  <Image
    src={PFP4}
    alt="Background"
    fill
    className="hidden md:block object-cover brightness-50"
    priority
  /> 

  {/* Mobile Background */}
  <Image
    src={PFP4Mobile}
    alt="Background Mobile"
    fill
    className="block md:hidden object-cover brightness-50"
    priority
  />

  {/* Optional overlay to make it more subtle */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Background floating blocks */}
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
        backgroundColor: "rgba(194,160,252,1)", // custom color
      opacity: 0.4, // keep subtle transparency
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
  className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl flex items-center gap-2"
>
  {/* Prompt Engineer */}
  <motion.span
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    Prompt Engineer
  </motion.span>

  {/* Plus (always visible, no animation) */}
  <span className="mx-1">+</span>

  {/* Full-Stack Developer */}
  <motion.span
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    Full-Stack Developer
  </motion.span>
</motion.p>


    {/* Button Group */}
    <motion.div
  className="mt-10 flex flex-wrap gap-4 justify-center"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.6 }}
  viewport={{ once: false }}
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
    onClick={handleScrollPrevious}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-3 rounded-md bg-purple-500 text-white font-semibold shadow-xl hover:bg-purple-600 transition 
               hover:shadow-2xl hover:shadow-purple-400/40"
  >
    Experiences
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
  <motion.div
    className="flex flex-col lg:flex-row items-center lg:items-start gap-16 max-w-5xl"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: false }}
  >
    {/* LEFT: Profile Picture */}
    <motion.div
      className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
    >
      <MotionImage
        src={PFP4}
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
    <motion.div
      className="flex flex-col gap-8 text-center lg:text-left"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
    >
      {/* About Me */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false }}
      >
        <div className="text-3xl font-bold text-gray-900 mb-4">
          About Me
          <div
            onClick={() => {
              router.push("/admin");
            }}
            className="text-lg inline"
          >
            🙂
          </div>
        </div>
        <div className="text-gray-700 max-w-lg">
          I&apos;m <div className="text-blue-400 inline">Ayaan</div>, a 9th-grade student at{" "}
          <div className="text-blue-400 inline"><a href='https://www.vibgyorhigh.com/schools/bengaluru' target="_blank" rel="noopener noreferrer">Vibgyor High Bangalore</a></div>,
          who discovered a deep passion for programming at the age of 12.
          Since then, I have been relentlessly pursuing mastery in the art of coding,
          constantly expanding my knowledge and refining my skills. My current mission is to excel in{" "}
          <div className="text-blue-400 inline">Web Development</div> and <div className='text-blue-400 inline'>Prompt Engineering</div>,
          with a particular focus on building modern, scalable,
          and user-centric e-commerce platforms. With a growing expertise in designing seamless digital storefronts,
          I aim to blend creativity with technical precision to deliver impactful online experiences.
        </div>
      </motion.div>

      {/* Why Hire Me */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: false }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why You Should Hire Me?
        </h2>
        <div className="text-gray-700 max-w-lg">
          I Have <div className='text-blue-400 inline'>Two Years Of Experience</div> In Web Development Which Is More Than Most Freshman In College.
          I Have Worked On Several Projects, That Demonstrate My Ability To Create Functional And Visually Appealing Websites.
          I Am Proficient In <div className='text-blue-400 inline'>Typescript</div> And Popular Frameworks Such as <div className='text-blue-400 inline'>Next.js</div>. My Enthusiasm For Coding Drives Me To Continuously
          Learn And Stay Updated With The Latest Industry Trends. I Am A Quick Learner, And I Thrive In Dynamic Environments Where I Can Constantly Learn.
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
</section>

{/* TECH STACK */}
<section
  ref={techRef}
  className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20"
>
  {/* Heading */}
  <motion.h2
    className="text-4xl font-bold text-gray-900 mb-12"
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    Current Tech Stack{" "}
    <span className="text-purple-600 block text-center mt-2">AIMNT</span>
  </motion.h2>

  {/* Grid */}
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

{/* Previous Work */}
<section
  ref={previousRef}
  className="w-full min-h-screen bg-gray-100 flex flex-col items-center px-6 py-20"
>
  {/* Section Title */}
  <motion.h2
    className="text-4xl font-bold text-gray-900 mb-12"
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: false }}
  >
    Previous Work
  </motion.h2>

  {/* Project List Wrapper */}
  <div className="w-full max-w-6xl flex flex-col gap-24">
    {/* Project 1 - Chatify */}
    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
      {/* Carousel (NO animation) */}
      <div className="carousel w-full lg:w-2/3">
        {(() => {
          const scrollToSlide = (id: string) => {
            const el = document.querySelector(id);
            if (el) {
              el.scrollIntoView({
                block: "nearest",
                inline: "center",
                behavior: "smooth",
              });
            }
          };

          return (
            <>
              {/* Slide 1 */}
              <div id="slide1" className="carousel-item relative w-full">
                <MotionImage src={Chatify1} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide3")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide2")} className="btn btn-circle">❯</button>
                </div>
              </div>

              {/* Slide 2 */}
              <div id="slide2" className="carousel-item relative w-full">
                <MotionImage src={Chatify2} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide1")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide3")} className="btn btn-circle">❯</button>
                </div>
              </div>

              {/* Slide 3 */}
              <div id="slide3" className="carousel-item relative w-full">
                <MotionImage src={Chatify3} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide2")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide1")} className="btn btn-circle">❯</button>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Project Info */}
      <motion.div
        className="text-center lg:text-left lg:w-1/3"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <motion.h3
          className="text-2xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          Chatify
        </motion.h3>

        <motion.p
          className="text-gray-700 mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
        >
          Chatify – A sleek and modern messaging platform built with Next.js, Firebase, and MongoDB. 
          Effortlessly send text messages and images, connect with friends, and stay engaged in real time.
          <br /><br />
          This project goes beyond basic chatting — it offers intuitive profile management, seamless group creation, 
          and a smooth, user-friendly experience that keeps conversations fun and meaningful.
        </motion.p>

        <motion.a
          href="https://chatify-org.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
        >
          Visit Website
        </motion.a>
      </motion.div>
    </div>

    {/* Project 2 - ETS */}
    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
      {/* Carousel (NO animation) */}
      <div className="carousel w-full lg:w-2/3">
        {(() => {
          const scrollToSlide = (id: string) => {
            const el = document.querySelector(id);
            if (el) {
              el.scrollIntoView({
                block: "nearest",
                inline: "center",
                behavior: "smooth",
              });
            }
          };

          return (
            <>
              {/* Slide 1 */}
              <div id="slide4" className="carousel-item relative w-full">
                <MotionImage src={ETS1} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide7")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide5")} className="btn btn-circle">❯</button>
                </div>
              </div>

              {/* Slide 2 */}
              <div id="slide5" className="carousel-item relative w-full">
                <MotionImage src={ETS2} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide4")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide6")} className="btn btn-circle">❯</button>
                </div>
              </div>

              {/* Slide 3 */}
              <div id="slide6" className="carousel-item relative w-full">
                <MotionImage src={ETS3} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide5")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide7")} className="btn btn-circle">❯</button>
                </div>
              </div>

              {/* Slide 4 */}
              <div id="slide7" className="carousel-item relative w-full">
                <MotionImage src={ETS4} alt="Image Of Chatify" className="w-full" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button onClick={() => scrollToSlide("#slide6")} className="btn btn-circle">❮</button>
                  <button onClick={() => scrollToSlide("#slide4")} className="btn btn-circle">❯</button>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Project Info */}
      <motion.div
        className="text-center lg:text-left lg:w-1/3"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <motion.h3
          className="text-2xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          ETS
        </motion.h3>

        <motion.p
          className="text-gray-700 mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
        >
          ETS – A sleek and modern e-commerce platform built with Next.js, Firebase, and MongoDB.
          Effortlessly Find and Buy Top Quality Products.
        </motion.p>

        <motion.a
          href="https://ets-ecommerce.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
        >
          Visit Website
        </motion.a>
      </motion.div>
    </div>
  </div>
</section>


{/* CONTACT */}
<section
  ref={contactRef}
  className="w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-center gap-12 px-6 py-20 items-center"
>
  {/* Contact Info */}
  <motion.aside
    className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between w-full max-w-sm"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl font-bold mb-6 text-black">Get in Touch</h2>
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      viewport={{ once: false }}
    >
      {[
        {
          icon: <Phone className="w-6 h-6 text-black" />,
          text: "+91 8618792769",
        },
        {
          icon: <Mail className="w-6 h-6 text-black" />,
          text: "ayaanplays18@gmail.com",
        },
        {
          icon: <MapPin className="w-6 h-6 text-black" />,
          text: "Bangalore",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-4"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {item.icon}
          <span className="text-lg text-black">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>

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
  </motion.aside>

  {/* Contact Form */}
  <motion.form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <h3 className="text-2xl font-bold text-black mb-6">Contact Me?</h3>
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      viewport={{ once: false }}
    >
      {[
        {
          label: "Your Name",
          type: "text",
          name: "name",
          placeholder: "John Smith",
        },
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "JohnSmith@gmail.com",
        },
        {
          label: "Message",
          type: "textarea",
          name: "message",
          placeholder: "Hi Ayaan, I would like to...",
        },
      ].map((field, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <label className="block text-sm font-medium mb-2 text-black">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              rows={6}
              className="textarea textarea-bordered w-full bg-white border-gray-400 text-black"
              required
              placeholder={field.placeholder}
            />
          ) : (
            <input
              name={field.name}
              type={field.type}
              className="input input-bordered w-full bg-white border-gray-400 text-black"
              required
              placeholder={field.placeholder}
            />
          )}
        </motion.div>
      ))}
    </motion.div>

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
          viewport={{ once: false }}
        />
      ) : (
        "Send Message"
      )}
    </motion.button>
  </motion.form>
</section>

    </div>
  );
}
