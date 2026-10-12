import type { CvDocument, Profile } from "@/lib/types";

// Demo content — replace with your own in Admin → Profile.
export const profileSeed: Profile = {
  name: "Maxime Defaleouna",
  title: "Software Developer",
  monogram: "MD",
  bio: "I build web and mobile software with a focus on clear interfaces, maintainable architecture and products that hold up in daily use.",
  location: "Lomé, Togo",
  email: "hello@example.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  website: "",
  currentFocus:
    "Designing a typed content platform with a clean separation between UI and data layers.",
  learning: ["Rust", "Distributed systems", "Accessibility (WCAG 2.2)"],
  availability: { status: "open", note: "Open to full-time roles and selected freelance work." },
  highlights: [
    "Demo highlight — replace with a real milestone",
    "Demo highlight — shipped a project to production",
  ],
  about: {
    introduction:
      "This is placeholder biography text. Use the profile editor to describe who you are and what you build.",
    background:
      "Describe your path into software: studies, first projects, the teams you have worked with.",
    interests: "Interfaces, developer tooling, data-heavy applications, performance.",
    philosophy:
      "Prefer simple systems that are easy to change. Make state explicit. Measure before optimising.",
    objectives: "Grow into a role where product thinking and engineering depth meet.",
    learningGoals: "Deepen backend architecture skills and systems programming.",
  },
  contact: { showEmail: true, acceptForm: true, preferred: "Email or LinkedIn message" },
};

export const cvSeed: CvDocument = {
  displayName: "Curriculum Vitae",
  description: "One-page résumé covering experience, education and skills.",
};
