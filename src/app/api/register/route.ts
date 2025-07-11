import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const prisma = new PrismaClient();  

export async function POST(req: NextRequest){
    const { email, password, retypePassword, otp } = await req.json();
    const existing = await prisma.users.findUnique({ where: { email } });  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-otp`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, otp}),
    });
    const data = await res.json();
    if (existing) {
    return NextResponse.json({ message: "Email is already registered" }, { status: 400 });
    }

    if(password !== retypePassword){
        return NextResponse.json({message:"recheck your password"} , {status:400});
    }

    if(!res.ok){
        return NextResponse.json({message:data.message}, {status:400});
    }

        const hashed = await bcrypt.hash(password,10);
        await prisma.users.create({
        data: {
            email,
            password: hashed,
            role: "user"
            },
        });
        const token = jwt.sign({ email }, 
            process.env.JWT_SECRET as string, 
            {expiresIn: "1h"});
        (await cookies()).set("token", token,{
            httpOnly: true,
            path:"/",
            maxAge:3600
        });

    return NextResponse.json({ message: "Registered" });
}