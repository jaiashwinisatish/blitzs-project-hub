import ClientRequest from '../models/ClientRequest.js';

export const createClientRequest = async (req, res) => {
  try {
    const requestData = {
      ...req.body,
      status: 'pending'
    };

    const request = await ClientRequest.create(requestData);

    res.status(201).json({
      success: true,
      message: 'Client request submitted successfully! Team Blitzs will schedule a meeting to understand your requirements.',
      data: { request }
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
    const userId = req.user._id;

    const query = { 
      $or: [
        { email: req.user.email },
        { user: userId }
      ]
    };

    if (status && status !== 'all') {
      query.status = status;
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
    console.error('Get user client requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching client requests'
    });
  }
};

export const getClientRequestById = async (req, res) => {
  try {
    const request = await ClientRequest.findById(req.params.id);

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
