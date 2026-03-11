import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function DELETE(
	req: NextRequest,
	context: { params: { id: string } }
) {
	const appointmentId = Number(context.params.id);
	const token = (await cookies()).get("token")?.value;

	if (!token) {
		return NextResponse.json({ message: "Không có token" }, { status: 401 });
	}

	const searchParams = req.nextUrl.searchParams;
	const vaccineName = searchParams.get("vaccine_name") || "Không rõ";

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

		const user = await prisma.users.findUnique({
			where: { email: decoded.email },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
		}

		const appointment = await prisma.appointments.findUnique({
			where: { appointment_id: appointmentId },
			select: {
				dose_number: true,
				vaccine_id: true,
			},
		});

		if (!appointment || !appointment.vaccine_id || !appointment.dose_number) {
			return NextResponse.json({ message: "Thông tin lịch hẹn không hợp lệ" }, { status: 400 });
		}

		await prisma.vaccines.update({
			where: { vaccine_id: appointment.vaccine_id },
			data: {
				stock_quantity: {
					increment: appointment.dose_number,
				},
			},
		});

		await prisma.notifications.create({
			data: {
				user_id: user.id,
				content: `Bạn đã huỷ lịch tiêm ${vaccineName}.`,
				send_date: new Date(),
				is_read: false,
			},
		});

		await prisma.appointments.update({
			where: { appointment_id: appointmentId },
			data: { status: "Huy" },
		});

		return NextResponse.json({ message: "Huỷ thành công" });
	} catch (err) {
		console.error("Lỗi khi huỷ lịch:", err);
		return NextResponse.json({ message: "Lỗi khi huỷ lịch" }, { status: 500 });
	}
}