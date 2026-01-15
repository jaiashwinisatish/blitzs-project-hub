export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};

export const isUser = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. User privileges required.'
    });
  }
};

export const isOwnerOrAdmin = (resourceField = 'user') => {
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the resource
    if (req.resource && req.resource[resourceField] && 
        req.resource[resourceField].toString() === req.user._id.toString()) {
      return next();
    }

    res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own resources.'
    });
  };
};
