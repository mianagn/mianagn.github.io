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
  bio: "I am a Computer Science student at DUTH from Greece and an aspiring front-end developer. I am continuously learning new tools and technologies to expand my skillset, and i love not only making things that work good , but also feel good to use.",
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
    company: "Self-Directed Learning",
    position: "Computer Science Student",
    period: "2021 - Present",
    description: "Currently pursuing Computer Science degree at DUTH while building practical projects and expanding technical skills.",
    achievements: [
      "Built desktop applications with JavaFX",
      "Integrated third-party APIs like Spotify API",
      "Built B2C and B2B websites with Astro and Sanity for real world applications ",
      "Continuously learning new technologies and frameworks"
    ]
  },
  {
    company: "Seeking Opportunities",
    position: "Internship , Junior Positions and Freelance Work",
    period: "Available Now",
    description: "Currently seeking internship , junior developer positions and freelance work to gain hands-on experience in the field of Computer Science.",
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
    description: "A modern, interactive portfolio built with React, TailwindCSS, and Astro, featuring smooth animations and a beautiful UI.",
    longDescription: "A fully responsive and visually engaging personal portfolio website built with React, TailwindCSS, and Astro. It features dynamic theme switching, smooth animations, project showcases, and a focus on user experience and modern web design. The site is optimized for performance and accessibility, and serves as a central hub for my work, skills, and contact information.",
    technologies: ["React", "TypeScript", "CSS"],
    image: "assets/portfolio.png",
    githubUrl: "https://github.com/mianagn/PersonalPortfolio",
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
    image: "assets/jamming.png",
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
    image: "assets/budgetTracker.png",
    githubUrl: "https://github.com/mianagn/BudgetTracker",
    category: "design",
    featured: true
  },
  {
    id: "4",
    title: "xarhszoumboulhs",
    description: "A modern B2C website built with Astro and Sanity for an agricultural supplies shop.",
    longDescription: "Α modern B2C website built with Astro and Sanity for an agricultural supplies shop. The site features a clean, modern design, dynamic content management, and a seamless shopping experience for customers.",
    technologies: ["Astro", "Sanity","CSS"],
    image: "assets/zoumpoulis.png",
    liveUrl: "https://zoumboulisike.netlify.app",
    category: "web",
    featured: true
  },
  {
    id: "5",
    title: "zografosHotel",
    description: "A modern B2B website built with Astro and Sanity for seamless scalability and full customization of content and products.",
    longDescription: "A modern B2B website built with Astro and Sanity for seamless scalability and full customization of content and products. Designed for business clients, it offers advanced content management, product catalog features, and a robust, scalable architecture.",
    technologies: ["Astro", "Sanity", "CSS"],
    image: "assets/zografos.png",
    liveUrl: "https://zografosHotel.netlify.app",
    category: "web",
    featured: true
  }
];