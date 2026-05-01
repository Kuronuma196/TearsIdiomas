import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Menu, X, Globe, Mic, BookOpen, MessageCircleDashed as MessageCircle, BarChart2} from 'lucide-react';

const navLinks = [
  { href: "#idiomas", label: "Idiomas", icon: Globe },
  { href: "#modulos", label: "Modulos", icon: BookOpen },
  { href: "#pratica", label: "Pratica", icon: Mic },
  { href: "#terra", label: "Terra IA", icon: MessageCircle },
  { href: "#glossario", label: "Glossario", icon: BarChart2 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-tight">Idiomas</span>
              <span style={{ color: "#0099ff" }} className="text-xs font-medium tracking-widest uppercase">Tear's Web</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLink("#terra")}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
            >
              Comecar Agora
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-20 px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleLink(link.href)}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-200 hover:text-white hover:bg-white/5 transition-all text-left"
                  >
                    <Icon size={20} style={{ color: "#0099ff" }} />
                    <span className="text-lg font-medium">{link.label}</span>
                  </button>
                );
              })}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLink("#terra")}
                className="mt-4 px-6 py-4 rounded-2xl text-white font-semibold text-lg"
                style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
              >
                Comecar Agora
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
