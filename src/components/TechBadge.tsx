import React from "react";
import {
  Sparkles,
  Cloud,
  Box,
  Flame,
  Terminal,
  Cpu,
  Database,
  Network,
  Coffee,
  Code2,
  FileCode,
  Layers,
  Server,
  Workflow,
  Globe,
  Radio,
} from "lucide-react";

export interface TechItem {
  id: string;
  name: string;
  category: "ai" | "cloud" | "devops" | "backend" | "frontend" | "tools" | "languages";
  color?: string;
}

export const TECH_STACK: TechItem[] = [
  { id: "ai", name: "AI", category: "ai", color: "#a855f7" },
  { id: "google-adk", name: "Google ADK", category: "ai", color: "#3b82f6" },
  { id: "gcp", name: "GCP", category: "cloud", color: "#4285f4" },
  { id: "azure", name: "Azure", category: "cloud", color: "#0078d4" },
  { id: "packer", name: "Packer", category: "devops", color: "#02a8ef" },
  { id: "chaos-eng", name: "Chaos-engineering", category: "devops", color: "#e11d48" },
  { id: "linux", name: "Linux", category: "devops", color: "#facc15" },
  { id: "kubernetes", name: "Kubernetes", category: "devops", color: "#326ce5" },
  { id: "dart", name: "Dart", category: "languages", color: "#00b4ab" },
  { id: "github", name: "GitHub", category: "tools", color: "#ffffff" },
  { id: "docker", name: "Docker", category: "devops", color: "#2496ed" },
  { id: "helm", name: "Helm", category: "devops", color: "#0f1689" },
  { id: "firebase", name: "Firebase", category: "cloud", color: "#ffca28" },
  { id: "terraform", name: "Terraform", category: "devops", color: "#844fba" },
  { id: "network", name: "Network", category: "devops", color: "#10b981" },
  { id: "java", name: "Java", category: "languages", color: "#f89820" },
  { id: "mongodb", name: "MongoDB", category: "backend", color: "#47a248" },
  { id: "redis", name: "Redis", category: "backend", color: "#dc2626" },
  { id: "nestjs", name: "NestJS", category: "backend", color: "#ea284e" },
  { id: "nginx", name: "Nginx", category: "backend", color: "#009639" },
  { id: "nodejs", name: "NodeJS", category: "backend", color: "#5fa04e" },
  { id: "flutter", name: "Flutter", category: "frontend", color: "#02569b" },
  { id: "python", name: "Python", category: "languages", color: "#3776ab" },
  { id: "bash", name: "#! bash", category: "tools", color: "#ffffff" },
  { id: "git", name: "Git", category: "tools", color: "#f05032" },
  { id: "typescript", name: "TypeScript", category: "languages", color: "#3178c6" },
  { id: "vagrant", name: "Vagrant", category: "devops", color: "#1563ff" },
  { id: "vscode", name: "VSCode", category: "tools", color: "#007acc" },
  { id: "react", name: "React", category: "frontend", color: "#61dafb" },
  { id: "postgresql", name: "PostgreSQL", category: "backend", color: "#4169e1" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", color: "#38bdf8" },
];

export function TechIcon({ id, color }: { id: string; color?: string }) {
  const c = color || "currentColor";
  const size = 14;

  switch (id) {
    case "ai":
      return <Sparkles style={{ width: size, height: size, color: c }} />;
    case "google-adk":
    case "gcp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      );
    case "azure":
      return <Cloud style={{ width: size, height: size, color: c }} />;
    case "docker":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
          <path d="M13 3h2v2h-2zm-3 0h2v2h-2zm-3 3h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm-9 3h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zM2 13h20c-.5 4.5-4 7-9.5 7-5 0-8.5-2.5-10.5-7z" />
        </svg>
      );
    case "kubernetes":
    case "helm":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
        </svg>
      );
    case "linux":
    case "bash":
      return <Terminal style={{ width: size, height: size, color: c }} />;
    case "github":
    case "git":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "firebase":
      return <Flame style={{ width: size, height: size, color: c }} />;
    case "terraform":
    case "packer":
    case "vagrant":
      return <Box style={{ width: size, height: size, color: c }} />;
    case "network":
      return <Network style={{ width: size, height: size, color: c }} />;
    case "java":
      return <Coffee style={{ width: size, height: size, color: c }} />;
    case "mongodb":
    case "redis":
    case "postgresql":
      return <Database style={{ width: size, height: size, color: c }} />;
    case "typescript":
      return (
        <span
          style={{
            backgroundColor: c,
            color: "#fff",
            fontSize: "9px",
            fontWeight: "bold",
            borderRadius: "2px",
            padding: "0 2px",
            lineHeight: "12px",
            fontFamily: "monospace",
          }}
        >
          TS
        </span>
      );
    case "python":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
          <path d="M12 2c-3.1 0-5 1.5-5 3.5v2h5v1H5.5C3.5 8.5 2 10.4 2 13.5c0 3.3 1.7 4.5 5 4.5h2v-2.5c0-1.7 1.3-3 3-3h3V9c0-2-1.9-3.5-5-3.5zm-1.5 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm1.5 18c3.1 0 5-1.5 5-3.5v-2h-5v-1h6.5c2 0 3.5-1.9 3.5-5 0-3.3-1.7-4.5-5-4.5h-2v2.5c0 1.7-1.3 3-3 3h-3v3.5c0 2 1.9 3.5 5 3.5zm1.5-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      );
    case "react":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.8"
        >
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill={c} />
        </svg>
      );
    case "vscode":
      return <Code2 style={{ width: size, height: size, color: c }} />;
    default:
      return <Cpu style={{ width: size, height: size, color: c }} />;
  }
}

export function TechBadgePill({
  tech,
  selected = false,
  onClick,
}: {
  tech: TechItem;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 border cursor-pointer select-none ${
        selected
          ? "bg-orange-500/15 border-orange-500/60 text-orange-200 shadow-xs"
          : "bg-[#141518] hover:bg-[#1a1c20] border-[#22252a] hover:border-zinc-700 text-zinc-300 hover:text-white"
      }`}
    >
      <TechIcon id={tech.id} color={tech.color} />
      <span>{tech.name}</span>
    </button>
  );
}
