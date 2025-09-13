"use client";
import { useRef, useState, useEffect } from "react";

import HeroSection from "@/components/app/Hero";
import AboutSection from "@/components/app/AboutMe";
import TechStackSection from "@/components/app/TechStack";
import PreviousWorkSection from "@/components/app/Projects";
import ContactSection from "@/components/app/Contact";

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
      return { size, top, duration, delay };
    });
    setBlocks(generated);
  }, []);

  const handleScrollTechStack = () =>
    techRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollContact = () =>
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollAboutMe = () =>
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleScrollPrevious = () =>
    previousRef.current?.scrollIntoView({ behavior: "smooth" });

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

  return (
    <div className="w-full">
      <HeroSection
        blocks={blocks}
        handleScrollAboutMe={handleScrollAboutMe}
        handleScrollTechStack={handleScrollTechStack}
        handleScrollPrevious={handleScrollPrevious}
        handleScrollContact={handleScrollContact}
      />
      <AboutSection ref={aboutRef} />
      <TechStackSection ref={techRef} />
      <PreviousWorkSection ref={previousRef} />
      <ContactSection
        ref={contactRef}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
