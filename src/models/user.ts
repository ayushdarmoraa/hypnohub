import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'therapist';
  membershipLevel: 'free' | 'premium' | 'pro';
  profileImage?: string;
  phone?: string;
  dateOfBirth?: Date;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // User preferences and progress
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      profileVisible: boolean;
      progressVisible: boolean;
    };
  };
  
  // Progress tracking
  progress: {
    totalSessions: number;
    completedPrograms: string[];
    currentStreak: number;
    totalListeningTime: number; // in minutes
    favoriteCategories: string[];
    achievements: string[];
  };
  
  // Subscription and billing
  subscription: {
    plan: 'free' | 'premium' | 'pro';
    status: 'active' | 'inactive' | 'cancelled' | 'expired';
    startDate?: Date;
    endDate?: Date;
    autoRenew: boolean;
  };

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generatePasswordResetToken(): string;
  generateEmailVerificationToken(): string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'therapist'],
    default: 'user'
  },
  membershipLevel: {
    type: String,
    enum: ['free', 'premium', 'pro'],
    default: 'free'
  },
  profileImage: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  dateOfBirth: {
    type: Date
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  lastLogin: {
    type: Date
  },
  
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    privacy: {
      profileVisible: { type: Boolean, default: true },
      progressVisible: { type: Boolean, default: false }
    }
  },
  
  progress: {
    totalSessions: { type: Number, default: 0 },
    completedPrograms: [{ type: String }],
    currentStreak: { type: Number, default: 0 },
    totalListeningTime: { type: Number, default: 0 },
    favoriteCategories: [{ type: String }],
    achievements: [{ type: String }]
  },
  
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: { type: Date },
    endDate: { type: Date },
    autoRenew: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ membershipLevel: 1 });
userSchema.index({ 'subscription.status': 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to generate password reset token
userSchema.methods.generatePasswordResetToken = function(): string {
  const resetToken = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
  
  this.passwordResetToken = bcrypt.hashSync(resetToken, 10);
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  return resetToken;
};

// Instance method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function(): string {
  const verificationToken = Math.random().toString(36).substring(2, 15) + 
                           Math.random().toString(36).substring(2, 15);
  
  this.emailVerificationToken = bcrypt.hashSync(verificationToken, 10);
  
  return verificationToken;
};

// Virtual for user's full membership status
userSchema.virtual('membershipStatus').get(function() {
  return {
    level: this.membershipLevel,
    plan: this.subscription.plan,
    status: this.subscription.status,
    isActive: this.subscription.status === 'active',
    isPremium: this.membershipLevel !== 'free' && this.subscription.status === 'active'
  };
});

// Virtual for user's progress summary
userSchema.virtual('progressSummary').get(function() {
  return {
    totalSessions: this.progress.totalSessions,
    completedPrograms: this.progress.completedPrograms.length,
    currentStreak: this.progress.currentStreak,
    totalHours: Math.round(this.progress.totalListeningTime / 60 * 10) / 10,
    achievements: this.progress.achievements.length
  };
});

// Static method to find user by email
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active premium users
userSchema.statics.findPremiumUsers = function() {
  return this.find({
    membershipLevel: { $in: ['premium', 'pro'] },
    'subscription.status': 'active'
  });
};

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;

