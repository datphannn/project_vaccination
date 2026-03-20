import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		start(controller) {
			const interval = setInterval(async () => {
				const appointments = await prisma.appointments.findMany({
					orderBy: {
						created_at: 'asc',
					},
					select: {
						appointment_id: true,
						dose_number: true,
						created_at: true,
						status: true,
						vaccines: {
							select: {
								name: true,
							},
						},
						users_appointments_user_idTousers: {
							select: {
								email: true,
							},
						},
					},
					where:{
						status:"DXL"
					}
				});
				controller.enqueue(
					encoder.encode(`data: ${JSON.stringify(appointments)}\n\n`)
				);
			}, 3000);

			req.signal.addEventListener("abort", () => {
				clearInterval(interval);
				controller.close();
			});
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}
export async function PUT(req: NextRequest) {
	const { appointment_id } = await req.json();
	try {
		const res = await prisma.appointments.update({
			where: { appointment_id },
			data: {
				status: "HT",
				completed_at: new Date()
			},
		});
		return NextResponse.json({ message: "update status!!" }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 400 })
	}

}
