import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Mic, MicOff, Send, Volume2, RefreshCw, Zap, Brain, Globe, Star, MessageSquare, BookOpen, BarChart3, Sparkles} from 'lucide-react';

type TerraState = "idle" | "listening" | "thinking" | "speaking";
type TerraEmotion = "neutral" | "happy" | "encouraging" | "surprised";

interface Message {
  id: number;
  sender: "terra" | "user";
  text: string;
  phonetic?: string;
  score?: number;
  tip?: string;
}

const TERRA_RESPONSES: Array<{
  trigger: string[];
  response: string;
  phonetic?: string;
  tip?: string;
  emotion: TerraEmotion;
}> = [
  {
    trigger: ["ola", "hello", "hi", "hola", "oi", "hey"],
    response: "Olá! Fico feliz em te ver! Eu sou a Terra, sua parceira poliglota do Idiomas Tear's Web. Em qual idioma quer treinar hoje?",
    emotion: "happy",
    tip: "Dica: Comece saudando em outro idioma para já treinar desde o início!",
  },
  {
    trigger: ["ingles", "english", "en", "inglês"],
    response: "Ótimo! Inglês americano ou britânico? Diga: 'American English' ou 'British English' — já é um primeiro treino de pronúncia!",
    phonetic: "Uh-mer-i-ken Ing-glish / Brit-ish Ing-glish",
    emotion: "encouraging",
    tip: "O sotaque americano usa o 'r' mais forte, enquanto o britânico é mais suave.",
  },
  {
    trigger: ["japones", "japanese", "ja", "japonês"],
    response: "Sugoi! Japonês é incrível. Vamos começar com algo básico: diga 'Konnichiwa' — pronúncia: kon-ni-chi-ua. Pode tentar!",
    phonetic: "kon-ni-chi-ua (こんにちは)",
    emotion: "happy",
    tip: "No japonês, cada sílaba tem peso igual — sem ênfase forte em nenhuma parte.",
  },
  {
    trigger: ["espanhol", "spanish", "es", "espãnhol"],
    response: "¡Excelente! Espanhol é lindo. Repita comigo: 'Mucho gusto' — pronúncia: mu-cho gus-to. Significa 'muito prazer'!",
    phonetic: "mu-cho gus-to",
    emotion: "happy",
    tip: "O 'ch' espanhol soa como o 'tch' em português. Pratique devagar primeiro!",
  },
  {
    trigger: ["frances", "french", "fr", "francês"],
    response: "Magnifique! Francês é muito elegante. Tente: 'Bonjour' — pronúncia: bon-jur. Atenção ao nasal 'on'!",
    phonetic: "bõ-jur",
    emotion: "encouraging",
    tip: "O nasal francês 'on' sai pelo nariz. Imagine cheirar algo enquanto fala!",
  },
  {
    trigger: ["alemao", "german", "de", "alemão"],
    response: "Wunderbar! Alemão tem sons únicos. Tente: 'Guten Tag' — pronúncia: gu-ten tag. Significa 'bom dia'!",
    phonetic: "gu-ten tag",
    emotion: "happy",
    tip: "O 'G' alemão é sempre forte, como em 'gato'. Nunca como 'gelo' em português!",
  },
  {
    trigger: ["coreano", "korean", "ko"],
    response: "Annyeong! Coreano é fascinante. Comece com: '안녕하세요' — pronúncia: an-nyeong-ha-se-yo. Seja gentil com as sílabas!",
    phonetic: "an-nyeong-ha-se-yo",
    emotion: "happy",
    tip: "Coreano tem 14 consoantes e 10 vogais básicas. O alfabeto Hangul é muito lógico!",
  },
  {
    trigger: ["errei", "errou", "errado", "nao consegui", "difícil", "dificil"],
    response: "Respira... vai de novo com calma. Errar é parte do processo! Cada erro é seu cérebro ajustando os circuitos. Você consegue!",
    emotion: "encouraging",
    tip: "Pesquisas mostram que errar ativa mais neurônios do que acertar. Continue!",
  },
  {
    trigger: ["consegui", "acertei", "certo", "correto", "perfeito", "ótimo"],
    response: "Incrível! Você acertou! Isso é o seu cérebro criando conexões reais no idioma. Continue assim — a fluência vem com repetição!",
    emotion: "happy",
    tip: "Celebre cada acerto. O reforço positivo acelera o aprendizado!",
  },
  {
    trigger: ["pronuncia", "pronúncia", "pronounce", "falar", "como fala"],
    response: "A pronúncia tem 3 camadas: ① escrita real, ② fonética simplificada, ③ IPA técnico. Iniciantes: fonética + áudio. Avançados: só contexto. Qual o seu nível?",
    emotion: "neutral",
    tip: "A fonética simplificada é o mapa — o áudio é o território real!",
  },
  {
    trigger: ["nivel", "nível", "level", "a1", "a2", "b1", "b2", "c1", "c2"],
    response: "Os níveis vão de A1 (iniciante absoluto) até C2 (fluente nativo). Cada nível tem módulos de escuta, escrita, fala e conversa. Onde você se encaixa?",
    emotion: "neutral",
    tip: "Não se subestime! Muitos acham que estão em A2 mas já são B1.",
  },
  {
    trigger: ["terra", "quem é", "quem e", "voce", "você"],
    response: "Sou a Terra! Brasileira, jovem adulta, poliglota do Tear's Studios Universe. Falo mais de 13 idiomas e estou aqui para ser sua parceira de prática — sem julgamentos!",
    emotion: "happy",
    tip: "Posso praticar Inglês, Espanhol, Francês, Alemão, Japonês, Coreano, Italiano, Grego, Russo e mais!",
  },
  {
    trigger: ["italiano", "italian", "it"],
    response: "Bellissimo! Italiano é música. Tente: 'Ciao, come stai?' — pronúncia: chau, co-me sta-i. Significa 'Oi, como vai?'!",
    phonetic: "chau, co-me sta-i",
    emotion: "happy",
    tip: "Italiano é muito parecido com português! As vogais soam quase igual.",
  },
  {
    trigger: ["russo", "russian", "ru"],
    response: "Privet! Russo parece difícil mas tem uma lógica própria. Comece com: 'Spasibo' — pronúncia: spa-si-ba. Significa 'obrigado'!",
    phonetic: "spa-si-ba (спасибо)",
    emotion: "encouraging",
    tip: "O alfabeto cirílico tem 33 letras — mas muitas soam como o nosso alfabeto!",
  },
  {
    trigger: ["grego", "greek", "gr"],
    response: "Yassas! Grego é fascinante, é uma das línguas mais antigas do mundo. Comece com: 'Efcharisto' — pronúncia: ef-kha-ri-sto. Significa 'obrigado'!",
    phonetic: "ef-kha-ri-sto (ευχαριστώ)",
    emotion: "happy",
    tip: "O grego moderno tem muito do grego antigo. Cada palavra é uma viagem no tempo!",
  },
  {
    trigger: ["chines", "mandarin", "zh", "chinês", "mandarim"],
    response: "Nǐ hǎo! Mandarim é tonal — a mesma sílaba com tons diferentes tem significados totalmente diferentes! 'Mā' (mãe), 'má' (cânhamo), 'mǎ' (cavalo), 'mà' (xingar).",
    phonetic: "Ni hao (你好)",
    emotion: "surprising" as TerraEmotion,
    tip: "Mandarim tem 4 tons + 1 neutro. Treinar os tons desde o início é fundamental!",
  },
];

const DEFAULT_RESPONSE = {
  text: "Interessante! Posso te ajudar com pronúncia, vocabulário, gramática ou conversação. O que prefere praticar agora no Idiomas Tear's Web?",
  emotion: "neutral" as TerraEmotion,
  tip: "Experimente digitar um idioma como 'inglês', 'japonês' ou 'espanhol' para começar!",
};

function getResponse(input: string) {
  const lower = input.toLowerCase();
  const match = TERRA_RESPONSES.find((r) => r.trigger.some((t) => lower.includes(t)));
  if (match) return { text: match.response, phonetic: match.phonetic, emotion: match.emotion, tip: match.tip };
  return { text: DEFAULT_RESPONSE.text, emotion: DEFAULT_RESPONSE.emotion, tip: DEFAULT_RESPONSE.tip };
}

const STATE_CONFIG = {
  idle: {
    label: "Pronta para praticar",
    color: "#00e5ff",
    icon: "✦",
    pulse: true,
  },
  listening: {
    label: "Ouvindo você...",
    color: "#00ffb3",
    icon: "◉",
    pulse: true,
  },
  thinking: {
    label: "Analisando...",
    color: "#a855f7",
    icon: "◌",
    pulse: true,
  },
  speaking: {
    label: "Respondendo...",
    color: "#ff6b9d",
    icon: "▶",
    pulse: true,
  },
};

const QUICK_ACTIONS = [
  { label: "🇺🇸 Inglês", value: "inglês" },
  { label: "🇯🇵 Japonês", value: "japonês" },
  { label: "🇪🇸 Espanhol", value: "espanhol" },
  { label: "🇫🇷 Francês", value: "francês" },
  { label: "🇩🇪 Alemão", value: "alemão" },
  { label: "🇰🇷 Coreano", value: "coreano" },
  { label: "🇮🇹 Italiano", value: "italiano" },
  { label: "🇷🇺 Russo", value: "russo" },
  { label: "🇬🇷 Grego", value: "grego" },
  { label: "❓ Pronúncia", value: "pronúncia" },
  { label: "📊 Níveis", value: "nível" },
  { label: "🌍 Quem é Terra?", value: "quem é você" },
];

// Visualizador de estado animado (substitui o SVG mecha)
function TerraStateVisualizer({ state }: { state: TerraState }) {
  const cfg = STATE_CONFIG[state];

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ height: 180 }}>
      {/* Rings orbitais */}
      {[80, 110, 140].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `${cfg.color}${i === 0 ? "40" : i === 1 ? "25" : "15"}`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Núcleo central */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: 64,
          height: 64,
          background: `radial-gradient(circle, ${cfg.color}30 0%, ${cfg.color}08 100%)`,
          border: `2px solid ${cfg.color}60`,
          boxShadow: `0 0 30px ${cfg.color}30, 0 0 60px ${cfg.color}10`,
        }}
        animate={{
          scale: state === "speaking" ? [1, 1.15, 1, 1.1, 1] : state === "listening" ? [1, 1.08, 1] : [1, 1.04, 1],
          boxShadow: [
            `0 0 20px ${cfg.color}20`,
            `0 0 40px ${cfg.color}40`,
            `0 0 20px ${cfg.color}20`,
          ],
        }}
        transition={{
          duration: state === "speaking" ? 0.4 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-2xl font-black" style={{ color: cfg.color }}>
          T
        </span>
      </motion.div>

      {/* Partículas */}
      {state !== "idle" &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              background: cfg.color,
              boxShadow: `0 0 6px ${cfg.color}`,
            }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 55],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 55],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Ondas de áudio (speaking / listening) */}
      {(state === "speaking" || state === "listening") && (
        <div className="absolute flex items-center gap-0.5" style={{ bottom: 16 }}>
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{ width: 3, background: cfg.color, minHeight: 3 }}
              animate={{
                height: [3, 6 + Math.random() * 18, 3],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.5 + i * 0.04,
                repeat: Infinity,
                delay: i * 0.06,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TerraSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: "terra",
      text: "Olá! Eu sou a Terra, sua parceira poliglota do Idiomas Tear's Web! Estou pronta para praticar com você. Qual idioma quer explorar hoje?",
      tip: "Dica: Clique nos botões rápidos abaixo ou escreva um idioma para começar!",
    },
  ]);
  const [input, setInput] = useState("");
  const [terraState, setTerraState] = useState<TerraState>("idle");
  const [emotion, setEmotion] = useState<TerraEmotion>("happy");
  const [isRecording, setIsRecording] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: idCounter.current++, sender: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTerraState("thinking");
    setEmotion("neutral");

    setTimeout(() => {
      const res = getResponse(text);
      setTerraState("speaking");
      setEmotion(res.emotion);
      const terraMsg: Message = {
        id: idCounter.current++,
        sender: "terra",
        text: res.text,
        phonetic: res.phonetic,
        tip: res.tip,
      };
      setMessages((prev) => [...prev, terraMsg]);
      setTimeout(() => setTerraState("idle"), 2800);
    }, 1200);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setTerraState("thinking");
      setTimeout(() => {
        sendMessage("Estou tentando praticar minha pronúncia! Como estou indo?");
      }, 800);
    } else {
      setIsRecording(true);
      setTerraState("listening");
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 0,
      sender: "terra",
      text: "Chat reiniciado! Vamos começar de novo no Idiomas Tear's Web. Qual idioma quer praticar?",
      tip: "Posso ajudar com mais de 13 idiomas diferentes!",
    }]);
    idCounter.current = 1;
    setTerraState("idle");
    setEmotion("happy");
    inputRef.current?.focus();
  };

  const cfg = STATE_CONFIG[terraState];

  return (
    <section id="terra" className="py-24 bg-black relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 30% 50%, rgba(0,200,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 70% 50%, rgba(255,107,157,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,200,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold mb-5"
            style={{
              borderColor: "rgba(255,107,157,0.4)",
              background: "rgba(255,107,157,0.08)",
              color: "#ff6b9d",
            }}
            animate={{ boxShadow: ["0 0 0px rgba(255,107,157,0)", "0 0 16px rgba(255,107,157,0.3)", "0 0 0px rgba(255,107,157,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Zap size={12} /> PARCEIRA POLIGLOTA IA • IDIOMAS TEAR'S WEB
          </motion.span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Conheça a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00e5ff, #ff6b9d, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Terra
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Brasileira, jovem adulta, poliglota do{" "}
            <strong className="text-white">Tear's Studios Universe</strong>.
            Fluente em 13+ idiomas — sem robotice, pura presença.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* ── Terra Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            {/* Status card */}
            <div
              className="rounded-3xl border border-white/10 overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(0,200,255,0.06), rgba(168,85,247,0.04), rgba(255,107,157,0.04))",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top bar */}
              <div className="w-full px-5 pt-5 pb-3 border-b border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: cfg.color }}
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <span className="text-white text-sm font-bold">Terra</span>
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: cfg.color, borderColor: `${cfg.color}40`, background: `${cfg.color}10` }}
                >
                  {cfg.icon} {cfg.label}
                </span>
              </div>

              {/* State visualizer */}
              <div className="py-4 px-4 flex justify-center">
                <TerraStateVisualizer state={terraState} />
              </div>

              {/* Terra info */}
              <div className="px-5 pb-5">
                <div className="text-center mb-4">
                  <p className="text-white font-black text-xl tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>TERRA</p>
                  <p className="text-gray-500 text-xs mt-0.5 font-mono tracking-widest">POLIGLOTA • TEAR'S STUDIOS UNIVERSE</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Idiomas", value: "13+" },
                    { label: "Nível", value: "C2" },
                    { label: "Módulos", value: "4" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-2.5 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <p className="text-white font-bold text-sm">{stat.value}</p>
                      <p className="text-gray-600 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Capabilities */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: "🎙️", label: "Avalia pronúncia" },
                    { icon: "✍️", label: "Corrige escrita" },
                    { icon: "💬", label: "Conversa livre" },
                    { icon: "📊", label: "Notas 0–100" },
                  ].map((cap) => (
                    <div
                      key={cap.label}
                      className="flex items-center gap-2 p-2.5 rounded-xl transition-all"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span className="text-sm">{cap.icon}</span>
                      <span className="text-gray-400 text-xs font-medium">{cap.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Philosophy card */}
            <div
              className="rounded-2xl border border-white/8 p-5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Filosofia</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic">
                "Idioma não se estuda. Se vive. Se tropeça. Se repete até soar natural."
              </p>
              <div className="mt-3 h-px" style={{ background: "linear-gradient(90deg, #00e5ff30, transparent)" }} />
              <p className="text-gray-600 text-xs mt-2">— Idiomas Tear's Web</p>
            </div>

            {/* Features cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <MessageSquare size={16} />, label: "Conversa Real", color: "#00e5ff" },
                { icon: <BookOpen size={16} />, label: "3 Camadas Fonéticas", color: "#ff6b9d" },
                { icon: <BarChart3 size={16} />, label: "Avaliação A1–C2", color: "#a855f7" },
                { icon: <Globe size={16} />, label: "13+ Idiomas", color: "#ffd700" },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-3 rounded-2xl border border-white/8 flex flex-col gap-2 cursor-default"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span style={{ color: feat.color }}>{feat.icon}</span>
                  <span className="text-gray-400 text-xs font-medium leading-tight">{feat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Chat Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 flex flex-col"
          >
            <div
              className="rounded-3xl border border-white/10 overflow-hidden flex flex-col"
              style={{
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(24px)",
                minHeight: 600,
              }}
            >
              {/* Chat header */}
              <div
                className="px-5 py-4 border-b border-white/8 flex items-center justify-between"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-base"
                    style={{ background: "linear-gradient(135deg, #00e5ff, #ff6b9d)" }}
                  >
                    T
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Terra — Idiomas Tear's Web</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: cfg.color }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      <span className="text-xs" style={{ color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:flex items-center gap-1 text-xs text-gray-600 font-mono">
                    <Globe size={11} /> 13+ idiomas
                  </span>
                  <button
                    onClick={clearChat}
                    className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/8 transition-all"
                    title="Reiniciar conversa"
                  >
                    <RefreshCw size={15} />
                  </button>
                </div>
              </div>

              {/* Quick action chips */}
              <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {QUICK_ACTIONS.map((action) => (
                  <motion.button
                    key={action.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage(action.value)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:border-cyan-500/40 hover:text-cyan-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4"
                style={{ maxHeight: 380 }}
              >
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, type: "spring", stiffness: 300, damping: 25 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-[82%] flex flex-col gap-1.5">
                        {/* Sender label */}
                        <span className={`text-xs font-medium px-1 text-gray-600 ${msg.sender === "user" ? "text-right" : ""}`}>
                          {msg.sender === "terra" ? "Terra" : "Você"}
                        </span>

                        {/* Message bubble */}
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "text-white rounded-br-sm"
                              : "text-gray-100 rounded-bl-sm border border-white/8"
                          }`}
                          style={{
                            background:
                              msg.sender === "user"
                                ? "linear-gradient(135deg, #0099ff, #7b2fff)"
                                : "rgba(255,255,255,0.04)",
                          }}
                        >
                          {msg.text}
                        </div>

                        {/* Phonetic badge */}
                        {msg.phonetic && (
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs border"
                            style={{
                              borderColor: "rgba(0,229,255,0.3)",
                              background: "rgba(0,229,255,0.06)",
                              color: "#00e5ff",
                            }}
                          >
                            <Volume2 size={11} />
                            <span>
                              Pronúncia: <strong>{msg.phonetic}</strong>
                            </span>
                          </motion.div>
                        )}

                        {/* Tip badge */}
                        {msg.tip && msg.sender === "terra" && (
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                            className="flex items-start gap-2 px-3 py-2 rounded-xl text-xs border"
                            style={{
                              borderColor: "rgba(168,85,247,0.25)",
                              background: "rgba(168,85,247,0.06)",
                              color: "#c084fc",
                            }}
                          >
                            <Brain size={11} className="mt-0.5 flex-shrink-0" />
                            <span>{msg.tip}</span>
                          </motion.div>
                        )}

                        {/* Score */}
                        {msg.score != null && (
                          <div className="text-xs text-gray-500 px-1 flex items-center gap-1">
                            <Star size={10} className="text-yellow-400" />
                            Nota: <strong className="text-green-400">{msg.score}/100</strong>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Thinking dots */}
                {terraState === "thinking" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm border border-white/8 bg-white/4">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#00e5ff" }}
                            animate={{ y: [0, -7, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.7, delay: i * 0.18, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-white/8" style={{ background: "rgba(0,0,0,0.4)" }}>
                <div className="flex gap-2.5">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                    placeholder="Digite em qualquer idioma ou pergunte sobre pronúncia..."
                    className="flex-1 px-4 py-3 rounded-2xl text-white placeholder-gray-600 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleRecording}
                    className="p-3 rounded-2xl transition-all flex-shrink-0"
                    style={{
                      background: isRecording
                        ? "linear-gradient(135deg, #ff4466, #cc2244)"
                        : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isRecording ? "rgba(255,68,102,0.5)" : "rgba(255,255,255,0.1)"}`,
                      color: isRecording ? "white" : "rgba(255,255,255,0.5)",
                      boxShadow: isRecording ? "0 0 20px rgba(255,68,102,0.3)" : "none",
                    }}
                    title={isRecording ? "Parar gravação" : "Gravar voz"}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="p-3 rounded-2xl text-white flex-shrink-0 disabled:opacity-40 transition-all"
                    style={{
                      background: "linear-gradient(135deg, #00e5ff, #7b2fff)",
                      boxShadow: input.trim() ? "0 0 20px rgba(0,229,255,0.25)" : "none",
                    }}
                    title="Enviar mensagem"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
                <p className="text-gray-700 text-xs mt-2 text-center font-mono">
                  Idiomas Tear's Web · Terra responde com pronúncia, dicas e feedback
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Features grid ── */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: "🫁",
              color: "#00e5ff",
              title: "Treino de Respiração",
              desc: "Antes de falar, Terra guia o ritmo respiratório. Reduz travamento e aumenta confiança na fala.",
            },
            {
              icon: "🧠",
              color: "#a855f7",
              title: "Pensar no Idioma",
              desc: "Responda SEM tradução mental. Treino cognitivo direto que leva à fluência real e espontânea.",
            },
            {
              icon: "🎭",
              color: "#ff6b9d",
              title: "Simulação Emocional",
              desc: "Entrevista, urgência, informalidade. Cenários reais com emoções — como na vida real.",
            },
            {
              icon: "🎤",
              color: "#ffd700",
              title: "Modo Imitação",
              desc: "Copie a entonação nativa exata. Treino de ator que forma o músculo sonoro do idioma.",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl border transition-all cursor-default"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span className="text-2xl block mb-3">{feat.icon}</span>
              <h4 className="text-white font-bold mb-2 text-sm">{feat.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
              <div className="mt-3 h-0.5 rounded-full" style={{ background: `${feat.color}30`, width: "40%" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
