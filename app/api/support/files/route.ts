// app/api/support/files/route.ts
import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { blobs } = await list();

    // Filter out folders (they have size 0 and pathname ending with /)
    // and transform blob data to match our interface
    const files = blobs
      .filter(blob => {
        // Only include actual files (not folders)
        // Files have extensions and don't end with /
        const isFolder = blob.pathname.endsWith('/') || blob.size === 0;
        return !isFolder;
      })
      .map(blob => ({
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