import mongoose from 'mongoose';

const clientRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: ['web', 'mobile', 'desktop', 'ai', 'blockchain', 'game', 'other']
  },
  budget: {
    type: String,
    enum: ['<1000', '1000-5000', '5000-10000', '10000-25000', '25000-50000', '>50000'],
    required: [true, 'Budget range is required']
  },
  timeline: {
    type: String,
    enum: ['urgent', '1-2 weeks', '2-4 weeks', '1-2 months', '2-3 months', '3+ months'],
    required: [true, 'Timeline is required']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  attachments: [{
    filename: String,
    url: String,
    size: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'contacted', 'quoted', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer'
  },
  notes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    note: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  estimatedCost: {
    type: Number,
    min: 0
  },
  estimatedTimeline: {
    type: String
  }
}, {
  timestamps: true
});

// Generate unique request ID
clientRequestSchema.pre('save', async function(next) {
  if (this.isNew) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.requestId = `REQ${timestamp}${random}`;
  }
  next();
});

export default mongoose.model('ClientRequest', clientRequestSchema);
