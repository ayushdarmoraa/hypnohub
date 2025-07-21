import mongoose, { Document, Schema } from 'mongoose';

export interface IAudio extends Document {
  title: string;
  description?: string;
  audioUrl: string;
  duration?: number; // in seconds
  fileSize?: number; // in bytes
  format?: string; // e.g., 'mp3', 'wav', 'ogg'
  tags?: string[];
  category?: string;
  isPublic: boolean;
  uploadedBy?: string; // user ID or username
  uploadedAt: Date;
  updatedAt: Date;
  playCount?: number;
  likes?: number;
  thumbnailUrl?: string;
  formattedDuration?: string; // Add this line
}

const AudioSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Audio title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  audioUrl: {
    type: String,
    required: [true, 'Audio URL is required'],
    trim: true
  },
  duration: {
    type: Number,
    min: [0, 'Duration cannot be negative']
  },
  fileSize: {
    type: Number,
    min: [0, 'File size cannot be negative']
  },
  format: {
    type: String,
    lowercase: true,
    enum: ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'],
    default: 'mp3'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    trim: true,
    lowercase: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: String,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  playCount: {
    type: Number,
    default: 0,
    min: [0, 'Play count cannot be negative']
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative']
  },
  thumbnailUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true, // This will automatically manage createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
AudioSchema.index({ title: 'text', description: 'text' });
AudioSchema.index({ tags: 1 });
AudioSchema.index({ category: 1 });
AudioSchema.index({ uploadedAt: -1 });
AudioSchema.index({ isPublic: 1 });

// Virtual for formatted duration
AudioSchema.virtual('formattedDuration').get(function() {
  if (!this.duration) return null;
  const minutes = Math.floor((this.duration as number) / 60);
  const seconds = (this.duration as number) % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Pre-save middleware to update the updatedAt field
AudioSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find public audios
AudioSchema.statics.findPublic = function() {
  return this.find({ isPublic: true }).sort({ uploadedAt: -1 });
};

// Instance method to increment play count
AudioSchema.methods.incrementPlayCount = function() {
  this.playCount = (this.playCount || 0) + 1;
  return this.save();
};

// Instance method to increment likes
AudioSchema.methods.incrementLikes = function() {
  this.likes = (this.likes || 0) + 1;
  return this.save();
};

export default mongoose.models.Audio || mongoose.model<IAudio>('Audio', AudioSchema);

