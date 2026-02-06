// app/api/auth/verify-code/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, code, password } = await request.json();

    if (!email || !code || !password) {
      return NextResponse.json(
        { error: 'Email, code, and password are required' },
        { status: 400 }
      );
    }

    // Get verification code from database
    const result = await sql`
      SELECT * FROM verification_codes 
      WHERE email = ${email} 
      AND verified = false
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'No verification code found' },
        { status: 400 }
      );
    }

    const verificationRecord = result.rows[0];

    // Check if code has expired
    if (new Date() > new Date(verificationRecord.expires_at)) {
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Check if code matches
    if (verificationRecord.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await sql`
      INSERT INTO users (email, password_hash, username, created_at, updated_at)
      VALUES (${email}, ${hashedPassword}, ${email}, NOW(), NOW())
    `;

    // Mark verification code as used
    await sql`
      UPDATE verification_codes 
      SET verified = true 
      WHERE email = ${email}
    `;

    return NextResponse.json({
      success: true,
      message: 'User registered successfully'
    });

  } catch (error: any) {
    console.error('Verification error:', error);
    
    // Check if user already exists
    if (error.message?.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}