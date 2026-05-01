import { motion } from "framer-motion";
import {Mic, MessageCircleDashed as MessageCircle, ChevronDown} from 'lucide-react';

const floatingWords = [
  { word: "Konnichiwa", lang: "Japones", top: "15%", left: "5%" },
  { word: "Bonjour", lang: "Frances", top: "20%", right: "6%" },
  { word: "Ciao", lang: "Italiano", top: "65%", left: "3%" },
  { word: "Hola", lang: "Espanhol", top: "70%", right: "4%" },
  { word: "Guten Morgen", lang: "Alemao", top: "40%", left: "1%" },
  { word: "\u4f60\u597d", lang: "Chines", top: "45%", right: "2%" },
];

export default function HeroSection() {
  const scrollToIdiomas = () => {
    document.querySelector("#idiomas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,153,255,0.15) 0%, rgba(123,47,255,0.1) 50%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/3"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(0,153,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating words (hidden on mobile for clarity) */}
      <div className="hidden lg:block">
        {floatingWords.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.8 }}
            className="absolute"
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <p className="text-white text-sm font-medium">{item.word}</p>
              <p className="text-gray-500 text-xs">{item.lang}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium">Tear's Studios Universe</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Idioma nao se{" "}
          <span
            className="block mt-1"
            style={{ background: "linear-gradient(135deg, #0099ff, #00d4aa, #7b2fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            estuda.
          </span>
          <span className="block mt-1 text-white">Se vive.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Pratique pron&uacute;ncia, fala, escrita e conversa&ccedil;&atilde;o em{" "}
          <strong className="text-white">13+ idiomas</strong> com a avatar{" "}
          <strong style={{ color: "#0099ff" }}>Terra</strong> — sua parceira poliglota animada do Tear's Studios Universe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#terra")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-2xl transition-all"
            style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)", boxShadow: "0 0 40px rgba(0,153,255,0.3)" }}
          >
            <MessageCircle size={20} />
            Falar com Terra
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#pratica")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/10 transition-all"
          >
            <Mic size={20} />
            Comecar Pratica
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16"
        >
          {[
            { value: "13+", label: "Idiomas" },
            { value: "17", label: "Dinamicas" },
            { value: "6", label: "Niveis" },
            { value: "A1-C2", label: "Proficiencia" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToIdiomas}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Explorar</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
