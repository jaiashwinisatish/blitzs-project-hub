import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, Developer, UserProfile, DashboardStats } from '../services/admin.service';

export const useDevelopers = () => {
  return useQuery({
    queryKey: ['developers'],
    queryFn: () => adminService.getAllDevelopers(),
    select: (data) => data.success ? data.data : [],
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => adminService.getDashboardStats(),
    select: (data) => data.success ? data.data : null,
  });
};

export const useUsers = (options?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}) => {
  return useQuery({
    queryKey: ['users', options],
    queryFn: () => adminService.getAllUsers(options),
    select: (data) => data.success ? data : null,
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      adminService.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useAdminProjects = (options?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['admin-projects', options],
    queryFn: () => adminService.getAllProjects(options),
    select: (data) => data.success ? data : null,
  });
};

export const useClientRequests = (options?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
}) => {
  return useQuery({
    queryKey: ['client-requests', options],
    queryFn: () => adminService.getAllClientRequests(options),
    select: (data) => data.success ? data : null,
  });
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, updateData }: { requestId: string; updateData: any }) =>
      adminService.updateRequestStatus(requestId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-requests'] });
    },
  });
};

export const useAddDeveloper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (developerData: Omit<Developer, 'id' | 'created_at' | 'updated_at'>) =>
      adminService.addDeveloper(developerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
    },
  });
};

export const useUpdateDeveloper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ developerId, updateData }: { developerId: string; updateData: Partial<Developer> }) =>
      adminService.updateDeveloper(developerId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
    },
  });
};

export const useDeleteDeveloper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (developerId: string) => adminService.deleteDeveloper(developerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developers'] });
    },
  });
};