import type { Certification, Education, Experience } from "@/lib/types";

// Demo entries — replace via the admin dashboard.
export const experiencesSeed: Experience[] = [
  {
    id: "e1", position: "Software Developer", organization: "Example Company", employmentType: "Full-time",
    location: "Remote", startDate: "2025-01-01", current: true,
    description: "Placeholder role. Describe the product, the team and your scope.",
    responsibilities: ["Build and maintain frontend features", "Review pull requests"],
    achievements: ["Demo achievement — replace"], technologies: ["React", "TypeScript", "PostgreSQL"],
    relatedProjects: ["p1"], publication: "published", order: 1,
  },
  {
    id: "e2", position: "Frontend Developer (Freelance)", organization: "Independent", employmentType: "Freelance",
    location: "Lomé", startDate: "2023-06-01", endDate: "2024-12-31", current: false,
    description: "Placeholder freelance period.", responsibilities: ["Client websites and small web apps"],
    achievements: [], technologies: ["Astro", "Tailwind CSS"], relatedProjects: ["p3"], publication: "published", order: 2,
  },
  {
    id: "e3", position: "Software Engineering Intern", organization: "Example Studio", employmentType: "Internship",
    startDate: "2022-07-01", endDate: "2022-12-31", current: false, description: "Placeholder internship.",
    responsibilities: [], achievements: [], technologies: ["JavaScript"], relatedProjects: [], publication: "published", order: 3,
  },
];

export const educationSeed: Education[] = [
  {
    id: "ed1", institution: "Example University", degree: "Bachelor's degree", field: "Computer Science", kind: "University",
    startDate: "2019-09-01", endDate: "2022-07-01", current: false,
    description: "Placeholder programme description.", subjects: ["Algorithms", "Databases", "Networks"],
    achievements: [], relatedSkills: ["Java", "SQL"], publication: "published", order: 1,
  },
  {
    id: "ed2", institution: "Online course provider", degree: "Course", field: "Web accessibility", kind: "Course",
    startDate: "2024-02-01", endDate: "2024-03-01", current: false, subjects: ["ARIA", "Keyboard patterns"],
    achievements: [], relatedSkills: ["Accessibility"], publication: "published", order: 2,
  },
];

export const certificationsSeed: Certification[] = [
  {
    id: "c1", name: "Example certification (replace)", issuer: "Issuer name", issueDate: "2024-05-01",
    credentialId: "DEMO-0000", verificationUrl: "https://example.com",
    description: "Placeholder certificate — no real credential is claimed.", relatedSkills: ["Cloud"],
    publication: "published", order: 1,
  },
];
