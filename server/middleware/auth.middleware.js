import jwt from 'jsonwebtoken';
import { supabaseAdmin, verifySupabaseToken, verifyCustomToken } from '../config/supabase.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    let user;
    
    try {
      // Try to verify as Supabase token first
      user = await verifySupabaseToken(token);
    } catch (supabaseError) {
      try {
        // Try to verify as custom token
        user = verifyCustomToken(token);
      } catch (customError) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token.' 
        });
      }
    }

    // Get user from Supabase
    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !userData) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token. User not found.' 
      });
    }

    if (!userData.is_active) {
      return res.status(401).json({ 
        success: false, 
        message: 'Account is deactivated.' 
      });
    }

    req.user = userData;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error in authentication.' 
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Authentication required.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      try {
        let user;
        
        try {
          user = await verifySupabaseToken(token);
        } catch (supabaseError) {
          user = verifyCustomToken(token);
        }

        const { data: userData, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && userData && userData.is_active) {
          req.user = userData;
        }
      } catch (error) {
        // Ignore authentication errors for optional auth
        console.log('Optional auth failed:', error.message);
      }
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next();
  }
};
