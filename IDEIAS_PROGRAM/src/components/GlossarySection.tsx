import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Search, Volume2, ChevronDown} from 'lucide-react';
import { PHONETIC_EXAMPLES } from "@/data/languages";

const FULL_GLOSSARY = [
  ...PHONETIC_EXAMPLES,
  {
    word: "Arigatou",
    phonetic_simple: "a-ri-ga-tou",
    phonetic_ipa: "/aɾiɡatoː/",
    meaning: "Obrigado (informal)",
    language: "Japones",
    example: "Arigatou gozaimasu — Muito obrigado!",
  },
  {
    word: "Gracias",
    phonetic_simple: "gra-sias",
    phonetic_ipa: "/ˈɡɾa.sjas/",
    meaning: "Obrigado",
    language: "Espanhol",
    example: "Muchas gracias por tu ayuda.",
  },
  {
    word: "Merci",
    phonetic_simple: "mer-si",
    phonetic_ipa: "/mɛʁsi/",
    meaning: "Obrigado",
    language: "Frances",
    example: "Merci beaucoup!",
  },
  {
    word: "Danke",
    phonetic_simple: "dan-ke",
    phonetic_ipa: "/ˈdaŋkə/",
    meaning: "Obrigado",
    language: "Alemao",
    example: "Vielen Dank!",
  },
  {
    word: "Kamsahamnida",
    phonetic_simple: "kam-sa-hm-ni-da",
    phonetic_ipa: "/kamsaɦamnida/",
    meaning: "Obrigado (formal)",
    language: "Coreano",
    example: "감사합니다 — Muito obrigado!",
  },
  {
    word: "Shukran",
    phonetic_simple: "shu-kran",
    phonetic_ipa: "/ʃukran/",
    meaning: "Obrigado",
    language: "Arabe Egipcio",
    example: "Shukran jazilan — Muito obrigado!",
  },
  {
    word: "Ciao",
    phonetic_simple: "chau",
    phonetic_ipa: "/tʃaːo/",
    meaning: "Ola / Tchau",
    language: "Italiano",
    example: "Ciao! Come stai?",
  },
  {
    word: "Spasibo",
    phonetic_simple: "spa-si-ba",
    phonetic_ipa: "/spɐˈsʲibə/",
    meaning: "Obrigado",
    language: "Russo",
    example: "Bolshoe spasibo! — Muito obrigado!",
  },
  {
    word: "Efcharisto",
    phonetic_simple: "ef-kha-ris-to",
    phonetic_ipa: "/efˈxaristo/",
    meaning: "Obrigado",
    language: "Grego",
    example: "Efcharisto para poly! — Muito obrigado!",
  },
  {
    word: "What are you doing?",
    phonetic_simple: "whatcha doin?",
    phonetic_ipa: "/ˈwɒtʃər ˈduɪŋ/",
    meaning: "O que voce esta fazendo?",
    language: "Ingles",
    example: "Forma real de fala: 'Whatcha doin tonight?'",
  },
];

const LANGUAGE_FILTERS = ["Todos", "Ingles", "Japones", "Frances", "Espanhol", "Alemao", "Coreano", "Italiano", "Russo", "Grego", "Arabe Egipcio"];

export default function GlossarySection() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("Todos");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = FULL_GLOSSARY.filter((w) => {
    const matchSearch =
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.meaning.toLowerCase().includes(search.toLowerCase()) ||
      w.language.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === "Todos" || w.language === langFilter;
    return matchSearch && matchLang;
  });

  return (
    <section id="glossario" className="py-24 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 80% 50%, rgba(0,212,170,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs text-teal-400 mb-4">
            📚 Glossario Interativo
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Pronuncia +{" "}
            <span
              style={{ background: "linear-gradient(135deg, #00d4aa, #0099ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Fonetica + Audio
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada palavra com escrita real, pronuncia simplificada e IPA tecnico.
            Pesquise em qualquer idioma.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar palavra, significado ou idioma..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm outline-none focus:border-teal-500/50 transition-all"
            />
          </div>
        </div>

        {/* Language filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {LANGUAGE_FILTERS.map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
              style={{
                background: langFilter === lang ? "#00d4aa" : "rgba(255,255,255,0.05)",
                borderColor: langFilter === lang ? "#00d4aa" : "rgba(255,255,255,0.1)",
                color: langFilter === lang ? "#000" : "#9ca3af",
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Glossary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((word) => (
              <motion.div
                key={word.word + word.language}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                onClick={() => setExpanded(expanded === word.word + word.language ? null : word.word + word.language)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-bold text-lg">{word.word}</h4>
                      <span className="text-gray-500 text-xs">{word.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-2 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-all"
                        title="Ouvir pronuncia"
                      >
                        <Volume2 size={14} />
                      </motion.button>
                      <ChevronDown
                        size={14}
                        className="text-gray-500 transition-transform"
                        style={{ transform: expanded === word.word + word.language ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </div>

                  {/* Phonetic layers */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="px-2 py-1 rounded-lg text-xs border border-white/10 bg-white/5 text-gray-300">
                      ✍️ {word.word}
                    </span>
                    <span
                      className="px-2 py-1 rounded-lg text-xs border font-mono"
                      style={{ borderColor: "rgba(0,153,255,0.3)", background: "rgba(0,153,255,0.1)", color: "#0099ff" }}
                    >
                      🔊 {word.phonetic_simple}
                    </span>
                    <span
                      className="px-2 py-1 rounded-lg text-xs border font-mono"
                      style={{ borderColor: "rgba(0,212,170,0.3)", background: "rgba(0,212,170,0.1)", color: "#00d4aa" }}
                    >
                      {word.phonetic_ipa}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm font-medium">{word.meaning}</p>
                </div>

                <AnimatePresence>
                  {expanded === word.word + word.language && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/8 pt-4">
                        <p className="text-gray-400 text-sm italic">"{word.example}"</p>
                        <div className="mt-3 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2 rounded-xl text-xs font-bold text-white"
                            style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
                          >
                            Praticar Pronuncia
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-2 rounded-xl text-xs font-medium border border-white/15 bg-white/5 text-gray-300 hover:text-white transition-all"
                          >
                            Adicionar ao Treino
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{search}"</p>
            <button
              onClick={() => { setSearch(""); setLangFilter("Todos"); }}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Phonetic guide callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border"
          style={{ background: "linear-gradient(135deg, rgba(0,212,170,0.05), rgba(0,153,255,0.05))", borderColor: "rgba(0,212,170,0.2)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { level: "🟢 Iniciante", desc: "Pronuncia simplificada + audio. Voce ve 'thot' e ouve a voz da Terra", color: "#00d4aa" },
              { level: "🟡 Intermediario", desc: "Mistura escrita real com pronuncia. 'thought' e 'thot' ao mesmo tempo", color: "#0099ff" },
              { level: "🔴 Avancado", desc: "So audio + contexto, sem ajuda. Fluencia real do idioma", color: "#ff6b35" },
            ].map((prog) => (
              <div key={prog.level}>
                <p className="font-bold mb-2" style={{ color: prog.color }}>{prog.level}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
