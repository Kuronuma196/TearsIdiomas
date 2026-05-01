import { motion } from "framer-motion";
import {Globe, Heart} from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: "Plataforma",
    links: [
      { label: "Idiomas", href: "#idiomas" },
      { label: "Modulos", href: "#modulos" },
      { label: "Dinamicas de Treino", href: "#pratica" },
      { label: "Exemplos de Audio", href: "#exemplos" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Terra — Avatar IA", href: "#terra" },
      { label: "Glossario Interativo", href: "#glossario" },
      { label: "Niveis A1-C2", href: "#" },
      { label: "Apostilas", href: "#" },
    ],
  },
  {
    title: "Tear's Universe",
    links: [
      { label: "Tear's Studios", href: "#" },
      { label: "Universe Lore", href: "#" },
      { label: "Comunidade", href: "#" },
      { label: "Sobre o Projeto", href: "#" },
    ],
  },
];

const LANGUAGES_QUICK = [
  { flag: "🇧🇷", name: "PT-BR" },
  { flag: "🇵🇹", name: "PT-PT" },
  { flag: "🇺🇸", name: "EN" },
  { flag: "🇪🇸", name: "ES" },
  { flag: "🇫🇷", name: "FR" },
  { flag: "🇩🇪", name: "DE" },
  { flag: "🇮🇹", name: "IT" },
  { flag: "🇯🇵", name: "JA" },
  { flag: "🇨🇳", name: "ZH" },
  { flag: "🇰🇷", name: "KO" },
  { flag: "🇬🇷", name: "EL" },
  { flag: "🇷🇺", name: "RU" },
  { flag: "🇪🇬", name: "AR" },
];

export default function Footer() {
  const handleLink = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/8 pt-16 pb-8 relative overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-30"
        style={{ background: "linear-gradient(to bottom, #0099ff, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-black text-base">T</span>
              </div>
              <div>
                <p className="text-white font-black text-base leading-none">Idiomas</p>
                <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "#0099ff" }}>
                  Tear's Web
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Um ecossistema de pratica ativa de idiomas do Tear's Studios Universe.
              Idioma nao se estuda — se vive, se trope&#231;a, se repete ate soar natural.
            </p>

            {/* Languages quick */}
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES_QUICK.map((l) => (
                <motion.span
                  key={l.name}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-white/8 bg-white/3 cursor-default"
                  title={l.name}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span className="text-xs text-gray-600">{l.name}</span>
                </motion.span>
              ))}
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLink(link.href)}
                      className="text-gray-500 hover:text-white text-sm transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 p-6 rounded-2xl border border-white/8"
          style={{ background: "rgba(0,153,255,0.04)" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <Globe size={28} className="text-blue-400 flex-shrink-0" />
            <blockquote className="text-gray-300 text-base italic font-medium">
              "Idioma nao se estuda.{" "}
              <span style={{ color: "#0099ff" }}>Se vive.</span>{" "}
              Se trope&#231;a.{" "}
              <span style={{ color: "#00d4aa" }}>Se repete ate soar natural.</span>"
            </blockquote>
            <span className="text-gray-600 text-sm flex-shrink-0 md:ml-auto">
              — Filosofia TerraSpeak
            </span>
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: "13+", label: "Idiomas e variacoes" },
            { value: "17", label: "Dinamicas de treino" },
            { value: "A1–C2", label: "Niveis de proficiencia" },
            { value: "∞", label: "Cenarios de pratica" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-xl border border-white/6 bg-white/2"
            >
              <p
                className="text-2xl font-black mb-0.5"
                style={{ color: ["#0099ff", "#00d4aa", "#7b2fff", "#ff6b9d"][i] }}
              >
                {stat.value}
              </p>
              <p className="text-gray-600 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Idiomas Tear's Web — Tear's Studios Universe
          </p>
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <span>Feito com</span>
            <Heart size={12} className="text-pink-500" fill="currentColor" />
            <span>para quem quer viver o idioma</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
