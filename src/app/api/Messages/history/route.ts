import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const user = await prisma.users.findUnique({ where: { email: decoded.email } });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const messages = await prisma.messages.findMany({
      where: { asked_user_id: user.id },
      orderBy: { created_at: "asc" }
    });

    return NextResponse.json({ messages });
  } catch (err) {
    return NextResponse.json({ error: "Lỗi khi lấy lịch sử." }, { status: 500 });
  }
}