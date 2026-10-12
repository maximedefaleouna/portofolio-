export type Publication = "draft" | "published" | "archived";

export type MediaRole =
  | "cover" | "thumbnail" | "desktop" | "mobile" | "tablet" | "gallery"
  | "diagram" | "video" | "certificate" | "logo" | "other";

export type Presentation =
  | "landscape" | "portrait" | "square" | "original" | "full" | "contained" | "cropped";

export type MediaKind = "image" | "video" | "pdf" | "embed";
/** sample = bundled demo asset, local = object URL from this browser session, external = remote URL */
export type MediaSource = "sample" | "local" | "external";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  source: MediaSource;
  src: string;
  name: string;
  mime?: string;
  size?: number;
  width?: number;
  height?: number;
  role: MediaRole;
  presentation: Presentation;
  fit: "cover" | "contain";
  focalX: number;
  focalY: number;
  caption?: string;
  alt?: string;
  title?: string;
  description?: string;
  poster?: string;
}

export type ProjectLayout =
  | "editorial" | "desktop" | "mobile" | "compact" | "video" | "case-study" | "experimental" | "archived";

export type ProjectStatus = "in-progress" | "completed" | "maintained" | "paused";

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  layout: ProjectLayout;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  updatedAt: string;
  featured: boolean;
  publication: Publication;
  order: number;
  role?: string;
  context?: string;
  objectives?: string;
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
  apis: string[];
  architecture?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  achievements?: string;
  lessons?: string;
  future?: string;
  links: { demo?: string; docs?: string; source?: string; article?: string; video?: string };
  media: MediaItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  employmentType: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  relatedProjects: string[];
  logo?: MediaItem;
  publication: Publication;
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  kind: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  subjects: string[];
  achievements: string[];
  grade?: string;
  verificationUrl?: string;
  relatedSkills: string[];
  logo?: MediaItem;
  certificate?: MediaItem;
  publication: Publication;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  description?: string;
  relatedSkills: string[];
  logo?: MediaItem;
  image?: MediaItem;
  publication: Publication;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  projectIds: string[];
  visible: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  publishedAt: string;
  technologies: string[];
  readingTime: number;
  cover?: MediaItem;
  publication: Publication;
  order: number;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  monogram: string;
  bio: string;
  location: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
  image?: MediaItem;
  currentFocus: string;
  learning: string[];
  availability: { status: "open" | "limited" | "unavailable"; note: string };
  highlights: string[];
  about: {
    introduction: string;
    background: string;
    interests: string;
    philosophy: string;
    objectives: string;
    learningGoals: string;
  };
  contact: { showEmail: boolean; acceptForm: boolean; preferred: string };
}

export interface CvDocument {
  displayName: string;
  description: string;
  file?: MediaItem;
  updatedAt?: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  showNotes: boolean;
  showCertifications: boolean;
}

export interface Activity {
  id: string;
  at: string;
  text: string;
}
