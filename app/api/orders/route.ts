// app/api/orders/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// GET - Fetch user's orders
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user_id from email
    const userResult = await sql`
      SELECT user_id FROM users WHERE email = ${session.user.email}
    `;

    if (userResult.rows.length === 0) {
      return NextResponse.json({ orders: [] });
    }

    const userId = userResult.rows[0].user_id;

    // Get all orders for this user
    const ordersResult = await sql`
      SELECT 
        order_id as "orderId",
        material_code as "materialCode",
        quantity,
        discount_code as "discountCode",
        discount_percentage as "discountPercentage",
        order_status as "orderStatus",
        tracking_number as "trackingNumber",
        admin_comments as "adminComments",
        created_at as "createdAt"
      FROM orders 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(ordersResult.rows);

  } catch (error: any) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST - Create new order(s)
export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      orderItems, 
      discountCode, 
      discountPercentage,
      specialRemarks, 
      companyFullName, 
      shippingAddress, 
      contactInfo 
    } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { error: 'No order items provided' },
        { status: 400 }
      );
    }

    // Get user_id
    const userResult = await sql`
      SELECT user_id FROM users WHERE email = ${session.user.email}
    `;

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userId = userResult.rows[0].user_id;

    // If discount code is provided, mark it as used
    if (discountCode) {
      await sql`
        UPDATE discount_codes 
        SET is_used = true, used_by_user_id = ${userId}, used_at = NOW()
        WHERE discount_code = ${discountCode} AND is_used = false
      `;
    }

    // Insert each order item
    const orderIds = [];
    for (const item of orderItems) {
      const result = await sql`
        INSERT INTO orders (
          user_id, 
          material_code, 
          quantity, 
          discount_code,
          discount_percentage,
          special_remarks, 
          company_full_name, 
          shipping_address, 
          contact_info,
          order_status,
          created_at,
          updated_at
        ) VALUES (
          ${userId},
          ${item.materialCode},
          ${item.quantity},
          ${discountCode || null},
          ${discountPercentage || 0},
          ${specialRemarks || null},
          ${companyFullName || null},
          ${shippingAddress || null},
          ${contactInfo || null},
          'Pending',
          NOW(),
          NOW()
        )
        RETURNING order_id
      `;
      orderIds.push(result.rows[0].order_id);
    }

    // TODO: Send email notification to admin

    return NextResponse.json({
      success: true,
      message: 'Orders created successfully',
      orderIds
    });

  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}