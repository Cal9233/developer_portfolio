export interface Skill {
  name: string;
  level: number;
  tags: string[];
  isRuby?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  emoji: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

export interface SandboxProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  url: string;
  features: string[];
  technologies: string[];
  links: {
    demo: string;
    secondary?: {
      text: string;
      href: string;
    };
  };
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: 'github' | 'linkedin' | 'email';
}