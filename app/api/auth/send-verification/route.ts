// app/api/auth/send-verification/route.ts
import { Resend } from 'resend';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate 6-digit code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const expiresAtString = expiresAt.toISOString(); // Convert to ISO string

    // Store verification code in database (you'll need to create this table)
    await sql`
      INSERT INTO verification_codes (email, code, expires_at, created_at)
      VALUES (${email}, ${verificationCode}, ${expiresAtString}, NOW())
      ON CONFLICT (email) 
      DO UPDATE SET code = ${verificationCode}, expires_at = ${expiresAtString}, created_at = NOW()
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Bitswaving <noreply@bwweb.bitswaving.com>',
      to: email,
      subject: 'Your Bitswaving Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verification Code</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); padding: 40px 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Bitswaving</h1>
                        <p style="margin: 10px 0 0; color: #e0f2fe; font-size: 16px;">Email Verification</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Thank you for registering with Bitswaving. To complete your registration, please use the verification code below:
                        </p>
                        
                        <!-- Verification Code Box -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                          <tr>
                            <td align="center" style="background-color: #eff6ff; border-radius: 16px; padding: 30px;">
                              <div style="font-size: 42px; font-weight: bold; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                ${verificationCode}
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                          This code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                          © 2026 Bitswaving. All rights reserved.
                        </p>
                        <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                          This is an automated email. Please do not reply.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to email'
    });

  } catch (error: any) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}