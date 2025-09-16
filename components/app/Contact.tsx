"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactSection = forwardRef<
  HTMLDivElement,
  { handleSubmit: (e: React.FormEvent) => void; loading: boolean }
>(({ handleSubmit, loading }, ref) => {
  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-center gap-12 px-6 py-20 items-center"
    >
      {/* Contact Info */}
      <motion.aside
        className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between w-full max-w-sm"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
        >
          {[
            { icon: <Phone className="w-6 h-6 text-black" />, text: "+91 8618792769" },
            { icon: <Mail className="w-6 h-6 text-black" />, text: "ayaanplays18@gmail.com" },
            { icon: <MapPin className="w-6 h-6 text-black" />, text: "Bangalore" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4"
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
          <div className="flex items-center gap-4 mt-4">
            <a href="https://github.com/Mixtrak" target="_blank">
              <img src="https://skillicons.dev/icons?i=github" className="h-6"/>
            </a>
            <span className="text-lg text-black">GitHub</span>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <a href="https://www.instagram.com/ayaanplayz18" target="_blank">
              <img src="https://skillicons.dev/icons?i=instagram" className="h-6"/>
            </a>
            <span className="text-lg text-black">Instagram</span>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <a href="https://discord.com/users/1157419276483952680" target="_blank">
              <img src="https://skillicons.dev/icons?i=discord" className="h-6"/>
            </a>
            <span className="text-lg text-black">Discord</span>
          </div>

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
        >
          {[
            { label: "Your Name", type: "text", name: "name", placeholder: "John Smith" },
            { label: "Email", type: "email", name: "email", placeholder: "JohnSmith@gmail.com" },
            { label: "Message", type: "textarea", name: "message", placeholder: "Hi Ayaan, I would like to..." },
          ].map((field, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
            />
          ) : (
            "Send Message"
          )}
        </motion.button>
      </motion.form>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
