import reactImage from "../assets/languages-icons/react.jpg";
import nextjsImage from "../assets/languages-icons/nextjs.jpg";
import htmlImage from "../assets/languages-icons/html.jpg";
import gitImage from "../assets/languages-icons/git.jpg";
import nodeImage from "../assets/languages-icons/nodejs.jpg";
import mySQLImage from "../assets/languages-icons/mysql.png";

import mysqlImagePoster from "../assets/languages-icons/mysqlposter.jpg";
import reactImagePoster from "../assets/languages-icons/reactposter.png";
import nextImagePoster from "../assets/languages-icons/nextjsposter.png";
import gitImagePoster from "../assets/languages-icons/gitposter.png";
import nodeImagePoster from "../assets/languages-icons/nodejsposter.png";
import htmlImagePoster from "../assets/languages-icons/htmlposter.png";

import { DummyContent } from "../components/ui/cardcarousel";

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

export const cardCarouselData = [
  {
    category: "React.js",
    title: "Explore the Exciting World of React.js.",
    src: reactImage,
    content: (
      <DummyContent
        title="Master React.js: A Complete Guide to Building Dynamic User Interfaces with Hitesh Choudhary."
        paragraph="Immerse yourself in React.js with this in-depth tutorial that covers everything from basic concepts to advanced techniques for creating interactive and high-performance web applications."
        image={reactImagePoster}
      />
    ),
  },

  {
    category: "HTML",
    title: "Fundamentals of HTML.",
    src: htmlImage,
    content: (
      <DummyContent
        title="Get Started with HTML: Essential Techniques and Best Practices for Web Development by Love Babbar."
        paragraph="Dive into HTML with this tutorial designed to help you understand the core elements of web development, from basic tags to advanced structure, ensuring a solid foundation for building websites."
        image={htmlImagePoster}
      />
    ),
  },
  {
    category: "Node.js",
    title: "Deep Dive into Node.js.",
    src: nodeImage,
    content: (
      <DummyContent
        title="Become Proficient in Node.js: In-Depth Lessons and Real-World Examples with Piyush Garg."
        paragraph="Explore server-side JavaScript programming with Node.js through a detailed course that teaches you how to create scalable backend services and applications using practical examples and best practices."
        image={nodeImagePoster}
      />
    ),
  },
  {
    category: "Next.js",
    title: "Advance Your Skills with Next.js.",
    src: nextjsImage,
    content: (
      <DummyContent
        title="Unlock the Power of Next.js: A Step-by-Step Approach to Server-Side Rendering with Hitesh Choudhary."
        paragraph="Learn to build server-side rendered React applications with Next.js through detailed tutorials that guide you in optimizing performance and SEO for modern web applications."
        image={nextImagePoster}
      />
    ),
  },
  {
    category: "Git",
    title: "Master Git Control Skills.",
    src: gitImage,
    content: (
      <DummyContent
        title="Learn Git Efficiently: Practical Techniques for Version Control and Collaboration with Hitesh Choudhary."
        paragraph="Gain expertise in Git with this practical guide that covers fundamental commands, branching strategies, and collaboration techniques to manage your codebase effectively and work seamlessly with teams."
        image={gitImagePoster}
      />
    ),
  },
  {
    category: "My SQL",
    title: "Master My SQL Querying Skills.",
    src: mySQLImage,
    content: (
      <DummyContent
        title="Become Proficient in My SQL: Comprehensive Database Management Techniques and SQL Queries with Prasanth Sir."
        paragraph="Explore the intricacies of My SQL with a detailed guide that walks you through database design, querying, and management, helping you develop strong skills in handling relational data for any application."
        image={mysqlImagePoster}
      />
    ),
  },
];
