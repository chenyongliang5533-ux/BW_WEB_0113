// app/api/admin/users/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin
    const adminCheck = await sql`
      SELECT is_admin FROM users WHERE email = ${session.user.email}
    `;

    if (!adminCheck.rows[0]?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all users
    const result = await sql`
      SELECT 
        user_id as "userId",
        email,
        username,
        company_name as "companyName",
        address,
        zip_code as "zipCode",
        mobile_number as "mobileNumber",
        is_admin as "isAdmin",
        created_at as "createdAt"
      FROM users
      ORDER BY created_at DESC
    `;

    return NextResponse.json(result.rows);

  } catch (error: any) {
    console.error('Admin users fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}