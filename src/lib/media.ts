import type { MediaItem, MediaKind, MediaRole, Presentation } from "./types";
import { SAMPLE_ASSETS } from "@/data/sample-media";

/**
 * Object URLs created in this browser session. After a reload they are gone,
 * so stored items with source "local" that are not in this set render a placeholder.
 */
const liveUrls = new Set<string>();

export const LIMITS = {
  image: 15 * 1024 * 1024,
  video: 200 * 1024 * 1024,
  pdf: 20 * 1024 * 1024,
};

export const ACCEPT_IMAGE = "image/jpeg,image/png,image/webp,image/avif,image/svg+xml";
export const ACCEPT_ALL = `${ACCEPT_IMAGE},video/mp4,video/webm,application/pdf`;

export const ROLE_LABEL: Record<MediaRole, string> = {
  cover: "Cover image",
  thumbnail: "Thumbnail",
  desktop: "Desktop screenshot",
  mobile: "Mobile screenshot",
  tablet: "Tablet screenshot",
  gallery: "Gallery image",
  diagram: "Architecture diagram",
  video: "Video",
  certificate: "Certificate",
  logo: "Logo",
  other: "Other",
};

export const PRESENTATION_LABEL: Record<Presentation, string> = {
  landscape: "Landscape (16:10)",
  portrait: "Portrait (3:4)",
  square: "Square",
  original: "Original ratio",
  full: "Full-width",
  contained: "Contained",
  cropped: "Cropped (focal point)",
};

export function kindOf(mime: string): MediaKind | null {
  if (mime.startsWith("image/")) return "image";
  if (mime === "video/mp4" || mime === "video/webm") return "video";
  if (mime === "application/pdf") return "pdf";
  return null;
}

/** Browser-side validation only — production uploads must be validated server-side too. */
export function validateFile(
  file: File,
  allowed: MediaKind[] = ["image", "video", "pdf"],
): string | null {
  const kind = kindOf(file.type);
  if (!kind || !allowed.includes(kind))
    return `${file.name}: unsupported type (${file.type || "unknown"})`;
  if (file.size > LIMITS[kind as "image" | "video" | "pdf"]) {
    return `${file.name}: exceeds ${Math.round(LIMITS[kind as "image"] / 1024 / 1024)} MB limit`;
  }
  if (file.type === "image/svg+xml" && file.size > 512 * 1024)
    return `${file.name}: SVG files are limited to 512 KB`;
  return null;
}

function readDimensions(
  kind: MediaKind,
  url: string,
): Promise<{ width?: number; height?: number }> {
  return new Promise((resolve) => {
    if (kind === "image") {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({});
      img.src = url;
    } else if (kind === "video") {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => resolve({ width: v.videoWidth, height: v.videoHeight });
      v.onerror = () => resolve({});
      v.src = url;
    } else resolve({});
  });
}

export function defaultRoleFor(kind: MediaKind, w?: number, h?: number): MediaRole {
  if (kind === "video" || kind === "embed") return "video";
  if (kind === "pdf") return "other";
  if (w && h && h / w > 1.4) return "mobile";
  if (w && h && w / h > 1.2) return "desktop";
  return "gallery";
}

export function defaultPresentation(role: MediaRole): Presentation {
  if (role === "mobile" || role === "desktop" || role === "tablet" || role === "cover")
    return "original";
  if (role === "diagram") return "full";
  if (role === "thumbnail" || role === "logo") return "square";
  return "original";
}

export async function fileToMedia(file: File, id: string): Promise<MediaItem> {
  const kind = kindOf(file.type)!;
  const url = URL.createObjectURL(file);
  liveUrls.add(url);
  const dims = await readDimensions(kind, url);
  const role = defaultRoleFor(kind, dims.width, dims.height);
  return {
    id,
    kind,
    source: "local",
    src: url,
    name: file.name,
    mime: file.type,
    size: file.size,
    ...dims,
    role,
    presentation: defaultPresentation(role),
    fit: "contain",
    focalX: 50,
    focalY: 50,
    caption: "",
    alt: "",
    ...(kind === "video" ? { title: file.name.replace(/\.[^.]+$/, "") } : {}),
  };
}

export function parseVideoUrl(
  url: string,
): { provider: "youtube" | "vimeo"; embed: string; thumb?: string } | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt)
    return {
      provider: "youtube",
      embed: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
      thumb: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { provider: "vimeo", embed: `https://player.vimeo.com/video/${vm[1]}` };
  return null;
}

/** Resolve a stored src to a usable URL, or null when a local file is no longer available. */
export function resolveSrc(m: MediaItem): string | null {
  if (m.source === "sample") return SAMPLE_ASSETS[m.src]?.url ?? null;
  if (m.source === "local") return liveUrls.has(m.src) ? m.src : null;
  return m.src;
}

export function sampleDims(m: MediaItem) {
  if (m.source === "sample") return SAMPLE_ASSETS[m.src];
  return undefined;
}

export function revokeIfLocal(m: MediaItem) {
  if (m.source === "local" && liveUrls.has(m.src)) {
    URL.revokeObjectURL(m.src);
    liveUrls.delete(m.src);
  }
}

export function formatBytes(n?: number) {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export const isPortrait = (m: MediaItem) =>
  m.role === "mobile" ||
  m.presentation === "portrait" ||
  (!!m.width && !!m.height && m.height > m.width * 1.15);
