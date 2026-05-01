import { useState } from "react";
import { motion } from "framer-motion";
import { MODULES } from "@/data/languages";

const PRACTICE_MODES = [
  {
    id: "listening",
    icon: "\ud83c\udfa7",
    title: "Escuta",
    subtitle: "Listening",
    description: "Ouve frases, repete mentalmente ou responde. Interpretacao de contexto e cultura",
    features: ["Ditado inteligente", "Shadowing mode", "Compreensao fonetica"],
    color: "#0099ff",
  },
  {
    id: "writing",
    icon: "\u270d\ufe0f",
    title: "Escrita",
    subtitle: "Writing",
    description: "Completar frases, traducao contextual nao literal, construcao livre",
    features: ["Smart Fill", "Real Translation", "Fix the Sentence"],
    color: "#00d4aa",
  },
  {
    id: "speaking",
    icon: "\ud83d\udde3\ufe0f",
    title: "Fala",
    subtitle: "Speaking",
    description: "Repeticao guiada, leitura em voz alta, pronuncia por palavra e frase",
    features: ["Eco de pronuncia", "Build & Speak", "Modo imitacao"],
    color: "#7b2fff",
  },
  {
    id: "conversation",
    icon: "\ud83d\udcac",
    title: "Conversa",
    subtitle: "Conversation",
    description: "Conversa com Terra em tempo real. Respostas livres avaliadas por clareza e intencao",
    features: ["Respostas livres", "Avaliacao semantica", "Simulacao emocional"],
    color: "#ff6b35",
  },
];

export default function ModulesSection() {
  const [activeMode, setActiveMode] = useState("conversation");

  const activeData = PRACTICE_MODES.find((m) => m.id === activeMode)!;

  return (
    <section id="modulos" className="py-24 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123,47,255,0.12) 0%, transparent 70%)",
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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-4">
            🧩 Modulos e Modos
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Voce escolhe
            <span
              className="ml-2"
              style={{ background: "linear-gradient(135deg, #7b2fff, #ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              como praticar
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            4 modos de pratica + 5 contextos de uso. Combine ate 3 objetivos no Modo Misto para uma experiencia personalizada.
          </p>
        </motion.div>

        {/* Practice modes selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {PRACTICE_MODES.map((mode) => (
            <motion.button
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveMode(mode.id)}
              className="p-4 rounded-2xl border text-left transition-all duration-300"
              style={{
                background: activeMode === mode.id ? `${mode.color}15` : "rgba(255,255,255,0.03)",
                borderColor: activeMode === mode.id ? `${mode.color}60` : "rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-2xl block mb-2">{mode.icon}</span>
              <p className="text-white font-bold text-sm">{mode.title}</p>
              <p className="text-gray-500 text-xs">{mode.subtitle}</p>
            </motion.button>
          ))}
        </div>

        {/* Active mode detail */}
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border p-8 mb-16"
          style={{
            background: `${activeData.color}08`,
            borderColor: `${activeData.color}30`,
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white mb-2">
                {activeData.icon} Modo {activeData.title}
              </h3>
              <p className="text-gray-300 text-lg mb-4">{activeData.description}</p>
              <div className="flex flex-wrap gap-2">
                {activeData.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full text-sm font-medium border"
                    style={{ color: activeData.color, borderColor: `${activeData.color}40`, background: `${activeData.color}10` }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            {/* Score preview */}
            <div className="flex flex-col items-center p-6 rounded-2xl border bg-white/3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <p className="text-gray-400 text-sm mb-2">Nota de Aprovacao</p>
              <div className="text-5xl font-black" style={{ color: activeData.color }}>80%</div>
              <p className="text-gray-500 text-xs mt-1">Minimo para continuar</p>
              <div className="mt-3 w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: activeData.color }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Context modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ background: `${mod.color}08`, borderColor: `${mod.color}25` }}
            >
              <span className="text-3xl block mb-3">{mod.icon}</span>
              <h4 className="text-white font-bold mb-1">{mod.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{mod.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
