export interface Skill {
  name: string;
  level: number;
  description: string;
  experience: string;
  useCase: string;
  projectIds: string[]; // IDs coordinates with project.id (e.g. "oishi-sushi-shop")
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
  skills: Skill[];
}
