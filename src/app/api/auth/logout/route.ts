import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Since we're using JWT tokens, logout is primarily handled on the client side
    // by removing the token from storage. However, we can provide a logout endpoint
    // for consistency and potential future token blacklisting functionality.
    
    // TODO: Implement token blacklisting if needed for enhanced security
    // This would involve storing invalidated tokens in a database or cache
    // until their expiration time.
    
    return NextResponse.json({
      message: 'Logout successful'
    }, { status: 200 });

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error during logout' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

