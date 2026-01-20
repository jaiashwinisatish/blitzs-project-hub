import { createClient } from '@supabase/supabase-js';

// Direct Supabase client with correct API key
const supabase = createClient(
  'https://afgromdzethkscaskofz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ3JvbWR6ZXRoZ3Nrc2Fza29meiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzA4NzI4NzAwLCJleHAiOjIwMjQzMDQ3MDB9.3Qk4mYVjZkT2Q8Y3n4X7wP6qL8vR9zX1K2mN8o3dF4'
);

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
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
  createdAt: string;
  updatedAt: string;
}

export const projectService = {
  async getAllProjects(options?: any) {
    console.log('Fetching projects from Supabase...', options);
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('is_published', true);

      // Apply filters
      if (options?.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }
      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }
      if (options?.isFree !== undefined) {
        query = query.eq('is_free', options.isFree === 'true');
      }

      // Apply sorting
      if (options?.sortBy) {
        switch (options.sortBy) {
          case 'price':
            query = query.order('price', { ascending: true });
            break;
          case '-price':
            query = query.order('price', { ascending: false });
            break;
          case 'purchases':
            query = query.order('purchases', { ascending: false });
            break;
          case 'rating':
            query = query.order('rating', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const page = options?.page || 1;
      const limit = options?.limit || 12;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;

      console.log('Supabase projects response:', { data, error, count });

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      console.log('Projects found:', data?.length || 0);
      return {
        success: true,
        data: {
          projects: data || [],
          pagination: {
            currentPage: page,
            totalPages: Math.ceil((count || 0) / limit),
            totalProjects: count || 0
          }
        }
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: 'Failed to fetch projects'
      };
    }
  },

  async getProjectById(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('_id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return {
          success: false,
          message: 'Project not found'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      return {
        success: false,
        message: 'Failed to fetch project'
      };
    }
  },

  async getProjectBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching project by slug:', error);
        return {
          success: false,
          message: 'Project not found'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching project by slug:', error);
      return {
        success: false,
        message: 'Failed to fetch project'
      };
    }
  },

  async purchaseProject(projectId: string) {
    try {
      // First get the project
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('_id', projectId)
        .single();

      if (fetchError) {
        console.error('Error fetching project:', fetchError);
        return {
          success: false,
          message: 'Project not found'
        };
      }

      // Update purchases count
      const { error: updateError } = await supabase
        .from('projects')
        .update({ purchases: (project?.purchases || 0) + 1 })
        .eq('_id', projectId);

      if (updateError) {
        console.error('Error purchasing project:', updateError);
        return {
          success: false,
          message: 'Failed to purchase project'
        };
      }

      return {
        success: true,
        message: 'Project purchased successfully!',
        data: {
          isFree: project?.isFree ?? false
        }
      };
    } catch (error) {
      console.error('Error purchasing project:', error);
      return {
        success: false,
        message: 'Failed to purchase project'
      };
    }
  },

  async createProject(projectData: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return {
          success: false,
          message: 'Failed to create project'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error creating project:', error);
      return {
        success: false,
        message: 'Failed to create project'
      };
    }
  },

  async updateProject(projectId: string, projectData: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...projectData,
          updatedAt: new Date().toISOString()
        })
        .eq('_id', projectId)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return {
          success: false,
          message: 'Failed to update project'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error updating project:', error);
      return {
        success: false,
        message: 'Failed to update project'
      };
    }
  },

  async deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('_id', projectId);

      if (error) {
        console.error('Error deleting project:', error);
        return {
          success: false,
          message: 'Failed to delete project'
        };
      }

      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting project:', error);
      return {
        success: false,
        message: 'Failed to delete project'
      };
    }
  },

  async getFeaturedProjects(limit: number = 6) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('isPublished', true)
        .eq('isFeatured', true)
        .order('createdAt', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured projects:', error);
        return {
          success: false,
          message: 'Failed to fetch featured projects'
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return {
        success: false,
        message: 'Failed to fetch featured projects'
      };
    }
  },

  async getProjectsByCategory(category: string, limit?: number) {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .eq('isPublished', true)
        .order('createdAt', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching projects by category:', error);
        return {
          success: false,
          message: 'Failed to fetch projects by category'
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return {
        success: false,
        message: 'Failed to fetch projects by category'
      };
    }
  },

  async searchProjects(query: string, limit?: number) {
    try {
      let searchQuery = supabase
        .from('projects')
        .select('*')
        .eq('isPublished', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('createdAt', { ascending: false });

      if (limit) {
        searchQuery = searchQuery.limit(limit);
      }

      const { data, error } = await searchQuery;

      if (error) {
        console.error('Error searching projects:', error);
        return {
          success: false,
          message: 'Failed to search projects'
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error searching projects:', error);
      return {
        success: false,
        message: 'Failed to search projects'
      };
    }
  }
};
