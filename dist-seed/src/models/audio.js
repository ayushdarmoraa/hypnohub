"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var AudioSchema = new mongoose_1.Schema({
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
AudioSchema.virtual('formattedDuration').get(function () {
    if (!this.duration)
        return null;
    var minutes = Math.floor(this.duration / 60);
    var seconds = this.duration % 60;
    return "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
});
// Pre-save middleware to update the updatedAt field
AudioSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
// Static method to find public audios
AudioSchema.statics.findPublic = function () {
    return this.find({ isPublic: true }).sort({ uploadedAt: -1 });
};
// Instance method to increment play count
AudioSchema.methods.incrementPlayCount = function () {
    this.playCount = (this.playCount || 0) + 1;
    return this.save();
};
// Instance method to increment likes
AudioSchema.methods.incrementLikes = function () {
    this.likes = (this.likes || 0) + 1;
    return this.save();
};
exports.default = mongoose_1.default.models.Audio || mongoose_1.default.model('Audio', AudioSchema);
