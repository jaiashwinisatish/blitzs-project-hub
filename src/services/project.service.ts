import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description?: string;
  category: string;
  price: number;
  thumbnail_url?: string;
  demo_link?: string;
  github_repo_url?: string;
  tech_stack: string[];
  features: string[];
  images: string[];
  video_url?: string;
  is_featured: boolean;
  is_published: boolean;
  added_by?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name?: string;
  };
}

export const projectService = {
  async getAllProjects(options?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    isFree?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    try {
      const page = options?.page || 1;
      const limit = options?.limit || 12;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('projects')
        .select(`
          *,
          profiles!added_by(full_name)
        `)
        .eq('is_published', true)
        .range(offset, offset + limit - 1);

      // Apply filters
      if (options?.category && options.category !== 'all') {
        query = query.eq('category', options.category);
      }

      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }

      if (options?.isFree !== undefined && options.isFree !== 'all') {
        query = query.eq('is_free', options.isFree === 'true');
      }

      // Apply sorting
      const sortBy = options?.sortBy || 'created_at';
      const sortOrder = options?.sortOrder === 'asc' ? true : false;
      query = query.order(sortBy, { ascending: sortOrder });

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      };
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch projects'
      };
    }
  },

  async getProjectById(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles!added_by(full_name),
          project_reviews(*)
        `)
        .eq('id', projectId)
        .eq('is_published', true)
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error fetching project:', error);
      return {
        success: false,
        message: error.message || 'Project not found'
      };
    }
  },

  async purchaseProject(projectId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return {
          success: false,
          message: 'User not authenticated'
        };
      }

      // Check if project exists and is published
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('id, price, title')
        .eq('id', projectId)
        .eq('is_published', true)
        .single();

      if (projectError || !project) {
        return {
          success: false,
          message: 'Project not found'
        };
      }

      // Check if user already purchased this project
      const { data: existingPurchase, error: purchaseCheckError } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .single();

      if (existingPurchase) {
        return {
          success: false,
          message: 'You have already purchased this project'
        };
      }

      if (purchaseCheckError && purchaseCheckError.code !== 'PGRST116') {
        throw purchaseCheckError;
      }

      // Create purchase record
      const { data: purchase, error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: user.id,
          project_id: projectId,
          amount: project.price
        })
        .select()
        .single();

      if (purchaseError) throw purchaseError;

      // Create order record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          project_id: projectId,
          total_amount: project.price,
          status: 'completed'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Update project purchase count
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          purchases: supabase.raw('purchases + 1'),
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      if (updateError) throw updateError;

      return {
        success: true,
        data: {
          purchase,
          order,
          project: {
            id: project.id,
            title: project.title,
            price: project.price
          }
        }
      };
    } catch (error: any) {
      console.error('Error purchasing project:', error);
      return {
        success: false,
        message: error.message || 'Failed to purchase project'
      };
    }
  },

  // Admin-only methods
  async createProject(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'downloads' | 'purchases' | 'rating'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return {
          success: false,
          message: 'User not authenticated'
        };
      }

      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: projectData.title,
          slug: projectData.slug || projectData.title.toLowerCase().replace(/\s+/g, '-'),
          short_description: projectData.short_description,
          description: projectData.description,
          category: projectData.category,
          price: projectData.price,
          thumbnail_url: projectData.thumbnail_url,
          demo_link: projectData.demo_url,
          github_repo_url: projectData.github_repo_url,
          tech_stack: projectData.tech_stack,
          features: projectData.features,
          images: projectData.images,
          video_url: projectData.video_url,
          is_featured: projectData.is_featured || false,
          is_published: projectData.is_published !== undefined ? projectData.is_published : true,
          added_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error creating project:', error);
      return {
        success: false,
        message: error.message || 'Failed to create project'
      };
    }
  },

  async updateProject(projectId: string, updateData: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error updating project:', error);
      return {
        success: false,
        message: error.message || 'Failed to update project'
      };
    }
  },

  async deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      return {
        success: true
      };
    } catch (error: any) {
      console.error('Error deleting project:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete project'
      };
    }
  },

  async getUserPurchases() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return {
          success: false,
          message: 'User not authenticated'
        };
      }

      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          projects(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || []
      };
    } catch (error: any) {
      console.error('Error fetching user purchases:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch purchases'
      };
    }
  },

  async createProject(projectData: {
    title: string;
    short_description: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    is_published?: boolean;
  }) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: projectData.title,
          short_description: projectData.short_description,
          description: projectData.description,
          slug: projectData.title.toLowerCase().replace(/\s+/g, '-'),
          price: projectData.price,
          category: projectData.category,
          images: projectData.images,
          tech_stack: [],
          features: [],
          thumbnail_url: '',
          demo_link: '',
          github_repo_url: '',
          video_url: '',
          is_featured: false,
          is_published: projectData.is_published ?? true,
          added_by: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data
      };
    } catch (error: any) {
      console.error('Error creating project:', error);
      return {
        success: false,
        message: error.message || 'Failed to create project'
      };
    }
  }
};
