"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Video from 'next-video';

import Chatify1 from "@/public/Chatify1.svg";
import Chatify2 from "@/public/Chatify2.svg";
import Chatify3 from "@/public/Chatify3.svg";

import ETS1 from "@/public/ETS1.svg";
import ETS2 from "@/public/ETS2.svg";
import ETS3 from "@/public/ETS3.svg";
import ETS4 from "@/public/ETS4.svg";

import SkillShare1 from "@/public/SkillShare1.svg";
import SkillShare2 from "@/public/SkillShare2.svg";
import SkillShare3 from "@/public/SkillShare3.svg";

import Demo from "/videos/Demo.mp4";
// import getStarted from '/videos/get-started.mp4';

const MotionImage = motion.create(Image);

const PreviousWorkSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-gray-100 flex-col items-center px-6 py-20 block"
    >
      <motion.h2
        className="text-4xl font-bold text-gray-900 mb-12"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <div className="text-3xl font-bold text-gray-600 mb-4 text-center">
              Previous Work
        </div>
      </motion.h2>

      <div className="w-full max-w-6xl flex flex-col gap-24">
        {/* Project 1 - Chatify */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
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
                  <div id="slide1" className="carousel-item relative w-full">
                    <MotionImage src={Chatify1} alt="Image Of Chatify" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide3")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide2")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

                  <div id="slide2" className="carousel-item relative w-full">
                    <MotionImage src={Chatify2} alt="Image Of Chatify" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide1")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide3")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

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
            >
              Chatify
            </motion.h3>
            <motion.p
              className="text-gray-700 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
            >
              Visit Website
            </motion.a>
          </motion.div>
        </div>

        {/* Project 2 - ETS */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
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
                  <div id="slide4" className="carousel-item relative w-full">
                    <MotionImage src={ETS1} alt="Image Of ETS" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide7")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide5")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

                  <div id="slide5" className="carousel-item relative w-full">
                    <MotionImage src={ETS2} alt="Image Of ETS" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide4")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide6")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

                  <div id="slide6" className="carousel-item relative w-full">
                    <MotionImage src={ETS3} alt="Image Of ETS" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide5")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide7")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

                  <div id="slide7" className="carousel-item relative w-full">
                    <MotionImage src={ETS4} alt="Image Of ETS" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide6")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide4")} className="btn btn-circle">❯</button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          <motion.div
            className="text-center lg:text-left lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ETS
            </motion.h3>
            <motion.p
              className="text-gray-700 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
            >
              Visit Website
            </motion.a>
          </motion.div>
        </div>

            {/* Project 3 - SkillShare */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
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
                  <div id="slide8" className="carousel-item relative w-full">
                    <MotionImage src={SkillShare1} alt="Image Of SkillShare" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide10")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide9")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

                  <div id="slide9" className="carousel-item relative w-full">
                    <MotionImage src={SkillShare2} alt="Image Of SkillShare" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide8")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide10")} className="btn btn-circle">❯</button>
                    </div>
                  </div>

                  <div id="slide10" className="carousel-item relative w-full">
                    <MotionImage src={SkillShare3} alt="Image Of SkillShare" className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <button onClick={() => scrollToSlide("#slide9")} className="btn btn-circle">❮</button>
                      <button onClick={() => scrollToSlide("#slide8")} className="btn btn-circle">❯</button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          <motion.div
            className="text-center lg:text-left lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              SkillShare
            </motion.h3>
            <motion.p
              className="text-gray-700 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              SkillShare – A  modern, full-stack e-commerce platform built with Next.js 14,
              TypeScript, MongoDB, and Framer Motion. Features include product management,
              user authentication, admin panel with role-based access control, WhatsApp integration,
              and beautiful animations.
            </motion.p>
            <motion.a
              href="https://skill-share-nxt.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Visit Website
            </motion.a>
          </motion.div>
        </div>

        {/* Project - 4 - GateFace */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          <div className="rounded-lg object-cover">
            <Video src={Demo} />
          </div>
          <motion.div
            className="text-center lg:text-left lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              GateFace
            </motion.h3>
            <motion.p
              className="text-gray-700 mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              GateFace is a Python-based project that
              uses Face ID recognition to open applications
              or URLs configured by the user. Think of it as
              a face-unlock for your apps and tools — once your
              face is recognized, GateFace automatically launches
              your chosen apps or websites.
            </motion.p>
            <motion.a
              href="https://github.com/MixTrak/GateFace"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              View Project
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

PreviousWorkSection.displayName = "PreviousWorkSection";
export default PreviousWorkSection;
