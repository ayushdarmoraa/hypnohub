import mongoose, { Document, Schema } from 'mongoose';

export interface IPersonalizedRequest extends Document {
  // Customer Information
  name: string;
  email: string;
  phone?: string;
  
  // Request Details
  issue: string;
  specificRequest: string;
  duration: string;
  urgency: string;
  previousExperience?: string;
  additionalNotes?: string;
  
  // Payment Information
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentId?: string;
  
  // Request Status
  status: 'submitted' | 'in_progress' | 'completed' | 'delivered' | 'cancelled';
  assignedTherapist?: string;
  
  // Audio Delivery
  audioUrl?: string;
  deliveredAt?: Date;
  
  // Timestamps
  requestDate: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Admin Notes
  adminNotes?: string;
}

const PersonalizedRequestSchema: Schema = new Schema({
  // Customer Information
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
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  
  // Request Details
  issue: {
    type: String,
    required: [true, 'Issue/goal is required'],
    enum: [
      'anxiety', 'sleep', 'confidence', 'phobias', 'habits', 
      'performance', 'trauma', 'focus', 'weight', 'relationships', 'other'
    ]
  },
  specificRequest: {
    type: String,
    required: [true, 'Specific request is required'],
    trim: true,
    maxlength: [2000, 'Request description cannot exceed 2000 characters']
  },
  duration: {
    type: String,
    required: [true, 'Duration preference is required'],
    enum: ['15-20', '25-30', '35-45', '45-60', 'custom']
  },
  urgency: {
    type: String,
    required: [true, 'Urgency level is required'],
    enum: ['standard', 'priority', 'rush']
  },
  previousExperience: {
    type: String,
    enum: ['none', 'beginner', 'intermediate', 'advanced']
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Additional notes cannot exceed 1000 characters']
  },
  
  // Payment Information
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    trim: true
  },
  
  // Request Status
  status: {
    type: String,
    enum: ['submitted', 'in_progress', 'completed', 'delivered', 'cancelled'],
    default: 'submitted'
  },
  assignedTherapist: {
    type: String,
    trim: true
  },
  
  // Audio Delivery
  audioUrl: {
    type: String,
    trim: true
  },
  deliveredAt: {
    type: Date
  },
  
  // Timestamps
  requestDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Admin Notes
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
PersonalizedRequestSchema.index({ email: 1 });
PersonalizedRequestSchema.index({ status: 1 });
PersonalizedRequestSchema.index({ paymentStatus: 1 });
PersonalizedRequestSchema.index({ requestDate: -1 });
PersonalizedRequestSchema.index({ assignedTherapist: 1 });

// Virtual for formatted amount
PersonalizedRequestSchema.virtual("formattedAmount").get(function() {
  return `$${(this.amount as number).toFixed(2)}`;
});

// Virtual for urgency pricing
PersonalizedRequestSchema.virtual('urgencyPrice').get(function() {
  const prices = {
    standard: 97,
    priority: 147,
    rush: 197
  };
  return prices[this.urgency as keyof typeof prices] || 97;
});

// Virtual for estimated delivery
PersonalizedRequestSchema.virtual('estimatedDelivery').get(function() {
  const deliveryTimes = {
    standard: '7-10 business days',
    priority: '3-5 business days',
    rush: '24-48 hours'
  };
  return deliveryTimes[this.urgency as keyof typeof deliveryTimes] || '7-10 business days';
});

// Pre-save middleware to update the updatedAt field
PersonalizedRequestSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find requests by status
PersonalizedRequestSchema.statics.findByStatus = function(status: string) {
  return this.find({ status }).sort({ requestDate: -1 });
};

// Static method to find pending requests
PersonalizedRequestSchema.statics.findPending = function() {
  return this.find({ 
    paymentStatus: 'completed',
    status: { $in: ['submitted', 'in_progress'] }
  }).sort({ requestDate: 1 });
};

// Instance method to mark as completed
PersonalizedRequestSchema.methods.markCompleted = function(audioUrl: string) {
  this.status = 'completed';
  this.audioUrl = audioUrl;
  return this.save();
};

// Instance method to mark as delivered
PersonalizedRequestSchema.methods.markDelivered = function() {
  this.status = 'delivered';
  this.deliveredAt = new Date();
  return this.save();
};

export default mongoose.models.PersonalizedRequest || 
  mongoose.model<IPersonalizedRequest>('PersonalizedRequest', PersonalizedRequestSchema);

