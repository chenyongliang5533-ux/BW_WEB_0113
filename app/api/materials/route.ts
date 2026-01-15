// app/api/materials/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        material_code as "materialCode",
        material_name as "materialName",
        category,
        description,
        unit_price as "unitPrice"
      FROM materials
      ORDER BY category, material_name
    `;

    return NextResponse.json(result.rows);

  } catch (error: any) {
    console.error('Materials fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}