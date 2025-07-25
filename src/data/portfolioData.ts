const images = import.meta.glob('../assets/*.png', { eager: true, as: 'url' });

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'design' | 'ai';
  featured: boolean;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export const personalInfo = {
  name: "Michael Anagnostou",
  title: "Computer Science Student & Front-End Developer",
  tagline: "Undergraduate Computer Science student at DUTH from Greece, passionate about building intuitive user experiences",
  bio: "I am a Computer Science student at DUTH and an aspiring developer. I am continuously learning new tools and technologies to expand my skillset, and i love not only making things that work good , but also feel good to use.",
  location: "Greece",
  email: "mixalhsanagnostou2003@gmail.com",
  phone: "+30 6983718542",
  social: {
    github: "https://www.github.com/mianagn",
    linkedin: "https://www.linkedin.com/in/mixalis-anagnostou-9650a4297/",
    twitter: "https://www.instagram.com/mixalhs_anagnwstou_/",
    website: "https://mianagn.github.io"
  }
};

export const experiences: Experience[] = [
  {
    company: "Kavala,Greece",
    position: "Computer Science Student",
    period: "2021 - Present",
    description: "Currently pursuing a degree in Computer Science at DUTH while building projects and expanding my skillset.",
    achievements: [
      "Built desktop applications",
      "Integrated third-party APIs",
      "Built products with real world applications ",
      "Continuously learning new technologies and frameworks"
    ]
  },
  {
    company: "Seeking Opportunities",
    position: "Internship , Junior Positions and Freelance Work",
    period: "Available Now",
    description: "Seeking intern and junior developer positions as well as freelance work to gain hands-on experience. Mainly looking for jobs in Thessaloniki , but open to remote work.",
    achievements: [
      "Open to learning new technologies",
      "Eager to contribute to real-world projects",
      "Strong foundation in web development",
      "Passionate about user experience design"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portfolio",
    description: "A modern, interactive portfolio built with React, TailwindCSS",
    longDescription: "This is my personal portfolio website. It is built with React, it forms a central hub for my work, skills, and contact information.",
    technologies: ["React", "TypeScript", "CSS"],
    image: "portfolio.png",
    githubUrl: "https://github.com/mianagn/mianagn.github.io",
    liveUrl: "https://mianagn.github.io",
    category: "web",
    featured: true
  },
  {
    id: "2",
    title: "Jamming",
    description: "A web app that integrates the Spotify API to create playlists, built with React",
    longDescription: "A React-based web application that connects to the Spotify API, allowing users to search for songs, create custom playlists, and save them directly to their Spotify account. Features include real-time search, playlist management, and seamless Spotify integration with OAuth authentication.",
    technologies: ["React", "JavaScript", "Spotify API", "CSS", "OAuth"],
    image: "jamming.png",
    githubUrl: "https://github.com/mianagn/Jamming",
    category: "web",
    featured: true
  },
  {
    id: "3",
    title: "Budget Tracker",
    description: "A transaction tracking desktop app that tracks your statistics, built with JavaFX",
    longDescription: "A comprehensive desktop application for personal finance management built with JavaFX. Features include transaction logging, expense categorization, statistical analysis, and visual charts for spending patterns. The app provides insights into financial habits and helps users manage their budgets effectively.",
    technologies: ["Java", "JavaFX", "Scene Builder", "CSS"],
    image: "budgetTracker.png",
    githubUrl: "https://github.com/mianagn/BudgetTracker",
    category: "design",
    featured: true
  },
  {
    id: "4",
    title: "ezoumpouli",
    description: "A modern B2C website built with Astro and Sanity for an agricultural supplies shop.",
    longDescription: "This project is a freelance project i made for a local agricultural supplies shop. It utilizes Astro and Sanity for managing the content and products seamlessly. Deployed with Netlify.",
    technologies: ["Astro", "Sanity","CSS"],
    image: "zoumpoulis.png",
    liveUrl: "https://ezoumpouli.gr",
    category: "web",
    featured: true
  },
  {
    id: "5",
    title: "promotelio",
    description: "A modern B2B website built with Astro and Sanity for a hotel supplying business.",
    longDescription: "This was my first freelance project i made for a hotel supplying business. It utilizes Astro and Sanity for managing the content and products seamlessly. Deployed with Netlify.",
    technologies: ["Astro", "Sanity", "CSS"],
    image: "zografos.png",
    liveUrl: "https://promotelio.gr",
    category: "web",
    featured: true
  },
  {
    id: "6",
    title: "Gainly",
    description: "A all-in-one platform for managing your finances that uses AI and forecasting for personalised advice ,built with React and Firebase.",
    longDescription: "An all-in-one web application for managing your finances that features an AI assistant tailored to your needs built with React and Firebase. It features managment of debt , budget , savings , investment  and more. This project is still in development and will be my assertation project. Please contact me if you wish to use the AI assistant , as it is turned off by default to limit API consumption.",
    technologies: ["React","TypeScript", "Firebase", "CSS"],
    image: "gainly.png",
    liveUrl: "https://gainly-25b89.web.app/",
    category: "web",
    featured: true
  }
];