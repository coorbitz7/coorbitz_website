// Placeholder job openings — replace/update as roles open and close.
export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  responsibilities: string[];
  requirements: string[];
  datePosted: string; // ISO date, used for JobPosting structured data
};

export const jobOpenings: JobOpening[] = [
  {
    id: "ai-ml-engineer-intern",
    title: "AI/ML Engineer Intern",
    department: "AI Solutions",
    location: "Remote / Hybrid (India)",
    type: "Internship",
    description:
      "Join our AI Solutions team to help build and ship real machine learning features for client products — a hands-on internship, not busywork, working alongside senior engineers on production AI systems.",
    responsibilities: [
      "Build AI/ML models",
      "Work with Python",
      "Data preprocessing",
      "Model evaluation",
      "Collaborate with the development team",
    ],
    requirements: [
      "Python",
      "Machine Learning fundamentals",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Good problem-solving skills",
    ],
    datePosted: "2026-07-01",
  },
];

export const internshipInfo = {
  title: "Internship Program",
  description:
    "Our 3–6 month internship program pairs students and recent graduates with senior engineers and designers on real client projects — not busywork. Open year-round for engineering, design, and AI/ML tracks.",
  tracks: ["Software Engineering", "AI & Machine Learning", "UI/UX Design", "Digital Marketing"],
};
