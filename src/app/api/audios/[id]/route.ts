import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Audio from '@/models/audio';

// GET /api/audios/[id] - Get a specific audio
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const audio = await Audio.findById(params.id);
    
    if (!audio) {
      return NextResponse.json(
        { error: 'Audio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(audio);
  } catch (error) {
    console.error('Error fetching audio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audio' },
      { status: 500 }
    );
  }
}

// PUT /api/audios/[id] - Update a specific audio
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedAudio = await Audio.findByIdAndUpdate(
      params.id,
      {
        ...body,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedAudio) {
      return NextResponse.json(
        { error: 'Audio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Audio updated successfully',
      audio: updatedAudio
    });
  } catch (error) {
    console.error('Error updating audio:', error);
    return NextResponse.json(
      { error: 'Failed to update audio' },
      { status: 500 }
    );
  }
}

// DELETE /api/audios/[id] - Delete a specific audio
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const deletedAudio = await Audio.findByIdAndDelete(params.id);
    
    if (!deletedAudio) {
      return NextResponse.json(
        { error: 'Audio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Audio deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting audio:', error);
    return NextResponse.json(
      { error: 'Failed to delete audio' },
      { status: 500 }
    );
  }
}

