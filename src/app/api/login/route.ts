import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, password, otp } = await req.json();
    const user = await prisma.users.findUnique({ where: { email }, select: { password: true } });
    const passwordDB = user?.password;

    if (!user || !passwordDB) {
        return NextResponse.json({ error: "User not found or password missing" }, { status: 401 });
    }

    const compare = await bcrypt.compare(password, passwordDB);
    if (!compare) {
        return NextResponse.json({ message: "password is incorrected!!" }, { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/VerifyOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        (await cookies()).set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 3600,
        });

    }

    return NextResponse.json({ message: "Login" });
}