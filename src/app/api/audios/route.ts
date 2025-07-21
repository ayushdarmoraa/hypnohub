import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Audio from '@/models/audio';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    // Build query
    let query: any = { isPublic: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const audios = await Audio.find(query)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Audio.countDocuments(query);

    return NextResponse.json({
      audios,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      title,
      description,
      audioUrl,
      duration,
      category,
      tags,
      thumbnailUrl,
      uploadedBy
    } = body;

    // Validate required fields
    if (!title || !audioUrl) {
      return NextResponse.json(
        { error: 'Title and audio URL are required' },
        { status: 400 }
      );
    }

    // Create new audio
    const audio = new Audio({
      title,
      description,
      audioUrl,
      duration,
      category: category?.toLowerCase(),
      tags: tags?.map((tag: string) => tag.toLowerCase()),
      thumbnailUrl,
      uploadedBy,
      isPublic: true
    });

    await audio.save();

    return NextResponse.json(audio, { status: 201 });

  } catch (error) {
    console.error('Error creating audio:', error);
    return NextResponse.json(
      { error: 'Failed to create audio' },
      { status: 500 }
    );
  }
}

