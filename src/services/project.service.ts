import api from '../lib/api';

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  techStack: string[];
  features: string[];
  images: string[];
  demoLink: string;
  githubLink?: string;
  difficulty: string;
  isFree: boolean;
  isPublished: boolean;
  downloads: number;
  purchases: number;
  rating: number;
  tags: string[];
  addedBy: {
    _id: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  success: boolean;
  data: {
    projects: Project[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProjects: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export const projectService = {
  async getAllProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    isFree?: boolean;
  }): Promise<ProjectsResponse> {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  async getProjectById(id: string) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async purchaseProject(projectId: string) {
    const response = await api.post(`/projects/${projectId}/purchase`);
    return response.data;
  },

  async downloadProject(projectId: string) {
    const response = await api.post(`/projects/${projectId}/download`);
    return response.data;
  },

  async addReview(projectId: string, data: { rating: number; comment: string }) {
    const response = await api.post(`/projects/${projectId}/review`, data);
    return response.data;
  },

  // Admin only
  async createProject(data: Partial<Project>) {
    const response = await api.post('/projects', data);
    return response.data;
  },

  async updateProject(id: string, data: Partial<Project>) {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id: string) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};
