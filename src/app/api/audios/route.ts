import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Audio from '@/models/audio';

// GET /api/audios - Get all audios with pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    // Build query
    const query: any = { isPublic: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get audios and total count
    const [audios, total] = await Promise.all([
      Audio.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Audio.countDocuments(query)
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      audios,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching audios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audios' },
      { status: 500 }
    );
  }
}

// POST /api/audios - Create a new audio
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.audioUrl) {
      return NextResponse.json(
        { error: 'Title and audio URL are required' },
        { status: 400 }
      );
    }

    // Create new audio
    const audio = new Audio({
      ...body,
      uploadedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await audio.save();

    return NextResponse.json({
      message: 'Audio created successfully',
      audio
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating audio:', error);
    return NextResponse.json(
      { error: 'Failed to create audio' },
      { status: 500 }
    );
  }
}

