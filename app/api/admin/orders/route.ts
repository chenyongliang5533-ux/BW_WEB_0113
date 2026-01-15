// app/api/admin/orders/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// GET - Fetch all orders
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

    // Get all orders with user info
    const result = await sql`
      SELECT 
        o.order_id as "orderId",
        o.user_id as "userId",
        u.email as "userEmail",
        o.material_code as "materialCode",
        o.quantity,
        o.discount_code as "discountCode",
        o.discount_percentage as "discountPercentage",
        o.special_remarks as "specialRemarks",
        o.company_full_name as "companyFullName",
        o.shipping_address as "shippingAddress",
        o.contact_info as "contactInfo",
        o.order_status as "orderStatus",
        o.tracking_number as "trackingNumber",
        o.admin_comments as "adminComments",
        o.created_at as "createdAt",
        o.updated_at as "updatedAt"
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      ORDER BY o.created_at DESC
    `;

    return NextResponse.json(result.rows);

  } catch (error: any) {
    console.error('Admin orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// PUT - Update order
export async function PUT(request: Request) {
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

    const body = await request.json();
    const { orderId, orderStatus, trackingNumber, adminComments } = body;

    await sql`
      UPDATE orders 
      SET 
        order_status = ${orderStatus},
        tracking_number = ${trackingNumber || null},
        admin_comments = ${adminComments || null},
        updated_at = NOW()
      WHERE order_id = ${orderId}
    `;

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully'
    });

  } catch (error: any) {
    console.error('Admin order update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}