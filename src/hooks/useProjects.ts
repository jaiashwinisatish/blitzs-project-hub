import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, Project } from '../services/project.service';

export const useProjects = (options?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isFree?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  return useQuery({
    queryKey: ['projects', options],
    queryFn: () => projectService.getAllProjects(options),
    select: (data) => data.success ? data.data : [],
  });
};

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getProjectById(projectId),
    enabled: !!projectId,
    select: (data) => data.success ? data.data : null,
  });
};

export const usePurchaseProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectService.purchaseProject(projectId),
    onSuccess: () => {
      // Invalidate and refetch projects and user purchases
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['user-purchases'] });
    },
  });
};

export const useUserPurchases = () => {
  return useQuery({
    queryKey: ['user-purchases'],
    queryFn: () => projectService.getUserPurchases(),
    select: (data) => data.success ? data.data : [],
  });
};

// Admin hooks
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'downloads' | 'purchases' | 'rating'>) =>
      projectService.createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, updateData }: { projectId: string; updateData: Partial<Project> }) =>
      projectService.updateProject(projectId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => projectService.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};