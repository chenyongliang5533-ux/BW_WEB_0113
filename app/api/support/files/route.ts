// app/api/support/files/route.ts
import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { blobs } = await list();

    // Transform blob data to match our interface
    const files = blobs.map(blob => ({
      id: blob.pathname,
      filename: blob.pathname.split('/').pop() || blob.pathname,
      url: blob.url,
      category: extractCategory(blob.pathname),
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));

    return NextResponse.json(files);

  } catch (error: any) {
    console.error('Blob fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

// Extract category from file path
// Expected format: category/filename.pdf
// e.g., "datasheet/BWR-352-Datasheet.pdf" -> "datasheet"
function extractCategory(pathname: string): string {
  const parts = pathname.split('/');
  if (parts.length > 1) {
    return parts[0];
  }
  // Default to 'other' if no category folder
  return 'other';
}