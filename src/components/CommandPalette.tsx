import React, { useEffect, useState } from "react";
import { Search, X, GitBranch, User, Mail, Terminal, ArrowRight, Sun, Moon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (id: string) => void;
  onToggleTheme?: () => void;
  isDark?: boolean;
}

export function CommandPalette({ isOpen, onClose, onSelectSection, onToggleTheme, isDark }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    {
      id: "projects",
      label: "./projets",
      desc: "Explorer mes réalisations et applications",
      icon: GitBranch,
    },
    {
      id: "topics",
      label: "./sujets",
      desc: "Consulter la stack technique et compétences",
      icon: Terminal,
    },
    {
      id: "current-topics",
      label: "./sujets-en-cours",
      desc: "Sujets de veille et projets en cours",
      icon: Terminal,
    },
    {
      id: "about",
      label: "./about",
      desc: "À propos, parcours professionnel et formation",
      icon: User,
    },
    { id: "contact", label: "./contact", desc: "Informations de contact et réseaux", icon: Mail },
  ].filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/50 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800/80 gap-3">
          <Search className="w-4 h-4 text-orange-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher une section, un projet... (Échap pour fermer)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none font-mono text-zinc-900 dark:text-zinc-100"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {items.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              Aucun résultat pour "{query}"
            </div>
          ) : (
            items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-orange-500 group-hover:border-orange-500/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-orange-600 dark:group-hover:text-white">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-[#0d0e10] border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigation CLI</span>
          <div className="flex items-center gap-2">
            <span>
              Entrée :{" "}
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300">
                ↵
              </kbd>
            </span>
            <span>
              Fermer :{" "}
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300">
                esc
              </kbd>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
