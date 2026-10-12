import React, { useState, useEffect } from "react";
import {
  GitBranch,
  User,
  Search,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight,
  Terminal,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sun,
  Moon,
  Sparkles,
  Layers,
  GraduationCap,
  Briefcase,
  Compass,
} from "lucide-react";
import { profileSeed } from "@/data/profile";
import { projectsSeed } from "@/data/projects";
import { experiencesSeed, educationSeed } from "@/data/career";
import { resolveSrc } from "@/lib/media";
import { range } from "@/lib/format";
import { TECH_STACK, TechBadgePill } from "@/components/TechBadge";
import { CommandPalette } from "@/components/CommandPalette";

export default function App() {
  const p = profileSeed;
  const [copied, setCopied] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Theme Management (light & dark mode, default to dark)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.title = `${p.name} — Développeur Logiciel`;
  }, [p.name]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("maximedefa@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter projects by selected tech if any
  const publishedProjects = projectsSeed
    .filter((proj) => proj.publication === "published")
    .sort((a, b) => a.order - b.order);

  const filteredProjects = selectedTech
    ? publishedProjects.filter((proj) => {
        const fullStack = [...proj.frontend, ...proj.backend, ...proj.databases, ...proj.tools].map(
          (t) => t.toLowerCase(),
        );
        return fullStack.some((t) => t.includes(selectedTech.toLowerCase()));
      })
    : publishedProjects;

  const currentTopics = [
    {
      num: "01",
      title: "Chaos Engineering & Résilience Système",
      desc: (
        <>
          J'explore les outils de chaos engineering et leur intégration dans des architectures
          distribuées. Analyse des pannes injectées avec{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Chaos Mesh</span>,{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Litmus Chaos</span> et
          observabilité avancée.
        </>
      ),
    },
    {
      num: "02",
      title: "Agents IA & Architectures Multi-Agents",
      desc: (
        <>
          Développement d'agents IA autonomes avec l'écosystème{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">
            LangChain / LangGraph
          </span>
          ,{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Google Vertex AI</span>{" "}
          et pipelines RAG haute fidélité avec{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Milvus</span>.
        </>
      ),
    },
    {
      num: "03",
      title: "Cloud-Native, Kubernetes & Observabilité",
      desc: (
        <>
          Mise en place de tableaux de bord unifiés pour clusters multi-cloud. Automatisation
          d'infrastructures avec{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Terraform</span>,{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Docker</span> et
          pratiques GitOps.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0c0e] text-zinc-900 dark:text-[#ededed] font-sans antialiased selection:bg-orange-500/20 selection:text-orange-600 dark:selection:text-orange-300 transition-colors duration-200">
      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectSection={scrollToSection}
        onToggleTheme={toggleTheme}
        isDark={theme === "dark"}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-slate-50/85 dark:bg-[#0b0c0e]/85 backdrop-blur-md border-b border-zinc-200 dark:border-[#1c1d22]">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          {/* Logo Tag / Brand */}
          <a
            href="#"
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-[#132a1c] border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs tracking-wide hover:border-emerald-500 transition-colors shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            loopbin
          </a>

          {/* Navigation Links: uniquement ./projets et ./about */}
          <nav className="flex items-center gap-3 sm:gap-5">
            <a
              href="#projects"
              className="text-xs font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> ./projets
            </a>
            <a
              href="#about"
              className="text-xs font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> ./about
            </a>

            {/* Quick Find Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-100 dark:bg-[#141518] border border-zinc-200 dark:border-[#22252a] text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>find</span>
              <kbd className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md bg-zinc-100 dark:bg-[#141518] border border-zinc-200 dark:border-[#22252a] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label="Basculer entre mode clair et mode sombre"
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-zinc-600" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-5 pt-12 pb-24 space-y-16">
        {/* Hero Section */}
        <section className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Bienvenue sur Loopbin
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Moi c'est{" "}
            <strong className="text-zinc-900 dark:text-zinc-200 font-semibold">{p.name}</strong>.
            Ici, je partage mes réflexions, mes expériences et mes découvertes sur les sujets qui me
            passionnent : le développement full-stack, les architectures cloud et les systèmes d'IA.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-[#141518] border border-zinc-200 dark:border-[#22252a] text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              {p.availability.note}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-[#141518] border border-zinc-200 dark:border-[#22252a] text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-3 h-3 text-orange-500" />
              {p.location}
            </span>
          </div>
        </section>

        {/* Section: $ Mes sujets */}
        <section id="topics" className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono font-bold">$</span> Mes sujets
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Les technologies que j'utilise le plus et sur lesquelles je travaille au quotidien.
            </p>
          </div>

          {/* Badges Grid */}
          <div className="pt-2 flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <TechBadgePill
                key={tech.id}
                tech={tech}
                selected={selectedTech === tech.name}
                onClick={() => {
                  setSelectedTech(selectedTech === tech.name ? null : tech.name);
                }}
              />
            ))}
          </div>

          {selectedTech && (
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-orange-600 dark:text-orange-400">
              <span>Filtre actif : {selectedTech}</span>
              <button
                onClick={() => setSelectedTech(null)}
                className="underline hover:opacity-80 cursor-pointer"
              >
                Réinitialiser le filtre
              </button>
            </div>
          )}
        </section>

        {/* Section: $ Mes sujets en cours */}
        <section id="current-topics" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono font-bold">$</span> Mes sujets en cours
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Les thématiques et technologies que j'explore et mets en pratique actuellement.
            </p>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-[#1e2025] border-y border-zinc-200 dark:border-[#1e2025]">
            {currentTopics.map((topic) => (
              <div key={topic.num} className="py-4 flex items-start gap-4 group">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 pt-0.5 select-none">
                  {topic.num}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-mono group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: $ Mes projets récents */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="text-orange-500 font-mono font-bold">$</span> Mes derniers projets
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Sélection de réalisations, outils et applications que j'ai conçus.
              </p>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center border border-zinc-200 dark:border-[#1e2025] rounded-lg text-zinc-500 text-xs font-mono bg-white dark:bg-transparent">
              Aucun projet ne correspond au filtre sélectionné.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProjects.map((proj) => {
                const cover = proj.media.find((m) => m.role === "cover") ?? proj.media[0];
                const src = cover ? resolveSrc(cover) : null;
                const stack = [...proj.frontend, ...proj.backend, ...proj.databases, ...proj.tools];

                return (
                  <article
                    key={proj.id}
                    className="flex flex-col justify-between bg-white dark:bg-[#131417] border border-zinc-200 dark:border-[#22252a] hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg p-4 transition-all group shadow-xs hover:shadow-md"
                  >
                    <div>
                      {src && (
                        <div className="overflow-hidden rounded-md border border-zinc-100 dark:border-[#22252a] mb-3 aspect-[16/9] bg-zinc-100 dark:bg-[#0c0d10]">
                          <img
                            src={src}
                            alt={cover?.alt ?? proj.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {proj.title}
                        </h3>
                        {proj.links.demo && (
                          <a
                            href={proj.links.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-0.5 transition-colors"
                            title="Voir la démo"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="mt-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {proj.category} · {range(proj.startDate, proj.endDate)}
                      </div>

                      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {proj.shortDescription}
                      </p>

                      {proj.challenges && (
                        <div className="mt-2.5 p-2 rounded bg-zinc-50 dark:bg-[#0e0f12] border border-zinc-200 dark:border-[#1e2025] text-[11px] text-zinc-600 dark:text-zinc-400">
                          <span className="font-semibold text-orange-600 dark:text-orange-400 font-mono">
                            Défi :{" "}
                          </span>
                          {proj.challenges}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#1e2025] flex flex-wrap gap-1.5 items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono bg-zinc-100 dark:bg-[#191b20] border border-zinc-200 dark:border-[#262830] text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {proj.links.demo && (
                        <a
                          href={proj.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                        >
                          Démo <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Section: $ About (À propos, Parcours & Formation) */}
        <section id="about" className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono font-bold">$</span> À propos & Parcours
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Mon histoire, mes expériences professionnelles et ma formation technique.
            </p>
          </div>

          {/* Bio card */}
          <div className="bg-white dark:bg-[#131417] border border-zinc-200 dark:border-[#22252a] rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-600 dark:text-orange-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Bio & Philosophie</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {p.bio}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded bg-zinc-50 dark:bg-[#0e0f12] border border-zinc-200 dark:border-[#1e2025]">
                <div className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono mb-1">
                  Focus actuel
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.currentFocus}
                </div>
              </div>
              <div className="p-3 rounded bg-zinc-50 dark:bg-[#0e0f12] border border-zinc-200 dark:border-[#1e2025]">
                <div className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono mb-1">
                  En apprentissage
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.learning.join(" · ")}
                </div>
              </div>
            </div>
          </div>

          {/* Expériences professionnelles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
              <Briefcase className="w-3.5 h-3.5 text-orange-500" />
              <span>Expériences professionnelles</span>
            </div>

            <div className="space-y-3">
              {experiencesSeed.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white dark:bg-[#131417] border border-zinc-200 dark:border-[#22252a] rounded-lg p-4 space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {exp.position}{" "}
                      <span className="text-orange-600 dark:text-orange-400 font-mono">
                        @ {exp.organization}
                      </span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">
                      {range(exp.startDate, exp.endDate, exp.current)} · {exp.location}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono bg-zinc-100 dark:bg-[#191b20] border border-zinc-200 dark:border-[#262830] text-zinc-700 dark:text-zinc-400 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Formation & Diplômes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
              <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
              <span>Formation & Diplômes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {educationSeed.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white dark:bg-[#131417] border border-zinc-200 dark:border-[#22252a] rounded-lg p-3 text-xs shadow-xs"
                >
                  <p className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {edu.degree} {edu.field && `— ${edu.field}`}
                  </p>
                  <p className="text-zinc-500 font-mono mt-1">
                    {edu.institution} · {range(edu.startDate, edu.endDate, edu.current)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: $ Contact CLI Box */}
        <section id="contact" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono font-bold">$</span> Me contacter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Un projet, une question ou une opportunité ? Échangeons directement.
            </p>
          </div>

          {/* Interactive Terminal Card */}
          <div className="bg-[#121316] text-[#ededed] border border-zinc-200 dark:border-[#22252a] rounded-lg overflow-hidden font-mono text-xs shadow-lg">
            {/* Terminal Window Header */}
            <div className="px-4 py-2 bg-[#0d0e10] border-b border-[#22252a] flex items-center justify-between text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[11px] text-zinc-400">contact.sh</span>
              </div>
              <span className="text-[10px]">bash</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="text-zinc-400">
                <span className="text-emerald-400">maxime@workstation</span>:
                <span className="text-blue-400">~</span>$ curl -s https://loopbin.dev/contact
              </div>

              <div className="pl-2 space-y-1 text-zinc-300">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span>
                    <span className="text-orange-400">email</span> = "maximedefa@gmail.com"
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c1d22] hover:bg-zinc-800 border border-[#2a2c34] text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copier l'email</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-orange-400">github</span> = "
                  <a
                    href="https://github.com/maximedefaleouna"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-200 hover:underline hover:text-white"
                  >
                    https://github.com/maximedefaleouna
                  </a>
                  "
                </div>

                <div>
                  <span className="text-orange-400">linkedin</span> = "
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-200 hover:underline hover:text-white"
                  >
                    https://www.linkedin.com/
                  </a>
                  "
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-10 border-t border-zinc-200 dark:border-[#1e2025] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-3">
          <div>
            © {new Date().getFullYear()} {p.name} — Loopbin Style Portfolio.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/maximedefaleouna"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
