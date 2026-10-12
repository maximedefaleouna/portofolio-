import { useEffect } from "react";
import { profileSeed } from "@/data/profile";
import { projectsSeed } from "@/data/projects";
import { experiencesSeed, educationSeed, certificationsSeed } from "@/data/career";
import { notesSeed, skillsSeed, settingsSeed } from "@/data/content";
import { resolveSrc } from "@/lib/media";
import { fmtDate, range } from "@/lib/format";
import { Markdown } from "@/lib/markdown";

const published = <T extends { publication: string; order: number }>(items: T[]) =>
  items.filter((i) => i.publication === "published").sort((a, b) => a.order - b.order);

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-6 py-14">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  const p = profileSeed;
  const projects = published(projectsSeed);
  const experiences = published(experiencesSeed);
  const education = published(educationSeed);
  const certifications = published(certificationsSeed);
  const notes = published(notesSeed);

  useEffect(() => {
    document.title = `${p.name} — ${p.title}`;
  }, [p.name, p.title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="font-semibold">{p.monogram}</span>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#projects" className="hover:text-foreground">
              Projets
            </a>
            <a href="#experience" className="hover:text-foreground">
              Parcours
            </a>
            <a href="#skills" className="hover:text-foreground">
              Compétences
            </a>
            {settingsSeed.showNotes && (
              <a href="#notes" className="hover:text-foreground">
                Notes
              </a>
            )}
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-20">
        <p className="mb-3 inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {p.availability.note}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{p.name}</h1>
        <p className="mt-2 text-xl text-muted-foreground">
          {p.title} · {p.location}
        </p>
        <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{p.bio}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Me contacter
          </a>
          <a
            href="#projects"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
          >
            Voir mes projets
          </a>
        </div>
        <div className="mt-10 grid gap-4 rounded-lg border border-border p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Focus actuel
            </p>
            <p className="mt-1 text-sm">{p.currentFocus}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              En apprentissage
            </p>
            <p className="mt-1 text-sm">{p.learning.join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Projets">
        <div className="space-y-10">
          {projects.map((proj) => {
            const cover = proj.media.find((m) => m.role === "cover") ?? proj.media[0];
            const src = cover ? resolveSrc(cover) : null;
            const stack = [...proj.frontend, ...proj.backend, ...proj.databases, ...proj.tools];
            return (
              <article key={proj.id} className="overflow-hidden rounded-lg border border-border">
                {src && (
                  <img
                    src={src}
                    alt={cover?.alt ?? proj.title}
                    loading="lazy"
                    className={
                      proj.layout === "mobile"
                        ? "mx-auto max-h-80 object-contain"
                        : "aspect-[16/9] w-full object-cover"
                    }
                  />
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{proj.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {proj.category} · {range(proj.startDate, proj.endDate)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {proj.shortDescription}
                  </p>
                  {proj.challenges && (
                    <p className="mt-3 text-sm">
                      <span className="font-medium">Défi :</span> {proj.challenges}
                    </p>
                  )}
                  {stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.links.demo && (
                    <a
                      href={proj.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      Voir la démo →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Expérience">
        <ol className="relative space-y-8 border-l border-border pl-6">
          {experiences.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-xs text-muted-foreground">
                {range(e.startDate, e.endDate, e.current)} · {e.location}
              </p>
              <h3 className="mt-1 font-semibold">
                {e.position} — {e.organization}
              </h3>
              {e.description && (
                <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
              )}
              {e.technologies.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">{e.technologies.join(" · ")}</p>
              )}
            </li>
          ))}
        </ol>

        <h3 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Formation
        </h3>
        <ul className="space-y-4">
          {education.map((ed) => (
            <li key={ed.id}>
              <p className="font-medium">
                {ed.degree}
                {ed.field ? ` — ${ed.field}` : ""}
              </p>
              <p className="text-sm text-muted-foreground">
                {ed.institution} · {range(ed.startDate, ed.endDate, ed.current)}
              </p>
            </li>
          ))}
        </ul>

        {settingsSeed.showCertifications && certifications.length > 0 && (
          <>
            <h3 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Certifications
            </h3>
            <ul className="space-y-4">
              {certifications.map((c) => (
                <li key={c.id}>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {c.issuer} · {fmtDate(c.issueDate)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>

      {/* Skills */}
      <Section id="skills" title="Compétences">
        <div className="grid gap-6 sm:grid-cols-2">
          {skillsSeed.map((cat) => (
            <div key={cat.id} className="rounded-lg border border-border p-5">
              <h3 className="mb-3 font-semibold">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills
                  .filter((s) => s.visible)
                  .map((s) => (
                    <span
                      key={s.id}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                    >
                      {s.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Notes */}
      {settingsSeed.showNotes && notes.length > 0 && (
        <Section id="notes" title="Notes">
          <div className="space-y-6">
            {notes.map((n) => (
              <article key={n.id} className="rounded-lg border border-border p-6">
                <p className="text-xs text-muted-foreground">
                  {fmtDate(n.publishedAt)} · {n.readingTime} min de lecture
                </p>
                <h3 className="mt-1 font-semibold">{n.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{n.summary}</p>
                <Markdown source={n.body} className="mt-4 text-sm leading-relaxed" />
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">{p.contact.preferred}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {p.contact.showEmail && (
              <a
                href={`mailto:${p.email}`}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {p.email}
              </a>
            )}
            {p.linkedin && (
              <a
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                LinkedIn
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {p.name} — {settingsSeed.tagline}
      </footer>
    </div>
  );
}
