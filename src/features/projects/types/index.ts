export interface Project {
  id: number;
  title: string;
  tag: string;
  description: string;
  image: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
  images?: string[];
  details?: string;
}
