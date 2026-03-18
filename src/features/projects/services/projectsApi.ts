import { api } from '../../../shared/services/api';
import type { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>('/projects');
  return data;
}
