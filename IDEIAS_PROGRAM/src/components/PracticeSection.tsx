import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXERCISES } from "@/data/languages";
import {CheckCircle, XCircle, RotateCcw, Zap, Timer} from 'lucide-react';

const DIFFICULTY_COLORS = {
  Iniciante: "#00d4aa",
  Intermediario: "#0099ff",
  Avancado: "#ff6b35",
};

const TYPE_LABELS: Record<string, string> = {
  listening: "Escuta",
  speaking: "Fala",
  writing: "Escrita",
  conversation: "Conversa",
};

const TYPE_COLORS: Record<string, string> = {
  listening: "#0099ff",
  speaking: "#7b2fff",
  writing: "#00d4aa",
  conversation: "#ff6b35",
};

// ── Word Builder Demo ──────────────────────────────────────
function WordBuilderDemo() {
  const sentences = [
    {
      words: ["I", "went", "to", "the", "market", "yesterday"],
      translation: "Fui ao mercado ontem",
      extras: ["go", "going"],
    },
    {
      words: ["She", "is", "learning", "Japanese", "every", "day"],
      translation: "Ela aprende japonês todos os dias",
      extras: ["learn", "learned"],
    },
    {
      words: ["We", "need", "to", "practice", "speaking", "more"],
      translation: "Precisamos praticar falar mais",
      extras: ["speak", "spoken"],
    },
  ];

  const [sentenceIdx, setSentenceIdx] = useState(0);
  const current = sentences[sentenceIdx];
  const allWords = [...current.words, ...current.extras].sort(() => Math.random() - 0.5);
  const [available, setAvailable] = useState(allWords);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<null | "correct" | "wrong">(null);

  const addWord = (word: string, idx: number) => {
    setSelected((prev) => [...prev, word]);
    setAvailable((prev) => prev.filter((_, i) => i !== idx));
    setResult(null);
  };

  const removeWord = (idx: number) => {
    const word = selected[idx];
    setAvailable((prev) => [...prev, word]);
    setSelected((prev) => prev.filter((_, i) => i !== idx));
    setResult(null);
  };

  const checkAnswer = () => {
    setResult(selected.join(" ") === current.words.join(" ") ? "correct" : "wrong");
  };

  const reset = () => {
    const fresh = [...current.words, ...current.extras].sort(() => Math.random() - 0.5);
    setAvailable(fresh);
    setSelected([]);
    setResult(null);
  };

  const nextSentence = () => {
    const next = (sentenceIdx + 1) % sentences.length;
    setSentenceIdx(next);
    const s = sentences[next];
    const fresh = [...s.words, ...s.extras].sort(() => Math.random() - 0.5);
    setAvailable(fresh);
    setSelected([]);
    setResult(null);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.025)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧩</span>
          <div>
            <p className="text-white font-bold text-sm">Word Builder</p>
            <p className="text-gray-500 text-xs">Monte a frase em inglês</p>
          </div>
        </div>
        <span className="text-xs text-gray-600 font-mono">{sentenceIdx + 1}/{sentences.length}</span>
      </div>

      <p className="text-gray-300 text-sm mb-3">
        Tradução: <em className="text-gray-400">"{current.translation}"</em>
      </p>

      {/* Sentence area */}
      <div
        className="min-h-12 p-3 rounded-xl border border-white/10 flex flex-wrap gap-2 mb-4"
        style={{ background: "rgba(0,0,0,0.4)" }}
      >
        {selected.length === 0 ? (
          <span className="text-gray-600 text-sm">Clique nas palavras abaixo...</span>
        ) : (
          selected.map((w, i) => (
            <motion.button
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => removeWord(i)}
              className="px-3 py-1 rounded-lg text-sm font-medium text-white hover:opacity-70 transition-opacity"
              style={{ background: "rgba(0,153,255,0.3)", border: "1px solid rgba(0,153,255,0.5)" }}
            >
              {w}
            </motion.button>
          ))
        )}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 mb-5">
        {available.map((w, i) => (
          <motion.button
            key={`${w}-${i}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addWord(w, i)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white border border-white/15 hover:bg-white/10 transition-all"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {w}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={checkAnswer}
          disabled={selected.length === 0}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
        >
          Verificar
        </motion.button>
        <button
          onClick={reset}
          className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white border border-white/10 hover:bg-white/8 transition-all flex items-center gap-1.5"
        >
          <RotateCcw size={13} /> Resetar
        </button>
        {result === "correct" && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={nextSentence}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #00d4aa, #0099ff)" }}
          >
            Próxima →
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
              result === "correct"
                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                : "bg-red-500/15 text-red-400 border border-red-500/30"
            }`}
          >
            {result === "correct" ? (
              <><CheckCircle size={15} /> Perfeito! Nota: 100/100</>
            ) : (
              <><XCircle size={15} /> Quase! Verifique a ordem. "Respira, vai de novo!"</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Smart Fill Demo ────────────────────────────────────────
function SmartFillDemo() {
  const questions = [
    {
      sentence: "I ___ to the store yesterday",
      options: ["go", "went", "going", "gone"],
      correct: "went",
      explanation: "'Went' é o passado simples de 'go'. Use para ações completas no passado.",
    },
    {
      sentence: "She ___ studying Japanese for two years",
      options: ["is", "has been", "was", "were"],
      correct: "has been",
      explanation: "'Has been' indica ação que começou no passado e continua até hoje.",
    },
    {
      sentence: "Mucho ___ conocerte",
      options: ["gusto", "gusta", "gustan", "gustas"],
      correct: "gusto",
      explanation: "'Mucho gusto' = 'muito prazer'. 'Gusto' concorda com o sujeito implícito 'me'.",
    },
  ];

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const q = questions[qIdx];

  const choose = (opt: string) => {
    if (selected) return;
    setSelected(opt);
  };

  const next = () => {
    setQIdx((prev) => (prev + 1) % questions.length);
    setSelected(null);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.025)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <div>
            <p className="text-white font-bold text-sm">Smart Fill</p>
            <p className="text-gray-500 text-xs">Preencha o espaço correto</p>
          </div>
        </div>
        <span className="text-xs text-gray-600 font-mono">{qIdx + 1}/{questions.length}</span>
      </div>

      <p className="text-white text-lg font-bold mb-5 leading-relaxed">
        {q.sentence.replace("___", selected ? (
          `[${selected}]`
        ) : "___")}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {q.options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = selected && opt === q.correct;
          const isWrong = isSelected && opt !== q.correct;

          return (
            <motion.button
              key={opt}
              whileHover={!selected ? { scale: 1.02 } : {}}
              whileTap={!selected ? { scale: 0.98 } : {}}
              onClick={() => choose(opt)}
              className="py-3 px-4 rounded-xl text-sm font-bold transition-all border text-left"
              style={{
                background: isCorrect
                  ? "rgba(0,212,170,0.15)"
                  : isWrong
                  ? "rgba(255,68,68,0.15)"
                  : "rgba(255,255,255,0.05)",
                borderColor: isCorrect
                  ? "rgba(0,212,170,0.5)"
                  : isWrong
                  ? "rgba(255,68,68,0.5)"
                  : "rgba(255,255,255,0.1)",
                color: isCorrect ? "#00d4aa" : isWrong ? "#ff4444" : "#d1d5db",
                cursor: selected ? "default" : "pointer",
              }}
            >
              {opt}
              {isCorrect && " ✓"}
              {isWrong && " ✗"}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="p-3 rounded-xl text-xs leading-relaxed mb-3"
              style={{
                background: selected === q.correct ? "rgba(0,212,170,0.08)" : "rgba(0,153,255,0.08)",
                border: `1px solid ${selected === q.correct ? "rgba(0,212,170,0.3)" : "rgba(0,153,255,0.3)"}`,
                color: selected === q.correct ? "#00d4aa" : "#60a5fa",
              }}
            >
              💡 {q.explanation}
            </div>
            <button
              onClick={next}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white w-full"
              style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
            >
              Próxima pergunta →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Fix the Sentence Demo ──────────────────────────────────
function FixSentenceDemo() {
  const sentences = [
    { wrong: "I goed to the store", correct: "I went to the store", hint: "O passado de 'go' é irregular!" },
    { wrong: "She don't like coffee", correct: "She doesn't like coffee", hint: "3ª pessoa usa 'doesn't', não 'don't'." },
    { wrong: "Yesterday I am very tired", correct: "Yesterday I was very tired", hint: "Com 'yesterday', use o passado: 'was'." },
  ];

  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const s = sentences[idx];

  const isCorrect =
    value.trim().toLowerCase() === s.correct.toLowerCase();

  const check = () => {
    if (!value.trim()) return;
    setChecked(true);
  };

  const next = () => {
    setIdx((prev) => (prev + 1) % sentences.length);
    setValue("");
    setChecked(false);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.025)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔧</span>
          <div>
            <p className="text-white font-bold text-sm">Corrigir a Frase</p>
            <p className="text-gray-500 text-xs">Digite a forma correta</p>
          </div>
        </div>
        <span className="text-xs text-gray-600 font-mono">{idx + 1}/{sentences.length}</span>
      </div>

      <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/8 mb-4">
        <p className="text-xs text-red-400 uppercase tracking-wider mb-1 font-bold">Frase com erro:</p>
        <p className="text-white font-bold">{s.wrong}</p>
      </div>

      <input
        value={value}
        onChange={(e) => { setValue(e.target.value); setChecked(false); }}
        onKeyDown={(e) => e.key === "Enter" && check()}
        placeholder="Digite a correção..."
        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all mb-3"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: checked
            ? isCorrect
              ? "1px solid rgba(0,212,170,0.5)"
              : "1px solid rgba(255,68,68,0.5)"
            : "1px solid rgba(255,255,255,0.1)",
        }}
      />

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={check}
          disabled={!value.trim()}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
        >
          Verificar
        </motion.button>
        <button
          onClick={() => { setValue(""); setChecked(false); }}
          className="px-4 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:bg-white/8 transition-all"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 p-3 rounded-xl text-xs ${
              isCorrect
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : "bg-orange-500/10 border border-orange-500/30 text-orange-300"
            }`}
          >
            {isCorrect ? (
              <span>✅ Perfeito! "{s.correct}"</span>
            ) : (
              <div>
                <p>💡 {s.hint}</p>
                <p className="mt-1">Resposta: <strong className="text-white">{s.correct}</strong></p>
                <button onClick={next} className="mt-2 text-orange-400 underline text-xs">
                  Próxima →
                </button>
              </div>
            )}
            {isCorrect && (
              <button onClick={next} className="ml-2 text-green-400 underline">
                Próxima →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Shadowing Timer Demo ───────────────────────────────────
function ShadowingDemo() {
  const phrases = [
    { phrase: "What are you doing tonight?", phonetic: "whatcha doin tunait?", lang: "Inglês 🇺🇸" },
    { phrase: "Mucho gusto en conocerte", phonetic: "mu-cho gus-to en co-no-ser-te", lang: "Espanhol 🇪🇸" },
    { phrase: "Konnichiwa gozaimasu", phonetic: "kon-ni-chi-ua go-za-i-mas", lang: "Japonês 🇯🇵" },
  ];

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"ready" | "listen" | "shadow" | "done">("ready");
  const [countdown, setCountdown] = useState(3);

  const startRound = () => {
    setPhase("listen");
    setCountdown(3);

    let c = 3;
    const interval = setInterval(() => {
      c--;
      setCountdown(c);
      if (c === 0) {
        clearInterval(interval);
        setPhase("shadow");
        let sc = 3;
        setCountdown(3);
        const shadowInterval = setInterval(() => {
          sc--;
          setCountdown(sc);
          if (sc === 0) {
            clearInterval(shadowInterval);
            setPhase("done");
          }
        }, 1000);
      }
    }, 1000);
  };

  const next = () => {
    setIdx((prev) => (prev + 1) % phrases.length);
    setPhase("ready");
    setCountdown(3);
  };

  const p = phrases[idx];

  return (
    <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.025)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎤</span>
          <div>
            <p className="text-white font-bold text-sm">Shadowing — Eco de Pronúncia</p>
            <p className="text-gray-500 text-xs">{p.lang}</p>
          </div>
        </div>
        <Zap size={14} className="text-yellow-400" />
      </div>

      <div className="text-center py-6">
        <p className="text-white font-black text-xl mb-2">{p.phrase}</p>
        <p className="text-cyan-400 font-mono text-sm">{p.phonetic}</p>

        {phase === "listen" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <p className="text-blue-400 text-sm font-bold mb-2">🔊 Ouça com atenção...</p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-blue-400"
                  animate={{ height: [4, 8 + Math.random() * 20, 4] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.06 }}
                />
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-2 font-mono">{countdown}s</p>
          </motion.div>
        )}

        {phase === "shadow" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-pink-400 text-sm font-bold mb-2">🎤 Agora repita imediatamente!</p>
            <motion.div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border-2 border-pink-400"
              animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px #ff6b9d", "0 0 20px #ff6b9d", "0 0 0px #ff6b9d"] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <span className="text-pink-400 font-black text-2xl">{countdown}</span>
            </motion.div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <p className="text-green-400 font-bold mb-3">✅ Ótimo treino de eco!</p>
            <button
              onClick={next}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #00d4aa, #0099ff)" }}
            >
              Próxima frase →
            </button>
          </motion.div>
        )}

        {phase === "ready" && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={startRound}
            className="mt-6 px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2 mx-auto"
            style={{ background: "linear-gradient(135deg, #0099ff, #7b2fff)" }}
          >
            <Timer size={14} /> Iniciar Shadowing
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default function PracticeSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeDemo, setActiveDemo] = useState<"wordbuilder" | "smartfill" | "fix" | "shadow">("wordbuilder");
  const filters = ["all", "listening", "speaking", "writing", "conversation"];

  const filtered = activeFilter === "all" ? EXERCISES : EXERCISES.filter((e) => e.type === activeFilter);

  const demos = [
    { id: "wordbuilder" as const, label: "🧩 Word Builder", desc: "Monte frases" },
    { id: "smartfill" as const, label: "🧠 Smart Fill", desc: "Escolha o correto" },
    { id: "fix" as const, label: "🔧 Corrigir Frase", desc: "Ache o erro" },
    { id: "shadow" as const, label: "🎤 Shadowing", desc: "Repita em eco" },
  ];

  return (
    <section id="pratica" className="py-24 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(0,153,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-4">
            🎯 17 Dinâmicas de Treino
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Dinâmicas que forçam
            <span
              className="block mt-1"
              style={{ background: "linear-gradient(135deg, #0099ff, #ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              o cérebro a produzir
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            "Se o usuário não está montando, errando e reconstruindo frases, ele não está aprendendo."
          </p>
        </motion.div>

        {/* Demo selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {demos.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDemo(d.id)}
                className="px-4 py-2.5 rounded-full text-sm font-medium transition-all border flex items-center gap-1.5"
                style={{
                  background: activeDemo === d.id ? "rgba(0,153,255,0.15)" : "rgba(255,255,255,0.04)",
                  borderColor: activeDemo === d.id ? "rgba(0,153,255,0.5)" : "rgba(255,255,255,0.1)",
                  color: activeDemo === d.id ? "#60a5fa" : "#9ca3af",
                }}
              >
                {d.label}
                <span className="text-xs opacity-60 hidden sm:inline">· {d.desc}</span>
              </button>
            ))}
          </div>

          {/* Active demo */}
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {activeDemo === "wordbuilder" && <WordBuilderDemo />}
                {activeDemo === "smartfill" && <SmartFillDemo />}
                {activeDemo === "fix" && <FixSentenceDemo />}
                {activeDemo === "shadow" && <ShadowingDemo />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 mt-16">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
              style={{
                background: activeFilter === f ? (f === "all" ? "#0099ff" : TYPE_COLORS[f]) : "rgba(255,255,255,0.05)",
                borderColor: activeFilter === f ? "transparent" : "rgba(255,255,255,0.1)",
                color: activeFilter === f ? "#fff" : "#9ca3af",
              }}
            >
              {f === "all" ? "Todos" : TYPE_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Exercises grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{ex.icon}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    color: DIFFICULTY_COLORS[ex.difficulty],
                    background: `${DIFFICULTY_COLORS[ex.difficulty]}15`,
                    border: `1px solid ${DIFFICULTY_COLORS[ex.difficulty]}40`,
                  }}
                >
                  {ex.difficulty}
                </span>
              </div>
              <h4 className="text-white font-bold mb-0.5">{ex.title}</h4>
              <p className="text-gray-500 text-xs mb-2">{ex.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{ex.description}</p>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: TYPE_COLORS[ex.type] }} />
                <span className="text-xs text-gray-600">{TYPE_LABELS[ex.type]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gamification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "⭐", label: "XP por consistência", desc: "Prática diária gera bônus" },
            { icon: "🎯", label: "XP por precisão", desc: "Notas acima de 90%" },
            { icon: "📈", label: "XP por evolução", desc: "Progresso de pronúncia" },
            { icon: "🔓", label: "Desbloqueios", desc: "Novos cenários e estilos" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl border border-white/8 bg-white/3 text-center">
              <span className="text-2xl block mb-2">{item.icon}</span>
              <p className="text-white text-sm font-bold mb-1">{item.label}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
