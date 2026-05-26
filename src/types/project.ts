export interface RHPath {
  context: string;
  solution: string;
  results: string[];
}

export interface TechMetrics {
  seo: number;
  performance: number;
  accessibility: number;
}

export interface TechPath {
  architecture: string;
  challenges: string[];
  metrics?: TechMetrics;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface ProjectImages {
  mockup: string;
  thumbnail: string;
  gallery?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  teamSize?: number;
  teamRole?: string;
  stack: string[];
  status: string;
  demoUrl?: string;
  githubUrl?: string;
  images: ProjectImages;
  rhPath: RHPath;
  techPath: TechPath;
  codeSnippet?: CodeSnippet;
}
