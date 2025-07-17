import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);




export async function POST(req: NextRequest) {
	const token = (await cookies()).get("token")?.value;

	if (!token) {
		return NextResponse.json({ message: "Không có token" }, { status: 401 });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

		const { doseNumber, vaccine_id, stockQuantity } = await req.json();
		const now = dayjs().tz('Asia/Ho_Chi_Minh').format();


		const user = await prisma.users.findUnique({
			where: { email: decoded.email },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });
		}
		console.log(Number(doseNumber), Number(vaccine_id));
		await prisma.appointments.create({
			data: {
				dose_number: Number(doseNumber),
				vaccine_id: Number(vaccine_id),
				user_id: user.id,
				status: "DXL",
				created_at: now,
			},
		});
		const stock_quantity = Number(stockQuantity) - Number(doseNumber);
		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vaccines`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ vaccine_id, stock_quantity })
		})

		return NextResponse.json({ message: "Tạo lịch hẹn thành công" });
	} catch (err) {
		return NextResponse.json({ message: "Phiên đăng nhập không hợp lệ" }, { status: 401 });
	}
}
