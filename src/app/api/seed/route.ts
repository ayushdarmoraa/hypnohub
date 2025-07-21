import { NextRequest, NextResponse } from 'next/server';
import { seedAudios } from '@/lib/seedAudios';

export async function POST(request: NextRequest) {
  try {
    // In production, you might want to add authentication here
    // to prevent unauthorized seeding
    
    const audios = await seedAudios();
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${audios.length} sample audios`,
      count: audios.length
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to seed the database with sample audios',
    endpoint: '/api/seed',
    method: 'POST'
  });
}

