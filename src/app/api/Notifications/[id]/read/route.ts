import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { email: string };

    const user = await prisma.users.findUnique({
      where: { email: decoded.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy user' }, { status: 404 });
    }

    const notifications = await prisma.notifications.findMany({
      where: { user_id: user.id },
      orderBy: { send_date: 'desc' },
    });

    return NextResponse.json(notifications);
  } catch (err) {
    console.error('Lỗi khi lấy thông báo:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
