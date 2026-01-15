import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Developer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  avatar: {
    type: String,
    default: ''
  },
  skills: [{
    type: String,
    trim: true
  }],
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  github: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  linkedin: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  portfolio: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalProjects: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Developer', developerSchema);
