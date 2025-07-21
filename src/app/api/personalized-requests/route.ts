import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PersonalizedRequest from '@/models/personalizedRequest';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      issue,
      specificRequest,
      duration,
      urgency,
      previousExperience,
      additionalNotes,
      amount,
      paymentStatus,
      paymentId,
      requestDate
    } = body;

    // Validate required fields
    if (!name || !email || !issue || !specificRequest || !duration || !urgency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate urgency and calculate amount
    const urgencyPricing = {
      standard: 97,
      priority: 147,
      rush: 197
    };

    const calculatedAmount = urgencyPricing[urgency as keyof typeof urgencyPricing];
    if (!calculatedAmount) {
      return NextResponse.json(
        { error: 'Invalid urgency level' },
        { status: 400 }
      );
    }

    // Create new personalized request
    const personalizedRequest = new PersonalizedRequest({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      issue,
      specificRequest: specificRequest.trim(),
      duration,
      urgency,
      previousExperience,
      additionalNotes: additionalNotes?.trim(),
      amount: calculatedAmount,
      paymentStatus: paymentStatus || 'completed', // For demo purposes, marking as completed
      paymentId,
      requestDate: requestDate || new Date(),
      status: 'submitted'
    });

    await personalizedRequest.save();

    // In a real application, you would:
    // 1. Process payment with Stripe/Razorpay
    // 2. Send confirmation email to customer
    // 3. Send notification to admin/therapists
    // 4. Create task in admin dashboard

    return NextResponse.json({
      success: true,
      requestId: personalizedRequest._id,
      message: 'Personalized audio request submitted successfully',
      estimatedDelivery: personalizedRequest.estimatedDelivery,
      amount: personalizedRequest.formattedAmount
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating personalized request:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit personalized request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    // Build query
    let query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (email) {
      query.email = email.toLowerCase();
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const requests = await PersonalizedRequest.find(query)
      .sort({ requestDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await PersonalizedRequest.countDocuments(query);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching personalized requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personalized requests' },
      { status: 500 }
    );
  }
}

