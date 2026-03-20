import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Không có token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const email = decoded.email;

    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) throw new Error("Không tìm thấy user");

    const appointments = await prisma.appointments.findMany({
      where: {
        user_id: user.id,
        status: "DXL"
      },
      select: {
        appointment_id:true,
        dose_number: true,
        created_at: true,
        status: true,
        vaccines: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Lỗi server" }, { status: 400 });
  }
}
