import type { Note, SiteSettings, SkillCategory, SocialLink } from "@/lib/types";

const s = (id: string, name: string, projectIds: string[] = [], description?: string) => ({ id, name, projectIds, ...(description !== undefined ? { description } : {}), visible: true });

export const skillsSeed: SkillCategory[] = [
  { id: "sc1", name: "Languages", skills: [s("s1", "TypeScript", ["p1", "p2"], "Primary language"), s("s2", "JavaScript"), s("s3", "SQL", ["p1"]), s("s4", "Java")] },
  { id: "sc2", name: "Frontend", skills: [s("s5", "React", ["p1"]), s("s6", "React Native", ["p2"]), s("s7", "Tailwind CSS"), s("s8", "Astro", ["p3"])] },
  { id: "sc3", name: "Backend & data", skills: [s("s9", "Node.js", ["p1"]), s("s10", "PostgreSQL", ["p1"]), s("s11", "SQLite", ["p2"])] },
  { id: "sc4", name: "Tooling", skills: [s("s12", "Git"), s("s13", "Vite"), s("s14", "Playwright", ["p1"]), s("s15", "Docker")] },
];

export const notesSeed: Note[] = [
  {
    id: "n1", title: "Keeping filter state in the URL", slug: "filter-state-in-the-url",
    summary: "Why I moved table filters out of component state and into search params.",
    body: "## The problem\nFilters lived in component state, so a refresh lost them and links could not be shared.\n\n## The approach\n- Serialise filters into the query string\n- Validate them on read\n- Treat the URL as the single source of truth\n\n```ts\nconst filters = schema.parse(searchParams);\n```\n\n> Demo note — replace with your own writing.",
    publishedAt: "2026-06-12", technologies: ["React", "TypeScript"], readingTime: 4, publication: "published", order: 1,
  },
  {
    id: "n2", title: "Lessons from an offline-first mobile app", slug: "offline-first-lessons",
    summary: "Conflict handling, local logs and what I would do differently.",
    body: "## Notes\nSync is a product decision before it is a technical one.\n\n1. Decide what conflicts mean to users\n2. Keep an operation log\n3. Test on bad networks",
    publishedAt: "2026-03-02", technologies: ["React Native", "SQLite"], readingTime: 6, publication: "published", order: 2,
  },
];

export const socialSeed: SocialLink[] = [];

export const settingsSeed: SiteSettings = {
  siteTitle: "Maxime Defaleouna",
  tagline: "Software developer — projects, experience and notes.",
  showNotes: true,
  showCertifications: true,
};
