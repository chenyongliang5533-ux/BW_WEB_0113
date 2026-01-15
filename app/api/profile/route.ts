// app/api/profile/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// GET - Fetch user profile
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await sql`
      SELECT 
        user_id as "userId",
        email,
        company_name as "companyName",
        username,
        address,
        zip_code as "zipCode",
        mobile_number as "mobileNumber"
      FROM users 
      WHERE email = ${session.user.email}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);

  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { companyName, username, address, zipCode, mobileNumber } = body;

    await sql`
      UPDATE users 
      SET 
        company_name = ${companyName || null},
        username = ${username || null},
        address = ${address || null},
        zip_code = ${zipCode || null},
        mobile_number = ${mobileNumber || null},
        updated_at = NOW()
      WHERE email = ${session.user.email}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Profile updated successfully' 
    });

  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}