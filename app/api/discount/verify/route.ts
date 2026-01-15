// app/api/discount/verify/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({
        valid: false,
        message: 'No code provided'
      });
    }

    const result = await sql`
      SELECT discount_percentage, is_used
      FROM discount_codes
      WHERE discount_code = ${code}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid code'
      });
    }

    const discount = result.rows[0];

    if (discount.is_used) {
      return NextResponse.json({
        valid: false,
        message: 'Code already used'
      });
    }

    return NextResponse.json({
      valid: true,
      percentage: discount.discount_percentage,
      message: 'Code verified'
    });

  } catch (error: any) {
    console.error('Discount verification error:', error);
    return NextResponse.json(
      { valid: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}