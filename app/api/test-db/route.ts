import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check all tables
    const usersCount = await sql`SELECT COUNT(*) FROM users`;
    const materialsCount = await sql`SELECT COUNT(*) FROM materials`;
    const discountCodesCount = await sql`SELECT COUNT(*) FROM discount_codes`;
    const ordersCount = await sql`SELECT COUNT(*) FROM orders`;

    // Get sample discount codes
    const sampleCodes = await sql`
      SELECT discount_code, discount_percentage 
      FROM discount_codes 
      WHERE is_used = false 
      LIMIT 5
    `;

    // Get materials
    const materials = await sql`SELECT material_code, material_name FROM materials`;

    return NextResponse.json({
      success: true,
      stats: {
        users: usersCount.rows[0].count,
        materials: materialsCount.rows[0].count,
        discountCodes: discountCodesCount.rows[0].count,
        orders: ordersCount.rows[0].count
      },
      sampleDiscountCodes: sampleCodes.rows,
      products: materials.rows
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}