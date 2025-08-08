export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];         // e.g. ["React", "TypeScript", "Tailwind", "Vite"]
  image?: string;         // optional relative path
  href?: string;          // optional external link
  repo?: string;          // optional GitHub
  // Optional YouTube preview configuration
  youtubeId?: string;     // e.g. "fSHdDeWpffU"
  youtubeStart?: number;  // seconds
  youtubeEnd?: number;    // seconds
  // Optional local/video preview
  video?: string;         // e.g. "/projects/patchy.mp4"
};

export const projects: Project[] = [
  {
    id: "1",
    name: "Patchy",
    description: "Patch the cybersecurity risks in your vibecoded projects with Patchy! Patchy automatically identifies and patches vulnerabilities in your code after you give a link to your GitHub repository.",
    tech: ["React", "TypeScript", "OpenAI API", "GitHub API", "Tailwind CSS", "Vellum"],
    image: "/projects/patchy.png",
    href: "https://youtu.be/fSHdDeWpffU?si=51HC8X3JH0pW6ALI",
    repo: "https://github.com/austinjiann/Patchy",
    youtubeId: "fSHdDeWpffU",
    youtubeStart: 56,
    youtubeEnd: 150,
    video: "/projects/patchy.mp4"
  },
  {
    id: "2", 
    name: "Proteful",
    description: "Proteful is a mobile app that provides a real-time heatmap that indicates where dangerous protests are located. Through crowd-sourced reports, users can drop a “pin,” which consists of a radius, photo, and note to flag hazards.",
    tech: ["React Native", "TypeScript", "Firebase", "Gemini API", "Google Maps SDK", "Expo"],
    image: "/projects/proteful.png",
    href: "https://youtu.be/Id7Y1Aai_jI?si=HJmRmBmDuTV2l3cO",
    repo: "https://github.com/austinjiann/Proteful"
  },

];