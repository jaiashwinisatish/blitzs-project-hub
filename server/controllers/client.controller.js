import { supabaseAdmin } from '../config/supabase.js';

export const createClientRequest = async (req, res) => {
  try {
    const requestData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      company: req.body.company || '',
      project_type: req.body.projectType,
      budget: req.body.budget,
      timeline: req.body.timeline,
      description: req.body.description,
      requirements: req.body.requirements || [],
      status: 'pending'
    };

    const { data, error } = await supabaseAdmin
      .from('client_requests')
      .insert([requestData])
      .select()
      .single();

    if (error) {
      console.error('Create client request error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to submit client request: ' + error.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Client request submitted successfully! Team Blitzs will schedule a meeting to understand your requirements.',
      data: { request: data }
    });
  } catch (error) {
    console.error('Create client request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting client request'
    });
  }
};

export const getUserClientRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const userEmail = req.user.email;

    let query = supabaseAdmin
      .from('client_requests')
      .select('*');

    // Filter by user email
    if (userEmail) {
      query = query.eq('email', userEmail);
    }

    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Get total count first
    const { count } = await query;
    
    // Apply pagination
    const { data: requests, error } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.error('Get user client requests error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error fetching client requests'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        requests: requests || [],
        pagination: {
          currentPage: page,
          totalPages: Math.ceil((count || 0) / limit),
          totalRequests: count || 0,
          hasNext: page < Math.ceil((count || 0) / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user client requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching client requests'
    });
  }
};

export const getClientRequestById = async (req, res) => {
  try {
    const { data: request, error } = await supabaseAdmin
      .from('client_requests')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      console.error('Get client request error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error fetching client request'
      });
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Client request not found'
      });
    }

    // Check if user owns the request or is admin
    if (req.user.role !== 'admin' && request.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: { request }
    });
  } catch (error) {
    console.error('Get client request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching client request'
    });
  }
};
