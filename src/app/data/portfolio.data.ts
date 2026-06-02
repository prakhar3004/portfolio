/**
 * Central content for the portfolio. Edit values here — all sections read from this.
 */

export const PROFILE = {
  name: 'Prakhar Shukla',
  firstName: 'Prakhar',
  lastName: 'Shukla',
  location: 'Gurgaon, India',
  email: 'thinkprakhar1998@gmail.com',
  phone: '+91 8853688831',
  github: 'https://github.com/prakhar3004',
  linkedin: 'https://linkedin.com/in/prakhar-shukla-6764ab196',
  roles: [
    'Full Stack Developer',
    'Angular Expert',
    '.NET Core Engineer',
    'AI-Augmented Developer',
  ],
  tagline:
    'Innovative, performance-driven engineer crafting fast, scalable, user-focused web apps — Angular frontends powered by .NET Core backends, accelerated with AI.',
  about:
    'I build enterprise-grade web applications with a strong focus on component-based architecture, performance tuning, and clean code. Over 3+ years I have shipped features across catering and fleet-management platforms, fixed 70+ bugs, and refactored 50+ legacy components. Today I pair that craft with AI tools — Claude, GPT and Antigravity — to design, debug and ship faster than ever.',
} as const;

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: '4+', label: 'Years Experience' },
  { value: '70+', label: 'Bugs Resolved' },
  { value: '25%', label: 'Faster Load Times' },
  { value: '10+', label: 'CSTAR Awards' },
];

export interface SkillGroup {
  title: string;
  icon: string; // single emoji / glyph
  accent: 'cyan' | 'violet' | 'magenta' | 'lime';
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: '⬡',
    accent: 'cyan',
    skills: [
      'Angular 12–21',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3 / SCSS',
      'Angular Material',
      'RxJS',
      'NgRx',
      'Reactive Forms',
      'Bootstrap',
    ],
  },
  {
    title: 'Backend',
    icon: '◈',
    accent: 'violet',
    skills: [
      'ASP.NET Core',
      'ASP.NET Core Web API',
      'C#',
      '.NET Function Apps',
      'Entity Framework',
      'RESTful APIs',
    ],
  },
  {
    title: 'AI & Automation',
    icon: '✦',
    accent: 'magenta',
    skills: [
      'Claude (Anthropic)',
      'GPT / ChatGPT',
      'Antigravity',
      'AI-Augmented Development',
      'Prompt Engineering',
      'AI Code Review',
    ],
  },
  {
    title: 'Database',
    icon: '▦',
    accent: 'lime',
    skills: ['MS SQL Server', 'LINQ', 'SQL Queries', 'Data Modeling'],
  },
  {
    title: 'Testing & DevOps',
    icon: '◇',
    accent: 'cyan',
    skills: [
      'Karma / Jasmine',
      'xUnit',
      'TDD',
      'Git',
      'Postman',
      'Azure DevOps',
      'Microsoft Azure',
      'CI/CD',
    ],
  },
  {
    title: 'Practices',
    icon: '⬢',
    accent: 'violet',
    skills: [
      'Clean Code',
      'Component-Based Design',
      'Performance Optimization',
      'Agile / Scrum',
      'SOLID Principles',
    ],
  },
];

/** Highlighted AI tools for the hero / dedicated AI strip */
export const AI_TOOLS = [
  { name: 'Claude', tag: 'Anthropic' },
  { name: 'GPT', tag: 'OpenAI' },
  { name: 'Antigravity', tag: 'Agentic IDE' },
];

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Technical Lead',
    company: 'ReconPro',
    location: 'Gurgaon, India',
    period: 'Jun 2025 — Present',
    summary:
      'Building modern, performant web experiences with Angular — turning product ideas into clean, scalable, AI-augmented frontends.',
    bullets: [
      'Develop and ship responsive Angular features using TypeScript, RxJS and reusable component architecture.',
      'Integrate REST APIs and optimize rendering for fast, real-time user interfaces.',
      'Pair daily with AI tools (Claude, GPT, Antigravity) to accelerate development, reviews and debugging.',
      'Collaborate in Agile sprints with design, backend and QA to deliver on time.',
    ],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Civica India',
    location: 'Gujarat, India',
    period: 'Jan 2022 — May 2025',
    summary:
      'Full-stack delivery on public-sector platforms — leading Angular development with .NET Core backends across catering and fleet-management products.',
    bullets: [
      'Led Angular component development for nutritional tracking, allergen alerts and reporting dashboards.',
      'Fixed 40+ bugs and optimized performance, achieving 25% faster page load times.',
      'Ensured seamless cross-browser & mobile experience across 5+ major browsers.',
      'Integrated REST APIs for real-time data rendering and live dashboards.',
      'Refactored 50+ legacy components, improving maintainability and cutting load time 15%.',
      'Drove Agile delivery, maintaining a 90% on-time milestone rate. Earned 10+ CSTAR awards.',
    ],
  },
];

export interface Project {
  name: string;
  category: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  accent: 'cyan' | 'violet' | 'magenta';
}

export const PROJECTS: Project[] = [
  {
    name: 'Saffron',
    category: 'Catering Management Software',
    blurb:
      'A public-sector solution for menu planning, stock control and procurement — built for scale and accessibility.',
    highlights: [
      'Angular UI for menus, stock & procurement workflows',
      '25% improvement in page load times',
      'Cross-browser + mobile accessibility',
      'Live data dashboards via REST API integration',
    ],
    stack: ['Angular', '.NET Core', 'RxJS', 'MS SQL', 'Azure DevOps'],
    accent: 'cyan',
  },
  {
    name: 'TranSend',
    category: 'Fleet Management Platform',
    blurb:
      'A large-scale fleet solution minimizing vehicle downtime through tracking, maintenance scheduling and driver reporting.',
    highlights: [
      'Vehicle tracking, maintenance & driver-reporting modules',
      'Resolved 30+ bugs; 20% reduction in reported issues',
      'Real-time data via REST API integration',
      'Refactored legacy code for maintainability',
    ],
    stack: ['Angular', 'ASP.NET Core', 'Entity Framework', 'C#', 'LINQ'],
    accent: 'violet',
  },
];

export interface Achievement {
  title: string;
  detail: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: '10+ CSTAR Awards',
    detail:
      "Civica's internal recognition — earned 10+ CSTAR awards for outstanding UI development and consistently meeting critical milestones with remarkable quality.",
  },
  {
    title: '90% On-Time Delivery',
    detail:
      'Maintained a 90% on-time milestone rate across Agile sprints, collaborating closely with QA and backend teams.',
  },
];

export const EDUCATION = {
  degree: 'Bachelor of Computer Application (BCA)',
  school: 'Chhatrapati Shahu Ji Maharaj University, Kanpur',
  period: 'Aug 2018 — Aug 2021',
  detail:
    'Built strong CS foundations in C, C++ and Core Java — grounding in OOP and SOLID principles.',
};

export const LANGUAGES = ['Hindi', 'English'];
