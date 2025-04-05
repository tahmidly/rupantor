import connectDB from '@/config/db';
import Address from '@/models/Address';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get userId from Clerk
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized. Please log in.',
        },
        { status: 401 },
      );
    }

    // Parse the body as flat object (not wrapped in `address`)
    const address = await request.json();

    console.log('📦 Received address payload:', address);

    // Validate required fields
    const requiredFields = ['fullName', 'phoneNumber', 'pincode', 'area', 'city', 'state'];
    for (let field of requiredFields) {
      if (!address[field]) {
        return NextResponse.json(
          {
            success: false,
            message: `Missing required field: ${field}`,
          },
          { status: 400 },
        );
      }
    }

    // Connect to DB
    await connectDB();

    // Save address
    const newAddress = await Address.create({
      ...address,
      userId,
    });

    return NextResponse.json({
      success: true,
      message: 'Address added successfully',
      address: newAddress,
    });
  } catch (error) {
    console.error('❌ Error saving address:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add address',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
