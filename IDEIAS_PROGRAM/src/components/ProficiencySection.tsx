import { motion } from "framer-motion";
import { PROFICIENCY_LEVELS } from "@/data/languages";

export default function ProficiencySection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(123,47,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs text-purple-400 mb-4">
            📊 Niveis de Proficiencia
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Do A1 ao C2 —
            <span
              className="ml-2"
              style={{ background: "linear-gradient(135deg, #7b2fff, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              sua jornada
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sistema baseado no Quadro Europeu Comum de Referencia. Cada nivel com conteudo, avaliacoes e dinamicas proprias.
          </p>
        </motion.div>

        {/* Level progression */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {PROFICIENCY_LEVELS.map((level, i) => (
            <motion.div
              key={level.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-5 rounded-2xl border text-center cursor-pointer transition-all duration-300"
              style={{ background: `${level.color}08`, borderColor: `${level.color}30` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl font-black"
                style={{ background: `${level.color}20`, color: level.color, border: `2px solid ${level.color}40` }}
              >
                {level.code}
              </div>
              <p className="text-white font-bold text-sm mb-1">{level.name}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{level.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Evaluation system */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-white/3"
          >
            <h3 className="text-white font-black text-xl mb-6">🎙️ Avaliacao de Audio</h3>
            <div className="space-y-4">
              {[
                { label: "Reconhecimento por palavra", color: "#0099ff" },
                { label: "Analise de silaba", color: "#7b2fff" },
                { label: "Entonacao e ritmo", color: "#ff6b9d" },
                { label: "Sotaque aceitavel vs problematico", color: "#ff6b35" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <p className="text-gray-300 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl" style={{ background: "rgba(0,153,255,0.08)", border: "1px solid rgba(0,153,255,0.2)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Nota minima de aprovacao</span>
                <span className="text-white font-black text-xl" style={{ color: "#0099ff" }}>80%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full" style={{ background: "linear-gradient(90deg, #0099ff, #7b2fff)" }} />
              </div>
              <p className="text-gray-500 text-xs mt-2">Abaixo de 80%: refazer com orientacao da Terra</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-white/3"
          >
            <h3 className="text-white font-black text-xl mb-6">📊 Analise de Evolucao</h3>
            {/* Fake progress chart */}
            <div className="space-y-4">
              {[
                { label: "Pronuncia", value: 72, color: "#0099ff" },
                { label: "Fluencia", value: 58, color: "#7b2fff" },
                { label: "Vocabulario", value: 84, color: "#00d4aa" },
                { label: "Gramatica", value: 65, color: "#ff6b35" },
                { label: "Confianca", value: 70, color: "#ff6b9d" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-gray-400 text-sm">{metric.label}</span>
                    <span className="text-white text-sm font-bold">{metric.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: metric.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-4">* Dados de progresso de exemplo</p>
          </motion.div>
        </div>

        {/* Evaluation types */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🎯", title: "Avaliacao por Exercicio", desc: "Nota imediata apos cada atividade com sugestao natural" },
            { icon: "🏁", title: "Avaliacao de Modulo", desc: "Teste final do modulo com revisao completa do conteudo" },
            { icon: "🏆", title: "Teste de Proficiencia", desc: "Avaliacao global para certificar seu nivel A1-C2" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/8 bg-white/3 text-center"
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
