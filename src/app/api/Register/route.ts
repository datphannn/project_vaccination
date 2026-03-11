
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { email, password, retypePassword, otp } = await req.json(); 
    const user = await prisma.users.findUnique({
        where: { email },
        select: {
            email: true,
            role: true
        }
    });
    const role = user?.role ?? "user";
    try {
        const existing = await prisma.users.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ message: "Email is already registered" }, { status: 400 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/VerifyOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();

    if (password !== retypePassword) {
        return NextResponse.json({ message: "recheck your password" }, { status: 400 });
    }

    if (!res.ok) {
        return NextResponse.json({ message: data.message }, { status: 400 });
    }
    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await prisma.users.create({
            data: {
                email,
                password: hashed,
                role: "user"
            },
        });
    } catch (error: any) {
        console.error("🔴 Prisma create error:", error);
        console.log("🔍 Debug error JSON:", JSON.stringify(error, null, 2));

        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    const token = jwt.sign({
        email: email,
        role,
    },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" });
    (await cookies()).set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600
    });

    return NextResponse.json({ message: "Registered" });
}