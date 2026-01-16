// app/api/support/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Blob with category prefix
    const pathname = `${category}/${file.name}`;
    const blob = await put(pathname, file, {
      access: 'public',
    });

    return NextResponse.json({
      success: true,
      blob: {
        url: blob.url,
        pathname: blob.pathname,
      }
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}