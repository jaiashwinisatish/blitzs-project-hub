import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import validator from 'validator';

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
      options: {
        data: {
          full_name: fullName,
          role: 'user'
        }
      }
    });

    if (error) {
      console.error('Supabase signup error:', error);
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Create user profile in our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert([{
        id: data.user.id,
        full_name: fullName,
        email,
        password: hashedPassword,
        role: 'user',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return res.status(500).json({
        success: false,
        message: 'Failed to create user profile'
      });
    }

    // Generate JWT token
    const token = generateToken(data.user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: data.user.id,
          fullName,
          email,
          role: 'user',
          avatar: '',
          purchasedProjects: [],
          orders: [],
          clientRequests: [],
          createdAt: new Date().toISOString()
        },
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase signin error:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Get user profile from our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile'
      });
    }

    // Generate JWT token
    const token = generateToken(data.user.id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: profile.id,
          fullName: profile.full_name,
          email: profile.email,
          role: profile.role,
          avatar: profile.avatar,
          purchasedProjects: profile.purchased_projects || [],
          orders: profile.orders || [],
          clientRequests: profile.client_requests || [],
          createdAt: profile.created_at
        },
        token
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error } = await supabase
      .from('users')
      .select(`
        id,
        full_name,
        email,
        role,
        avatar,
        purchased_projects,
        orders,
        client_requests,
        created_at
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error fetching profile'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: profile.id,
          fullName: profile.full_name,
          email: profile.email,
          role: profile.role,
          avatar: profile.avatar,
          purchasedProjects: profile.purchased_projects || [],
          orders: profile.orders || [],
          clientRequests: profile.client_requests || [],
          createdAt: profile.created_at
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile'
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, avatar } = req.body;
    const updateData = {};

    if (fullName) updateData.full_name = fullName;
    if (avatar) updateData.avatar = avatar;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Update profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error updating profile'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: data.id,
          fullName: data.full_name,
          email: data.email,
          role: data.role,
          avatar: data.avatar,
          purchasedProjects: data.purchased_projects || [],
          orders: data.orders || [],
          clientRequests: data.client_requests || [],
          createdAt: data.created_at
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get current user to verify password
    const { data: profile, error } = await supabase
      .from('users')
      .select('password')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return res.status(500).json({
        success: false,
        message: 'Failed to verify current password'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, profile.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ password: hashedNewPassword })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Change password error:', updateError);
      return res.status(500).json({
        success: false,
        message: 'Server error changing password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password'
    });
  }
};
