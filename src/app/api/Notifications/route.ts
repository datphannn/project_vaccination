import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
	const token = (await cookies()).get("token")?.value;
	const secret = process.env.JWT_SECRET!;

	if (!token) {
		return NextResponse.json({ error: 'Thiếu token' }, { status: 401 });
	}

	try {
		const decoded = jwt.verify(token, secret) as { email: string };

		const user = await prisma.users.findUnique({
			where: { email: decoded.email },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json({ error: 'Không tìm thấy người dùng' }, { status: 404 });
		}

		const notifications = await prisma.notifications.findMany({
			where: { user_id: user.id },
			orderBy: { send_date: 'desc' },
			take: 10,
		});

		return NextResponse.json(notifications);
	} catch (err) {
		console.error('Lỗi xác thực JWT:', err);
		return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 403 });
	}
}
