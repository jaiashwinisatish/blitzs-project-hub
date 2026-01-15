import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['web', 'mobile', 'desktop', 'ai', 'blockchain', 'game', 'other']
  },
  techStack: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  images: [{
    type: String,
    required: true
  }],
  demoLink: {
    type: String,
    required: [true, 'Demo link is required'],
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  githubLink: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  isFree: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create index for search functionality
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Method to increment purchases
projectSchema.methods.incrementPurchases = function() {
  this.purchases += 1;
  return this.save();
};

// Method to increment downloads
projectSchema.methods.incrementDownloads = function() {
  this.downloads += 1;
  return this.save();
};

export default mongoose.model('Project', projectSchema);
