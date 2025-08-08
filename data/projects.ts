export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];         // e.g. ["React", "TypeScript", "Tailwind", "Vite"]
  image?: string;         // optional relative path
  href?: string;          // optional external link
  repo?: string;          // optional GitHub
};

export const projects: Project[] = [
  {
    id: "1",
    name: "Patchy",
    description: "Patch the cybersecurity risks in your vibecoded projects with Patchy!",
    tech: ["React", "TypeScript", "Node.js", "OpenAI", "PostgreSQL", "Tailwind"],
    image: "/projects/patchy.png",
    href: "https://resume-builder-demo.com",
    repo: "https://github.com/austinjian/ai-resume-builder"
  },
  {
    id: "2", 
    name: "Proteful",
    description: "A full-stack messaging application with real-time chat, file sharing, and video calling capabilities. Features include user authentication, group chats, and message encryption.",
    tech: ["React", "Socket.io", "Express", "MongoDB", "WebRTC", "JWT"],
    image: "/projects/chat-platform.png",
    href: "https://chat-platform-demo.com",
    repo: "https://github.com/austinjian/realtime-chat"
  },

];