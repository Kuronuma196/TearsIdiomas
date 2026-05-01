export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  variants?: string[];
  levels: string[];
  color: string;
}

export interface Module {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface Exercise {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "Iniciante" | "Intermediario" | "Avancado";
  type: "listening" | "speaking" | "writing" | "conversation";
}

export interface PhoneticWord {
  word: string;
  phonetic_simple: string;
  phonetic_ipa: string;
  meaning: string;
  language: string;
  example: string;
}

export const LANGUAGES: Language[] = [
  {
    id: "pt-br",
    name: "Portugues Brasileiro",
    nativeName: "Portugues do Brasil",
    flag: "BR",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#00d4aa",
  },
  {
    id: "pt-pt",
    name: "Portugues Europeu",
    nativeName: "Portugues de Portugal",
    flag: "PT",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#00b4d8",
  },
  {
    id: "en-us",
    name: "Ingles Americano",
    nativeName: "American English",
    flag: "US",
    variants: ["Americano", "Britanico", "Australiano"],
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#0099ff",
  },
  {
    id: "es",
    name: "Espanhol",
    nativeName: "Espanol",
    flag: "ES",
    variants: ["Espanha", "Mexico", "Argentina"],
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#ff6b35",
  },
  {
    id: "fr",
    name: "Frances",
    nativeName: "Francais",
    flag: "FR",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#7b2fff",
  },
  {
    id: "de",
    name: "Alemao",
    nativeName: "Deutsch",
    flag: "DE",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#ffd700",
  },
  {
    id: "it",
    name: "Italiano",
    nativeName: "Italiano",
    flag: "IT",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#ff4757",
  },
  {
    id: "el",
    name: "Grego",
    nativeName: "\u03b5\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
    flag: "GR",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#00b4d8",
  },
  {
    id: "ru",
    name: "Russo",
    nativeName: "\u0440\u0443\u0441\u0441\u043a\u0438\u0439",
    flag: "RU",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#ff4757",
  },
  {
    id: "ja",
    name: "Japones",
    nativeName: "\u65e5\u672c\u8a9e",
    flag: "JP",
    levels: ["N5", "N4", "N3", "N2", "N1"],
    color: "#ff6b9d",
  },
  {
    id: "zh",
    name: "Chines Mandarin",
    nativeName: "\u666e\u901a\u8bdd",
    flag: "CN",
    levels: ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"],
    color: "#ff4757",
  },
  {
    id: "ko",
    name: "Coreano",
    nativeName: "\ud55c\uad6d\uc5b4",
    flag: "KR",
    levels: ["TOPIK 1", "TOPIK 2", "TOPIK 3", "TOPIK 4", "TOPIK 5", "TOPIK 6"],
    color: "#7b2fff",
  },
  {
    id: "ar",
    name: "Arabe Egipcio",
    nativeName: "\u0639\u0631\u0628\u064a \u0645\u0635\u0631\u064a",
    flag: "EG",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    color: "#ffd700",
  },
];

export const MODULES: Module[] = [
  {
    id: "travel",
    icon: "\u2708\ufe0f",
    title: "Viagem",
    description: "Aeroportos, hoteis, restaurantes, emergencias e navegacao em paises estrangeiros",
    color: "#0099ff",
  },
  {
    id: "work",
    icon: "\ud83d\udcbc",
    title: "Trabalho",
    description: "Reunioes, negociacoes, emails profissionais, entrevistas e networking",
    color: "#00d4aa",
  },
  {
    id: "study",
    icon: "\ud83c\udf93",
    title: "Estudos Fora",
    description: "Universidade, intercambio, escrita academica e conversacao com colegas",
    color: "#7b2fff",
  },
  {
    id: "advanced",
    icon: "\ud83e\udde0",
    title: "Avancado",
    description: "Debates, opiniao, gírias avancadas e nuances culturais profundas",
    color: "#ff6b35",
  },
  {
    id: "mixed",
    icon: "\ud83d\udd00",
    title: "Misto",
    description: "Combine ate 3 modulos para uma pratica personalizada e desafiadora",
    color: "#ff6b9d",
  },
];

export const EXERCISES: Exercise[] = [
  {
    id: "word-builder",
    icon: "\ud83e\udde9",
    title: "Word Builder",
    subtitle: "Construcao de Frases",
    description: "Monte frases com blocos de palavras. Do basico ao avancado sem traducao",
    difficulty: "Iniciante",
    type: "writing",
  },
  {
    id: "memory-rebuild",
    icon: "\ud83d\udd01",
    title: "Memory Rebuild",
    subtitle: "Reconstrucao de Frases",
    description: "Terra fala, a frase desaparece, voce reconstroi. Memoria + estrutura + compreensao",
    difficulty: "Intermediario",
    type: "listening",
  },
  {
    id: "build-speak",
    icon: "\ud83c\udfa4",
    title: "Build & Speak",
    subtitle: "Montar + Falar",
    description: "Monte a frase com palavras, depois precisa fala-la. Sistema avalia ordem, pronuncia e fluidez",
    difficulty: "Intermediario",
    type: "speaking",
  },
  {
    id: "smart-fill",
    icon: "\ud83d\udcdd",
    title: "Smart Fill",
    subtitle: "Preenchimento Inteligente",
    description: "Fill contextual avancado. Avalia gramatica + contexto temporal, nao so a palavra certa",
    difficulty: "Iniciante",
    type: "writing",
  },
  {
    id: "real-translation",
    icon: "\ud83d\udd04",
    title: "Real Translation",
    subtitle: "Traducao Real",
    description: "\"Deu ruim\" vira \"It went wrong\". Adapta, nao traduz. Separa amador de fluente",
    difficulty: "Avancado",
    type: "writing",
  },
  {
    id: "shadowing",
    icon: "\ud83c\udfa7",
    title: "Shadowing Mode",
    subtitle: "Eco de Pronuncia",
    description: "Terra fala, voce repete imediatamente sem tempo pra pensar. Treino muscular de idioma",
    difficulty: "Intermediario",
    type: "speaking",
  },
  {
    id: "intent-builder",
    icon: "\ud83c\udfad",
    title: "Intent Builder",
    subtitle: "Selecao por Intencao",
    description: "Situacao real + escolha entre formal, informal e errado. Comunicacao com contexto",
    difficulty: "Avancado",
    type: "conversation",
  },
  {
    id: "fix-sentence",
    icon: "\ud83d\udd27",
    title: "Fix the Sentence",
    subtitle: "Correcao Ativa",
    description: "\"I goed to the store\" — corrija a frase. Identifica e corrige erros gramaticais",
    difficulty: "Intermediario",
    type: "writing",
  },
  {
    id: "chaos-mode",
    icon: "\ud83d\udd25",
    title: "Modo Caos",
    subtitle: "Nivel Avancado",
    description: "Audio + construcao + fala + tempo. Tudo junto. Fluencia nasce no caos, nao no conforto",
    difficulty: "Avancado",
    type: "conversation",
  },
];

export const PHONETIC_EXAMPLES: PhoneticWord[] = [
  {
    word: "thought",
    phonetic_simple: "thot",
    phonetic_ipa: "/\u03b8\u0254\u02d0t/",
    meaning: "pensou / pensamento",
    language: "Ingles",
    example: "I thought about it all day.",
  },
  {
    word: "through",
    phonetic_simple: "thru",
    phonetic_ipa: "/\u03b8ru\u02d0/",
    meaning: "atraves de / por",
    language: "Ingles",
    example: "She walked through the door.",
  },
  {
    word: "konnichiwa",
    phonetic_simple: "kon-ni-chi-ua",
    phonetic_ipa: "/ko.n\u02f2i.t\u0255i.wa/",
    meaning: "Boa tarde / Ola",
    language: "Japones",
    example: "\u3053\u3093\u306b\u3061\u306f — Ola!",
  },
  {
    word: "Bonjour",
    phonetic_simple: "bon-jur",
    phonetic_ipa: "/b\u0254\u014b.\u0292u\u0281/",
    meaning: "Bom dia / Ola",
    language: "Frances",
    example: "Bonjour, comment allez-vous?",
  },
  {
    word: "Guten Morgen",
    phonetic_simple: "gu-ten mor-guen",
    phonetic_ipa: "/\u02c8\u0261u\u02d0t\u0259n \u02c8m\u0254\u0281\u0261\u0259n/",
    meaning: "Bom dia",
    language: "Alemao",
    example: "Guten Morgen! Wie geht es Ihnen?",
  },
];

export const PROFICIENCY_LEVELS = [
  { code: "A1", name: "Iniciante", description: "Palavras basicas e frases simples", color: "#00d4aa" },
  { code: "A2", name: "Basico", description: "Situacoes cotidianas e vocabulario essencial", color: "#00b4d8" },
  { code: "B1", name: "Intermediario", description: "Temas familiares e viagens", color: "#0099ff" },
  { code: "B2", name: "Intermediario Sup.", description: "Textos complexos e interacao fluente", color: "#7b2fff" },
  { code: "C1", name: "Avancado", description: "Uso fluente em contextos exigentes", color: "#ff6b35" },
  { code: "C2", name: "Maestria", description: "Dominio completo como nativo", color: "#ff6b9d" },
];
