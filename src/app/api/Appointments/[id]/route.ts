import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const appointmentId = Number(context.params.id);

  try {
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: appointmentId },
      select: {
        dose_number: true,
        vaccine_id: true,
      },
    });

    if (!appointment) {
      return NextResponse.json({ message: "Không tìm thấy lịch hẹn" }, { status: 404 });
    }

    await prisma.vaccines.update({
      where: { vaccine_id: appointment.vaccine_id! },
      data: {
        stock_quantity: {
          increment: appointment.dose_number!, 
        },
      },
    });

    await prisma.appointments.update({
      where: { appointment_id: appointmentId },
      data: { status: "Huy" },
    });

    return NextResponse.json({ message: "Huỷ thành công" });
  } catch (err) {
    return NextResponse.json({ message: "Lỗi khi huỷ lịch" }, { status: 500 });
  }
}