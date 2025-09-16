"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PFP4 from "@/public/PFP4.png";
import { useRouter } from "next/navigation";

const MotionImage = motion.create(Image);

const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  const router = useRouter();

  return (
    <section
      ref={ref}
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
            animate={{ scale: [1, 1.1, 1] }}
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
              About Me{" "}
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
              I&apos;m <div className="text-blue-400 inline">Ayaan</div>, a 9th-grade
              student at{" "}
              <div className="text-blue-400 inline">
                <a
                  href="https://www.vibgyorhigh.com/schools/bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vibgyor High Bangalore
                </a>
              </div>
              , who discovered a deep passion for programming at the age of 12.
              Since then, I have been relentlessly pursuing mastery in the art
              of coding, constantly expanding my knowledge and refining my
              skills. My current mission is to excel in{" "}
              <div className="text-blue-400 inline">Web Development</div> and{" "}
              <div className="text-blue-400 inline">Prompt Engineering</div>,
              with a particular focus on building modern, scalable, and
              user-centric e-commerce platforms.
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
              I Have{" "}
              <div className="text-blue-400 inline">
                Two Years Of Experience
              </div>{" "}
              In Web Development Which Is More Than Most Freshman In College.
              I Have Worked On Several Projects, That Demonstrate My Ability To
              Create Functional And Visually Appealing Websites. I Am Proficient
              In <div className="text-blue-400 inline">Typescript</div> And
              Popular Frameworks Such as{" "}
              <div className="text-blue-400 inline">Next.js</div>. My Enthusiasm
              For Coding Drives Me To Continuously Learn And Stay Updated With
              The Latest Industry Trends. I Am A Quick Learner, And I Thrive In
              Dynamic Environments Where I Can Constantly Learn.
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
