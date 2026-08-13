// ─────────────────────────────────────────────────────────────
//  SITE CONTENT — English version
//  Chinese content lives in data.ts (default language).
// ─────────────────────────────────────────────────────────────

import type { Content } from "./data";

export const en: Content = {
  meta: {
    title: "Coder { Federico Prask }",
    name: "Federico Prask",
    handle: "@yourname",
    role: "Student",
    tagline: "student · creativity · tech",
    email: "hello@yourdomain.com",
    location: "Changsha, CN",
    status: "Working",
    since: 2016,
    github: "https://github.com/Federico-Prask",
    bilibili: "https://space.bilibili.com/1821911503",
  },
  nav: [
    { id: "about", label: "About" },
    { id: "stack", label: "Honors" },
    { id: "work", label: "Work" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Contact" },
  ],
  ticker: [
    "Art",
    "Inspiration",
    "Composing",
    "Passion",
    "Development",
    "Performance",
    "Life",
    "Planning",
    "Competition",
    "Creativity",
    "Gaming",
    "Management",
    "Animation",
  ],
  principle:
    "From learning to applying, and then to loving — technology runs through my life.",
  profile: [
    ["name", "Federico Prask"],
    ["role", "Student"],
    ["loc", "Changsha, CN"],
    ["aim", "Do work I love"],
    ["dream", "Become a teacher"],
  ],
  focus: [
    { label: "Art", pct: 13 },
    { label: "OI", pct: 56 },
    { label: "Organization", pct: 37 },
    { label: "CTF", pct: 19 },
    { label: "Development", pct: 29 },
  ],
  stack: [
    {
      id: "A1",
      title: "Grand Award - Middle School Textbook Drama / Historical Drama Troupe",
      tags: ["Director & Actor"],
    },
    {
      id: "A2",
      title: "Grand Award - High School English Dubbing Contest (Team)",
      tags: ["Planning & Dubbing"],
    },
    {
      id: "A3",
      title: "Bronze - National Olympiad in Informatics in Provinces (NOIP)",
      tags: ["OIer"],
    },
    {
      id: "A4",
      title: "First Prize - Song Qingling Youth Invention Award",
      tags: ["Code & Design"],
    },
  ],
  projects: [
    {
      title: "LSOI",
      year: "2025",
      desc: "Official website of LSGJOI",
      tags: ["Vue", "WebSocket", "Vite", "Tailwind CSS"],
      demo: "#",
      source: "https://github.com/yourname",
    },
    {
      title: "G2501",
      year: "2025",
      desc: "Class website of G2501",
      tags: ["React", "Vite+"],
      demo: "#",
      source: "https://github.com/yourname",
    },
    {
      title: "Word Memorizer (Ver3.0)",
      year: "2026",
      desc: "A vocabulary memorization app that theoretically works on most Linux distributions",
      tags: ["C++", "Learn", "GTK", "Vocabulary"],
      demo: "#",
      source: "https://github.com/yourname",
    },
    {
      title: "Future Project",
      year: "Future",
      desc: "Still on the way — stay tuned",
      tags: ["UNKNOWN"],
      demo: "#",
      source: "",
      future: true,
    },
  ],
  experience: [
    {
      period: "2020",
      role: "Self-taught Development",
      company: "Personal Interest",
      type: "Exploration",
      points: [
        "Started programming in elementary school and have been learning ever since.",
        "With my skills in programming, I have earned some awards & certifications.",
      ],
    },
    {
      period: "2023",
      role: "Director & Screenwriter & Actor",
      company: "Middle School Class Troupe",
      type: "Performance",
      points: [
        "Led the class team in school textbook/historical dramas, winning the school's top prize.",
        "Served as both director and actor, handling action choreography and script writing.",
      ],
    },
    {
      period: "2023 — NOW",
      role: "OIer · CTFer",
      company: "Informatics & Security",
      type: "Competition",
      points: [
        "Won a bronze medal in the National Olympiad in Informatics in Provinces (NOIP).",
        "Keep honing skills through CTF competitions.",
      ],
    },
    {
      period: "2025 — NOW",
      role: "Personal Development",
      company: "Campus Projects",
      type: "Apps",
      points: [
        "Built LSOI for the LSGJ informatics team and G2501, a website for my class.",
        "Developed Word Memorizer, a Linux vocabulary app so teammates could study in the competition room.",
      ],
    },
  ],
};
