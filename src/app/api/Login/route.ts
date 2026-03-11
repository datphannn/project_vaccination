import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const user = await prisma.users.findUnique({ where: { email }, select: { id: true ,password: true } });
    const userRole = await prisma.users.findUnique({where:{email}, select:{role:true}});
    const role = userRole?.role ?? "user";
    const passwordDB = user?.password;

    if (!user || !passwordDB) {
        return NextResponse.json({ error: "User not found or password missing" }, { status: 401 });
    }

    const compare = await bcrypt.compare(password, passwordDB);
    if (!compare) {
        return NextResponse.json({ message: "password is incorrected!!" }, { status: 401 });
    }

    try{
        const token = jwt.sign({
                id: user.id,
                email: email,
                role,
            },
             process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        (await cookies()).set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 3600,
            sameSite: "none", 
            secure: true     
        });
    }catch(error){
        console.log(error);
    }

    

    return NextResponse.json({ message: "Login" });
}