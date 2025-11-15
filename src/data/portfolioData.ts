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
  bio: "I am a Computer Science student at DUTH and an aspiring developer. I am continuously learning new tools and technologies to expand my skillset, and I love not only making things that work well, but also feel good to use.",
  location: "Greece",
  email: "mixalhsanagnostou2003@gmail.com",
  phone: "+30 6983718542",
  social: {
    github: "https://www.github.com/mianagn",
    linkedin: "https://www.linkedin.com/in/mixalis-anagnostou-9650a4297/",
    instagram: "https://www.instagram.com/mixalhs_anagnwstou_/",
    website: "https://mianagn.github.io"
  }
};

export const experiences: Experience[] = [
  {
    company: "Remote",
    position: "Freelance Web Developer",
    period: "June 2025 - Present",
    description: "I currently work as a Freelance Web Developer, building websites and web applications for clients. My work can be viewed on the project section",
    achievements: [
      "Designed and deployed B2C and B2B websites for retail businesses",
      "Modern and responsive websites",
      "Easy to use CMS for clients to manage their content",
      "Cost effective solutions"
    ]
  },
  {
    company: "Kavala,Greece",
    position: "Computer Science Student",
    period: "2021 - Present",
    description: "Currently pursuing a degree in Computer Science at DUTH while building projects and expanding my skillset.",
    achievements: [
      "Built desktop applications",
      "Integrated third-party APIs",
      "Built products with real-world applications",
      "Continuously learning new technologies and frameworks"
    ]
  }

];

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portfolio",
    description: "A modern, interactive portfolio built with React, TailwindCSS",
    longDescription: "This is my personal portfolio website built with React and TypeScript. It serves as a central hub for my work, skills, and contact information, showcasing my projects and professional journey.",
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
    longDescription: "This is a freelance project I created for a local agricultural supplies shop. It utilizes Astro and Sanity for managing content and products seamlessly. The site features a modern, responsive design and is deployed with Netlify.",
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
    longDescription: "This was my first freelance project, created for a hotel supplying business. It utilizes Astro and Sanity for managing content and products seamlessly. The site features a professional B2B design and is deployed with Netlify.",
    technologies: ["Astro", "Sanity", "CSS"],
    image: "zografos.png",
    liveUrl: "https://promotelio.gr",
    category: "web",
    featured: true
  },
  {
    id: "6",
    title: "Gainly",
    description: "An all-in-one SAAS for managing your finances that uses AI and forecasting for personalized advice, built with React and Firebase.",
    longDescription: "An all-in-one web application for managing your finances that features an AI assistant tailored to your needs, built with React and Firebase. It features management of debt, budget, savings, investments, and more. This project is still in development and will be my dissertation project. Please contact me if you wish to use the AI assistant, as it is turned off by default to limit API consumption.",
    technologies: ["React","TypeScript", "Firebase", "CSS"],
    image: "gainly.png",
    liveUrl: "https://gainly-25b89.web.app/",
    category: "web",
    featured: true
  }
];