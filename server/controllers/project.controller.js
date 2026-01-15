import Project from '../models/Project.js';
import Order from '../models/Order.js';

export const getAllProjects = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      search, 
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isFree 
    } = req.query;

    const query = { isPublished: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by free/paid
    if (isFree !== undefined) {
      query.isFree = isFree === 'true';
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const projects = await Project.find(query)
      .populate('addedBy', 'fullName')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-reviews');

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
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching projects'
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('addedBy', 'fullName')
      .populate('reviews.user', 'fullName avatar');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (!project.isPublished && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { project }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching project'
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      addedBy: req.user._id
    };

    const project = await Project.create(projectData);
    
    await project.populate('addedBy', 'fullName');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating project'
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('addedBy', 'fullName');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
};

export const purchaseProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.isFree) {
      // Add to user's purchased projects for free projects
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { purchasedProjects: projectId } }
      );

      return res.status(200).json({
        success: true,
        message: 'Project added to your library successfully',
        data: { isFree: true }
      });
    }

    // Check if already purchased
    const existingOrder = await Order.findOne({
      user: userId,
      project: projectId,
      status: 'completed'
    });

    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: 'You have already purchased this project'
      });
    }

    // Create order
    const order = await Order.create({
      user: userId,
      project: projectId,
      amount: project.price,
      status: 'completed',
      isPaid: true,
      paidAt: new Date()
    });

    // Add to user's purchased projects
    await User.findByIdAndUpdate(
      userId,
      { 
        $addToSet: { purchasedProjects: projectId },
        $push: { orders: order._id }
      }
    );

    // Increment project purchases
    await project.incrementPurchases();

    res.status(200).json({
      success: true,
      message: 'Project purchased successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Purchase project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error purchasing project'
    });
  }
};

export const downloadProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    // Check if user has purchased the project
    const order = await Order.findOne({
      user: userId,
      project: projectId,
      status: 'completed',
      isPaid: true
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: 'You have not purchased this project'
      });
    }

    // Check if download is allowed
    if (!order.canDownload()) {
      return res.status(403).json({
        success: false,
        message: 'Download limit exceeded or link expired'
      });
    }

    // Increment download count
    await order.incrementDownload();

    // Increment project downloads
    const project = await Project.findById(projectId);
    await project.incrementDownloads();

    res.status(200).json({
      success: true,
      message: 'Download started',
      data: {
        downloadUrl: project.githubLink || `https://github.com/blitzs/project-${projectId}`,
        remainingDownloads: order.maxDownloads - order.downloadCount
      }
    });
  } catch (error) {
    console.error('Download project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error downloading project'
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    // Check if user has purchased the project
    const order = await Order.findOne({
      user: userId,
      project: projectId,
      status: 'completed',
      isPaid: true
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: 'You must purchase the project to review it'
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user has already reviewed
    const existingReview = project.reviews.find(
      review => review.user.toString() === userId.toString()
    );

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      // Add new review
      project.reviews.push({
        user: userId,
        rating,
        comment
      });
    }

    // Calculate average rating
    const totalRating = project.reviews.reduce((sum, review) => sum + review.rating, 0);
    project.rating = totalRating / project.reviews.length;

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Review added successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding review'
    });
  }
};
