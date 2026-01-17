import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  tech_stack: string[];
  features: string[];
  images: string[];
  demo_link: string;
  github_link?: string;
  difficulty: string;
  is_free: boolean;
  is_published: boolean;
  downloads: number;
  purchases: number;
  rating: number;
  tags: string[];
  added_by?: {
    id: string;
    full_name: string;
  };
  created_at: string;
  updated_at: string;
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
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          added_by:profiles(id, full_name)
        `, { count: 'exact' })
        .eq('is_published', true);

      // Apply filters
      if (params?.category) {
        query = query.eq('category', params.category);
      }

      if (params?.isFree !== undefined) {
        query = query.eq('is_free', params.isFree);
      }

      if (params?.search) {
        query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`);
      }

      // Apply sorting
      const sortBy = params?.sortBy || 'created_at';
      const sortOrder = params?.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data: projects, error, count } = await query;

      if (error) {
        throw error;
      }

      const totalPages = Math.ceil((count || 0) / limit);

      return {
        success: true,
        data: {
          projects: projects || [],
          pagination: {
            currentPage: page,
            totalPages,
            totalProjects: count || 0,
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        data: {
          projects: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalProjects: 0,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    }
  },

  async getProjectById(id: string) {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .select(`
          *,
          added_by:profiles(id, full_name)
        `)
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
          data: null
        };
      }

      return {
        success: true,
        message: 'Project fetched successfully',
        data: project
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch project',
        data: null
      };
    }
  },

  async purchaseProject(projectId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      // Get project details
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('price, is_free')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
        return {
          success: false,
          message: 'Project not found'
        };
      }

      if (project.is_free) {
        return {
          success: false,
          message: 'This project is free'
        };
      }

      // Create order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          project_id: projectId,
          amount: project.price,
          status: 'pending'
        });

      if (orderError) {
        return {
          success: false,
          message: orderError.message
        };
      }

      return {
        success: true,
        message: 'Order created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to purchase project'
      };
    }
  },

  async downloadProject(projectId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      // Check if user has purchased the project or if it's free
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('is_free')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
        return {
          success: false,
          message: 'Project not found'
        };
      }

      if (!project.is_free) {
        // Check if user has purchased
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('status')
          .eq('user_id', user.id)
          .eq('project_id', projectId)
          .eq('status', 'completed')
          .single();

        if (orderError || !order) {
          return {
            success: false,
            message: 'You need to purchase this project first'
          };
        }
      }

      // Increment download count
      const { data: currentProject } = await supabase
        .from('projects')
        .select('downloads')
        .eq('id', projectId)
        .single();

      if (currentProject) {
        await supabase
          .from('projects')
          .update({ downloads: (currentProject.downloads || 0) + 1 })
          .eq('id', projectId);
      }

      return {
        success: true,
        message: 'Download started'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to download project'
      };
    }
  },

  async addReview(projectId: string, data: { rating: number; comment: string }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      const { error } = await supabase
        .from('project_reviews')
        .upsert({
          project_id: projectId,
          user_id: user.id,
          rating: data.rating,
          comment: data.comment
        });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Review added successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add review'
      };
    }
  },

  // Admin only
  async createProject(data: Partial<Project>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          ...data,
          added_by: user.id
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Project created successfully',
        data: project
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create project'
      };
    }
  },

  async updateProject(id: string, data: Partial<Project>) {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Project updated successfully',
        data: project
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update project'
      };
    }
  },

  async deleteProject(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete project'
      };
    }
  }
};
