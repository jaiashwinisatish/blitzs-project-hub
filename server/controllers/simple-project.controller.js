import { supabaseAdmin } from '../config/supabase.js';

export const getAllProjects = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      search, 
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    let query = supabaseAdmin
      .from('projects')
      .select('*');

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Search functionality
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Sort options
    if (sortOrder === 'asc') {
      query = query.order(sortBy, { ascending: true });
    } else {
      query = query.order(sortBy, { ascending: false });
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: projects, error, count } = await query
      .range(from, to);

    if (error) {
      console.error('Get projects error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch projects'
      });
    }

    // Transform database field names to frontend format
    const transformedProjects = projects.map(project => ({
      _id: project.id,
      title: project.title,
      description: project.description,
      shortDescription: project.short_description,
      category: project.category,
      price: project.price,
      techStack: project.tech_stack || [],
      features: project.features || [],
      images: project.images || [],
      demoLink: project.demo_link,
      githubLink: project.github_link,
      difficulty: project.difficulty,
      isFree: project.is_free,
      isPublished: project.is_published,
      downloads: project.downloads || 0,
      purchases: project.purchases || 0,
      rating: project.rating || 0,
      tags: project.tags || [],
      createdAt: project.created_at,
      updatedAt: project.updated_at
    }));

    const total = count || 0;

    res.status(200).json({
      success: true,
      data: {
        projects: transformedProjects || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      category = 'web',
      price = 0,
      techStack = [],
      features = [],
      images = [],
      demoLink,
      githubLink,
      difficulty = 'intermediate',
      isFree = false,
      isPublished = true,
      tags = []
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        title,
        description,
        short_description: shortDescription || description.substring(0, 200),
        category,
        price: parseFloat(price),
        tech_stack: techStack,
        features,
        images,
        demo_link: demoLink || '',
        github_link: githubLink,
        difficulty,
        is_free: isFree,
        is_published: isPublished,
        downloads: 0,
        purchases: 0,
        rating: 0,
        tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Create project error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create project: ' + error.message
      });
    }

    res.status(201).json({
      success: true,
      data: {
        project: data
      },
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update project error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update project'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        project: data
      },
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete project error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete project'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Get project by ID error:', error);
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        project
      }
    });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};
