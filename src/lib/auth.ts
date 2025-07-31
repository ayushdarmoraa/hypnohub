import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import User, { IUser } from '@/models/user';
import connectDB from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'therapist';
  membershipLevel: 'free' | 'premium' | 'pro';
  isEmailVerified: boolean;
}

/**
 * Generate JWT token for user
 */
export function generateToken(user: IUser): string {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Get current user from request
 */
export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      membershipLevel: user.membershipLevel,
      isEmailVerified: user.isEmailVerified
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}

/**
 * Middleware to require specific role
 */
export async function requireRole(
  request: NextRequest, 
  allowedRoles: ('user' | 'admin' | 'therapist')[]
): Promise<AuthUser> {
  const user = await requireAuth(request);
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }
  
  return user;
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin(request: NextRequest): Promise<AuthUser> {
  return requireRole(request, ['admin']);
}

/**
 * Middleware to require therapist or admin role
 */
export async function requireTherapistOrAdmin(request: NextRequest): Promise<AuthUser> {
  return requireRole(request, ['therapist', 'admin']);
}

/**
 * Check if user has premium access
 */
export function hasPremiumAccess(user: AuthUser): boolean {
  return user.membershipLevel !== 'free';
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate random token for password reset or email verification
 */
export function generateRandomToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Hash token for storage
 */
export function hashToken(token: string): string {
  const bcrypt = require('bcryptjs');
  return bcrypt.hashSync(token, 10);
}

/**
 * Compare token with hash
 */
export function compareToken(token: string, hash: string): boolean {
  const bcrypt = require('bcryptjs');
  return bcrypt.compareSync(token, hash);
}

/**
 * Create user session data
 */
export function createUserSession(user: IUser): AuthUser {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    membershipLevel: user.membershipLevel,
    isEmailVerified: user.isEmailVerified
  };
}

/**
 * Sanitize user data for client
 */
export function sanitizeUser(user: IUser): Partial<IUser> {
  const {
    password,
    passwordResetToken,
    passwordResetExpires,
    emailVerificationToken,
    ...sanitizedUser
  } = user.toObject();
  
  return sanitizedUser;
}

