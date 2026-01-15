// app/api/admin/verify/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false });
    }

    const result = await sql`
      SELECT is_admin FROM users WHERE email = ${session.user.email}
    `;

    if (result.rows.length === 0 || !result.rows[0].is_admin) {
      return NextResponse.json({ isAdmin: false });
    }

    return NextResponse.json({ isAdmin: true });

  } catch (error) {
    console.error('Admin verification error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}