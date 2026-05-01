import { useState } from "react";
import { motion } from "framer-motion";
import {Volume2, ChevronRight} from 'lucide-react';
import { LANGUAGES } from "@/data/languages";

const FLAG_EMOJIS: Record<string, string> = {
  BR: "\ud83c\udde7\ud83c\uddf7",
  PT: "\ud83c\uddf5\ud83c\uddf9",
  US: "\ud83c\uddfa\ud83c\uddf8",
  ES: "\ud83c\uddea\ud83c\uddf8",
  FR: "\ud83c\uddeb\ud83c\uddf7",
  DE: "\ud83c\udde9\ud83c\uddea",
  IT: "\ud83c\uddee\ud83c\uddf9",
  GR: "\ud83c\uddec\ud83c\uddf7",
  RU: "\ud83c\uddf7\ud83c\uddfa",
  JP: "\ud83c\uddef\ud83c\uddf5",
  CN: "\ud83c\udde8\ud83c\uddf3",
  KR: "\ud83c\uddf0\ud83c\uddf7",
  EG: "\ud83c\uddea\ud83c\uddec",
};

function LangCard({ lang, index }: { lang: typeof LANGUAGES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300 border"
      style={{
        background: hovered ? `${lang.color}15` : "rgba(255,255,255,0.03)",
        borderColor: hovered ? `${lang.color}60` : "rgba(255,255,255,0.08)",
        boxShadow: hovered ? `0 0 30px ${lang.color}20` : "none",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{FLAG_EMOJIS[lang.flag] ?? "🌐"}</span>
        <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={16} className="text-gray-600" />
        </motion.div>
      </div>

      <h3 className="text-white font-bold text-base mb-0.5">{lang.name}</h3>
      <p className="text-gray-500 text-sm mb-3">{lang.nativeName}</p>

      {/* Levels pills */}
      <div className="flex flex-wrap gap-1.5">
        {lang.levels.slice(0, 4).map((lvl) => (
          <span
            key={lvl}
            className="px-2 py-0.5 rounded-full text-xs font-medium border"
            style={{
              color: lang.color,
              borderColor: `${lang.color}40`,
              background: `${lang.color}10`,
            }}
          >
            {lvl}
          </span>
        ))}
        {lang.levels.length > 4 && (
          <span className="px-2 py-0.5 rounded-full text-xs text-gray-500 border border-white/10 bg-white/5">
            +{lang.levels.length - 4}
          </span>
        )}
      </div>

      {lang.variants ? (
        <div className="mt-3 flex items-center gap-1 text-xs text-gray-600">
          <Volume2 size={11} />
          <span>{lang.variants.length} variacoes</span>
        </div>
      ) : null}
    </motion.div>
  );
}

export default function LanguagesSection() {
  return (
    <section id="idiomas" className="py-24 bg-black relative overflow-hidden">
      {/* Section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 opacity-40"
        style={{ background: "linear-gradient(to bottom, transparent, #0099ff)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-4">
            🌍 Idiomas disponíveis
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            13+ Idiomas,
            <span
              className="ml-2"
              style={{ background: "linear-gradient(135deg, #0099ff, #00d4aa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Infinitas Variacoes
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Nao so o idioma — variacao cultural e fonetica. Do portugues brasileiro ao arabe egipcio,
            com sotaques, dialetos e pronuncias regionais.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {LANGUAGES.map((lang, i) => (
            <LangCard key={lang.id} lang={lang} index={i} />
          ))}
        </div>

        {/* Phonetic info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/3"
          style={{ background: "rgba(0,153,255,0.05)", borderColor: "rgba(0,153,255,0.2)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-white font-bold mb-1">3 Camadas de Linguagem</h4>
              <p className="text-gray-400 text-sm">
                Cada palavra tem: <strong className="text-white">escrita real</strong> +{" "}
                <strong style={{ color: "#0099ff" }}>pronuncia simplificada</strong> +{" "}
                <strong style={{ color: "#00d4aa" }}>audio nativo</strong>. Nao misturamos. Voce aprende como o idioma realmente soa.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                <p className="text-white font-bold">thought</p>
                <p className="text-xs text-gray-500">Escrita</p>
              </div>
              <div className="text-center px-4 py-2 rounded-xl border" style={{ borderColor: "rgba(0,153,255,0.3)", background: "rgba(0,153,255,0.1)" }}>
                <p style={{ color: "#0099ff" }} className="font-bold">thot</p>
                <p className="text-xs text-gray-500">Fonetica</p>
              </div>
              <div className="text-center px-4 py-2 rounded-xl border" style={{ borderColor: "rgba(0,212,170,0.3)", background: "rgba(0,212,170,0.1)" }}>
                <p style={{ color: "#00d4aa" }} className="font-bold">/θɔːt/</p>
                <p className="text-xs text-gray-500">IPA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
