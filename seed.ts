import mongoose from 'mongoose';
import Audio, { IAudio } from './src/models/audio';
import dbConnect from './src/lib/db';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI as string;

const sampleAudios: Partial<IAudio>[] = [
  {
    title: "Deep Sleep Hypnosis",
    description: "A gentle and soothing hypnosis session designed to help you fall into a deep, restful sleep. Perfect for those struggling with insomnia or restless nights.",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
    duration: 1800, // 30 minutes
    category: "sleep",
    tags: ["sleep", "relaxation", "insomnia", "bedtime"],
    thumbnailUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400",
    isPublic: true,
    uploadedBy: "MindReboot Lab",
    playCount: 1247,
    likes: 89,
    uploadedAt: new Date(), // Added missing fields
    updatedAt: new Date(),   // Added missing fields
  },
  {
    title: "Anxiety Relief & Calm",
    description: "Overcome anxiety and stress with this powerful hypnosis session. Learn to release tension and find your inner peace in just 25 minutes.",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
    duration: 1500, // 25 minutes
    category: "anxiety",
    tags: ["anxiety", "stress", "calm", "peace", "relaxation"],
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    isPublic: true,
    uploadedBy: "MindReboot Lab",
    playCount: 2156,
    likes: 134,
    uploadedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Confidence Boost",
    description: "Build unshakeable confidence and self-esteem with this empowering hypnosis session. Transform your self-talk and embrace your true potential.",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
    duration: 2100, // 35 minutes
    category: "confidence",
    tags: ["confidence", "self-esteem", "empowerment", "success"],
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    isPublic: true,
    uploadedBy: "MindReboot Lab",
    playCount: 1834,
    likes: 156,
    uploadedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Focus & Concentration",
    description: "Enhance your mental clarity and focus with this specialized hypnosis session. Perfect for students, professionals, and anyone looking to improve concentration.",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
    duration: 1200, // 20 minutes
    category: "focus",
    tags: ["focus", "concentration", "productivity", "mental clarity"],
    thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    isPublic: true,
    uploadedBy: "MindReboot Lab",
    playCount: 987,
    likes: 67,
    uploadedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Stress Release",
    description: "Let go of daily stress and tension with this deeply relaxing hypnosis session. Feel refreshed, renewed, and ready to face any challenge.",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
    duration: 1800, // 30 minutes
    category: "stress",
    tags: ["stress", "tension", "relaxation", "renewal"],
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    isPublic: true,
    uploadedBy: "MindReboot Lab",
    playCount: 1456,
    likes: 98,
    uploadedAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Morning Motivation",
    description: "Start your day with energy and purpose. This uplifting hypnosis session will help you feel motivated, focused, and ready to achieve your goals.",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder URL
    duration: 900, // 15 minutes
    category: "confidence",
    tags: ["motivation", "morning", "energy", "goals", "success"],
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    isPublic: true,
    uploadedBy: "MindReboot Lab",
    playCount: 2341,
    likes: 187,
    uploadedAt: new Date(),
    updatedAt: new Date(),
  }
];

async function seedAudios() {
  try {
    await dbConnect(); // Ensure connection is established
    console.log('MongoDB connected for seeding');
    
    // Clear existing audios
    await (Audio as any).deleteMany({});
    
    // Insert sample audios
    await (Audio as any).insertMany(sampleAudios);
    
    console.log(`✅ Successfully seeded ${sampleAudios.length} sample audios`);
    
  } catch (error) {
    console.error('❌ Error seeding audios:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected after seeding');
  }
}

seedAudios();


