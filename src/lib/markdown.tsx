import { Fragment, type ReactNode } from "react";
import { parseVideoUrl } from "./media";

/** Minimal, safe Markdown renderer (no HTML injection). Supports headings, lists, quotes, code, images, links, video embeds. */
function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    const t = m[0] ?? "";
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (t.startsWith("**")) out.push(<strong key={k}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={k}>{t.slice(1, -1)}</code>);
    else if (t.startsWith("[")) {
      const mm = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const label = mm?.[1] ?? t;
      const raw = mm?.[2] ?? "#";
      const href: string = /^(https?:|mailto:|\/)/.test(raw) ? raw : "#";
      out.push(
        <a
          key={k}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
        >
          {label}
        </a>,
      );
    } else out.push(<em key={k}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source, className = "" }: { source?: string; className?: string }) {
  if (!source?.trim()) return null;
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;
  const at = (n: number): string => lines[n] ?? "";
  while (i < lines.length) {
    const line = at(i);
    const key = `b${k++}`;
    if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !at(i).startsWith("```")) buf.push(at(i++));
      i++;
      blocks.push(
        <pre key={key}>
          <code>{buf.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    if (/^###\s/.test(line)) {
      blocks.push(<h3 key={key}>{inline(line.slice(4), key)}</h3>);
      i++;
      continue;
    }
    if (/^##?\s/.test(line)) {
      blocks.push(<h2 key={key}>{inline(line.replace(/^##?\s/, ""), key)}</h2>);
      i++;
      continue;
    }
    if (line.startsWith("> ")) {
      blocks.push(<blockquote key={key}>{inline(line.slice(2), key)}</blockquote>);
      i++;
      continue;
    }
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      const src = img[2] ?? "";
      if (/^https?:/.test(src))
        blocks.push(<img key={key} src={src} alt={img[1] ?? ""} loading="lazy" />);
      i++;
      continue;
    }
    const vid = line.match(/^@video\((.+)\)$/);
    if (vid) {
      const v = parseVideoUrl(vid[1] ?? "");
      if (v)
        blocks.push(
          <iframe key={key} src={v.embed} title="Embedded video" allowFullScreen loading="lazy" />,
        );
      i++;
      continue;
    }
    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\d+\.\s/.test(at(i)) : /^[-*]\s/.test(at(i)))) {
        items.push(at(i).replace(/^([-*]|\d+\.)\s/, ""));
        i++;
      }
      const L = ordered ? "ol" : "ul";
      blocks.push(
        <L key={key}>
          {items.map((t, j) => (
            <li key={j}>{inline(t, `${key}${j}`)}</li>
          ))}
        </L>,
      );
      continue;
    }
    if (!line.trim()) {
      i++;
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && at(i).trim() && !/^(#|>|```|[-*]\s|\d+\.\s|!\[|@video)/.test(at(i)))
      para.push(at(i++));
    if (!para.length) {
      para.push(at(i++));
    }
    blocks.push(
      <p key={key}>
        {para.map((p, j) => (
          <Fragment key={j}>
            {j > 0 && " "}
            {inline(p, `${key}${j}`)}
          </Fragment>
        ))}
      </p>,
    );
  }
  return <div className={`prose-md ${className}`}>{blocks}</div>;
}
