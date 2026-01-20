import User from '../models/User.js';
import Project from '../models/Project.js';
import Order from '../models/Order.js';
import ClientRequest from '../models/ClientRequest.js';
import { supabaseAdmin } from '../config/supabase.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProjects,
      totalOrders,
      totalRequests,
      totalRevenue,
      recentOrders,
      recentRequests
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Project.countDocuments(),
      Order.countDocuments(),
      ClientRequest.countDocuments(),
      Order.aggregate([
        { $match: { status: 'completed', isPaid: true } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Order.find()
        .populate('user', 'fullName email')
        .populate('project', 'title')
        .sort({ createdAt: -1 })
        .limit(5),
      ClientRequest.find()
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProjects,
          totalOrders,
          totalRequests,
          totalRevenue: totalRevenue[0]?.total || 0
        },
        recentOrders,
        recentRequests
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard statistics'
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;

    const query = {};
    if (role && role !== 'all') {
      query.role = role;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching users'
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating user role'
    });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user: user.getProfile() }
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating user status'
    });
  }
};

export const getAllProjectsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, status } = req.query;

    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (status && status !== 'all') {
      query.isPublished = status === 'published';
    }
    if (search) {
      query.$text = { $search: search };
    }

    const projects = await Project.find(query)
      .populate('addedBy', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        projects,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProjects: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all projects admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching projects'
    });
  }
};

export const getAllClientRequests = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, priority, search } = req.query;

    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (priority && priority !== 'all') {
      query.priority = priority;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const requests = await ClientRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ClientRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        requests,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRequests: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all client requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching client requests'
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, notes, estimatedCost, estimatedTimeline } = req.body;

    if (!['pending', 'reviewing', 'contacted', 'quoted', 'accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updateData = { status };
    if (estimatedCost) updateData.estimatedCost = estimatedCost;
    if (estimatedTimeline) updateData.estimatedTimeline = estimatedTimeline;

    const request = await ClientRequest.findByIdAndUpdate(
      requestId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Client request not found'
      });
    }

    // Add note if provided
    if (notes) {
      request.notes.push({
        author: req.user._id,
        note: notes,
        createdAt: new Date()
      });
      await request.save();
    }

    res.status(200).json({
      success: true,
      message: 'Request status updated successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating request status'
    });
  }
};

export const addDeveloper = async (req, res) => {
  try {
    const {
      name,
      email,
      bio,
      avatar,
      skills,
      experience,
      github,
      linkedin,
      portfolio
    } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Parse skills if it's a string
    const skillsArray = Array.isArray(skills) ? skills : 
                      typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : 
                      [];

    const { data, error } = await supabaseAdmin
      .from('developers')
      .insert([{
        name,
        email,
        bio: bio || '',
        avatar: avatar || '',
        skills: skillsArray,
        experience: experience || 'intermediate',
        github: github || '',
        linkedin: linkedin || '',
        portfolio: portfolio || '',
        is_active: true,
        rating: 0,
        total_projects: 0
      }])
      .select()
      .single();

    if (error) {
      console.error('Add developer error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to add developer: ' + error.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Developer added successfully',
      data: { developer: data }
    });
  } catch (error) {
    console.error('Add developer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding developer'
    });
  }
};

export const getAllDevelopers = async (req, res) => {
  try {
    const { data: developers, error } = await supabaseAdmin
      .from('developers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get all developers error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch developers'
      });
    }

    res.status(200).json({
      success: true,
      data: { developers: developers || [] }
    });
  } catch (error) {
    console.error('Get all developers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching developers'
    });
  }
};

export const updateDeveloper = async (req, res) => {
  try {
    const { developerId } = req.params;
    const updateData = req.body;

    // Parse skills if it's a string
    if (updateData.skills && typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills.split(',').map(s => s.trim()).filter(s => s);
    }

    const { data, error } = await supabaseAdmin
      .from('developers')
      .update(updateData)
      .eq('id', developerId)
      .select()
      .single();

    if (error) {
      console.error('Update developer error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update developer: ' + error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Developer updated successfully',
      data: { developer: data }
    });
  } catch (error) {
    console.error('Update developer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating developer'
    });
  }
};

export const deleteDeveloper = async (req, res) => {
  try {
    const { developerId } = req.params;

    const { error } = await supabaseAdmin
      .from('developers')
      .delete()
      .eq('id', developerId);

    if (error) {
      console.error('Delete developer error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete developer: ' + error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Developer deleted successfully'
    });
  } catch (error) {
    console.error('Delete developer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting developer'
    });
  }
};
