import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Volume2, Play, ChevronRight} from 'lucide-react';

interface AudioExample {
  id: string;
  language: string;
  flag: string;
  phrase: string;
  phonetic: string;
  ipa: string;
  translation: string;
  realSpeech?: string;
  color: string;
  category: string;
}

const AUDIO_EXAMPLES: AudioExample[] = [
  {
    id: "en-1",
    language: "Ingles",
    flag: "🇺🇸",
    phrase: "What are you doing?",
    phonetic: "whatcha doin?",
    ipa: "/ˈwɒtʃər ˈduɪŋ/",
    translation: "O que voce esta fazendo?",
    realSpeech: "Fala real: 'Whatcha doin tonight?'",
    color: "#0099ff",
    category: "Conversacao",
  },
  {
    id: "en-2",
    language: "Ingles",
    flag: "🇺🇸",
    phrase: "I'm going to the store",
    phonetic: "aim goin tu deh stor",
    ipa: "/aɪm ˈɡoʊɪŋ tə ðə stɔːr/",
    translation: "Vou a loja",
    realSpeech: "Reducao natural: 'gonna' em vez de 'going to'",
    color: "#0099ff",
    category: "Cotidiano",
  },
  {
    id: "ja-1",
    language: "Japones",
    flag: "🇯🇵",
    phrase: "konnichiwa",
    phonetic: "kon-ni-chi-ua",
    ipa: "/ko.nʲi.tɕi.wa/",
    translation: "Boa tarde / Ola",
    realSpeech: "Forma completa: Konnichiwa gozaimasu",
    color: "#ff6b9d",
    category: "Saudacao",
  },
  {
    id: "fr-1",
    language: "Frances",
    flag: "🇫🇷",
    phrase: "Bonjour",
    phonetic: "bon-jur",
    ipa: "/bɔŋ.ʒuʁ/",
    translation: "Bom dia / Ola",
    realSpeech: "O 'r' frances e gutural — nao e o r portugues!",
    color: "#7b2fff",
    category: "Saudacao",
  },
  {
    id: "es-1",
    language: "Espanhol",
    flag: "🇪🇸",
    phrase: "Mucho gusto",
    phonetic: "mu-cho gus-to",
    ipa: "/ˈmu.tʃo ˈɡus.to/",
    translation: "Muito prazer",
    realSpeech: "Na America Latina: sotaque mais aberto no 'o'",
    color: "#ff6b35",
    category: "Apresentacao",
  },
  {
    id: "de-1",
    language: "Alemao",
    flag: "🇩🇪",
    phrase: "Guten Morgen",
    phonetic: "gu-ten mor-guen",
    ipa: "/ˈɡuːtən ˈmɔʁɡən/",
    translation: "Bom dia",
    realSpeech: "O 'G' e suave, quase um 'gu' arrastado",
    color: "#ffd700",
    category: "Saudacao",
  },
  {
    id: "ko-1",
    language: "Coreano",
    flag: "🇰🇷",
    phrase: "감사합니다",
    phonetic: "gam-sa-ham-ni-da",
    ipa: "/kamsaɦamnida/",
    translation: "Muito obrigado (formal)",
    realSpeech: "Informal: gamsahae (감사해)",
    color: "#7b2fff",
    category: "Educacao",
  },
  {
    id: "it-1",
    language: "Italiano",
    flag: "🇮🇹",
    phrase: "Ciao!",
    phonetic: "chau",
    ipa: "/tʃaːo/",
    translation: "Ola! / Tchau!",
    realSpeech: "Usado tanto para cumprimentar quanto para se despedir",
    color: "#ff4757",
    category: "Saudacao",
  },
];

const CATEGORIES = ["Todos", "Saudacao", "Conversacao", "Cotidiano", "Apresentacao", "Educacao"];

function WaveAnimation({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: color, minHeight: 3 }}
          animate={
            isPlaying
              ? {
                  height: [4, 8 + Math.random() * 16, 4],
                  opacity: [0.6, 1, 0.6],
                }
              : { height: 3, opacity: 0.3 }
          }
          transition={{
            duration: 0.6 + i * 0.05,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AudioCard({ example, index }: { example: AudioExample; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={() => setShowLayers(!showLayers)}
      className="rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden"
      style={{
        background: showLayers ? `${example.color}10` : "rgba(255,255,255,0.03)",
        borderColor: showLayers ? `${example.color}50` : "rgba(255,255,255,0.08)",
      }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{example.flag}</span>
            <div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ color: example.color, background: `${example.color}15`, border: `1px solid ${example.color}30` }}
              >
                {example.language}
              </span>
              <span className="ml-2 text-xs text-gray-600 border border-white/10 px-2 py-0.5 rounded-full">
                {example.category}
              </span>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-gray-600 transition-transform mt-1"
            style={{ transform: showLayers ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </div>

        {/* Phrase */}
        <h3 className="text-white font-black text-xl mb-1">{example.phrase}</h3>
        <p className="text-gray-400 text-sm mb-4">{example.translation}</p>

        {/* Wave + Play */}
        <div className="flex items-center justify-between">
          <WaveAnimation isPlaying={isPlaying} color={example.color} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background: isPlaying ? `${example.color}30` : `${example.color}20`,
              color: example.color,
              border: `1px solid ${example.color}40`,
            }}
          >
            {isPlaying ? (
              <>
                <Volume2 size={14} className="animate-pulse" />
                Ouvindo...
              </>
            ) : (
              <>
                <Play size={14} />
                Ouvir
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Phonetic Layers — Expandable */}
      <AnimatePresence>
        {showLayers && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/8 pt-4 space-y-3">
              {/* Layer 1: Escrita */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Escrita Real</p>
                  <p className="text-white font-bold truncate">{example.phrase}</p>
                </div>
                <span className="text-xs text-gray-600">Orthography</span>
              </div>

              {/* Layer 2: Fonetica simplificada */}
              <div
                className="flex items-center gap-3 p-3 rounded-xl border"
                style={{ background: `${example.color}08`, borderColor: `${example.color}30` }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${example.color}25`, color: example.color }}
                >
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Pronuncia Simplificada</p>
                  <p className="font-bold font-mono truncate" style={{ color: example.color }}>
                    {example.phonetic}
                  </p>
                </div>
                <span className="text-xs text-gray-600">Simplified</span>
              </div>

              {/* Layer 3: IPA */}
              <div
                className="flex items-center gap-3 p-3 rounded-xl border"
                style={{ background: "rgba(0,212,170,0.06)", borderColor: "rgba(0,212,170,0.25)" }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "rgba(0,212,170,0.2)", color: "#00d4aa" }}
                >
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">IPA Tecnico</p>
                  <p className="text-teal-400 font-bold font-mono truncate">{example.ipa}</p>
                </div>
                <span className="text-xs text-gray-600">Advanced</span>
              </div>

              {/* Real speech tip */}
              {example.realSpeech && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/8 border border-yellow-500/20">
                  <span className="text-yellow-400 text-sm flex-shrink-0">💡</span>
                  <p className="text-yellow-300/80 text-xs leading-relaxed">{example.realSpeech}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 pt-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${example.color}, #7b2fff)` }}
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  Praticar com Terra
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium text-gray-300 border border-white/15 bg-white/5 hover:bg-white/8 transition-all"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  Adicionar ao Glossario
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AudioExamplesSection() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? AUDIO_EXAMPLES
      : AUDIO_EXAMPLES.filter((e) => e.category === activeCategory);

  return (
    <section id="exemplos" className="py-24 bg-black relative overflow-hidden">
      {/* BG accent */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,153,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-400 mb-4">
            🔊 Exemplos com Audio e Texto
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Como o idioma{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0099ff, #00d4aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              realmente soa
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Clique em qualquer exemplo para ver as 3 camadas: escrita, pronuncia simplificada e IPA tecnico. Ouça e pratique com a Terra.
          </p>
        </motion.div>

        {/* 3 layers legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { num: "1", label: "Escrita Real", sublabel: "Como se escreve", bg: "rgba(255,255,255,0.08)", color: "#fff" },
            { num: "2", label: "Fonetica Simplificada", sublabel: "Como se fala", bg: "rgba(0,153,255,0.15)", color: "#0099ff" },
            { num: "3", label: "IPA Tecnico", sublabel: "Avancado / preciso", bg: "rgba(0,212,170,0.15)", color: "#00d4aa" },
          ].map((layer) => (
            <div
              key={layer.num}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10"
              style={{ background: layer.bg }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                style={{ background: `${layer.color}25`, color: layer.color }}
              >
                {layer.num}
              </span>
              <div>
                <p className="text-xs font-semibold" style={{ color: layer.color }}>
                  {layer.label}
                </p>
                <p className="text-xs text-gray-600">{layer.sublabel}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
              style={{
                background: activeCategory === cat ? "#0099ff" : "rgba(255,255,255,0.05)",
                borderColor: activeCategory === cat ? "#0099ff" : "rgba(255,255,255,0.1)",
                color: activeCategory === cat ? "#fff" : "#9ca3af",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((ex, i) => (
              <AudioCard key={ex.id} example={ex} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Tip callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 rounded-2xl border border-white/8"
          style={{ background: "linear-gradient(135deg, rgba(0,153,255,0.06), rgba(123,47,255,0.06))" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-4xl flex-shrink-0">🎭</div>
            <div className="flex-1">
              <h4 className="text-white font-black text-lg mb-1">
                Modo "Boca do Idioma" — Proximo Nivel
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                O sistema mostrara a posicao da boca, o som da lingua e comparara com o erro do usuario.
                Tipo: <em className="text-white">"seu som esta muito fechado, abre mais a boca"</em> — nivel fonoaudiologia + IA.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector("#terra")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-white font-semibold text-sm whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
            >
              Praticar com Terra
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
