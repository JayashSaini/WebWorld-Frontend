export interface Project {
  title: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Interactive Tutorials",
    description:
      "Engage with hands-on tutorials and coding exercises designed to enhance your learning experience and solidify your web development skills.",
    link: "/tutorials",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of web developers to collaborate, share knowledge, and seek support from peers and experts.",
    link: "/community",
  },
  {
    title: "Expert-Led Courses",
    description:
      "Learn from industry experts with comprehensive courses that cover the latest web development technologies and best practices.",
    link: "/courses",
  },
  {
    title: "Project-Based Learning",
    description:
      "Build real-world projects to apply your skills and create a portfolio that showcases your web development capabilities.",
    link: "/projects",
  },
  {
    title: "Coding Resources",
    description:
      "Access curated resources including articles, videos, and tools to aid your learning and improving your speed.",
    link: "/resources",
  },
  {
    title: "Code Challenges",
    description:
      "Test your skills with coding challenges designed to push your boundaries and improve your problem-solving abilities.",
    link: "/challenges",
  },
];
