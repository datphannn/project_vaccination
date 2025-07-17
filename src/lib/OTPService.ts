import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function saveOtp(email: string, code:string){
    const expiresAt = new Date(Date.now()+1000*60*5);
    try{
    await prisma.oTP.upsert({
        where: {email},
        update: {code, expiresAt},
        create: {email, code, expiresAt}
    });
    }catch{
        return NextResponse.json({status : 500});
    }
}
export async function getOtp(email:string){
    try{
    const otpDB = await prisma.oTP.findUnique({
        where:{email}
    });
    if(otpDB == null){
        console.log("does not exist OTP in database");
        return null;
    }
    if(otpDB.expiresAt < new Date()) {
        console.log("OTP expires");
        await deleteOtp(email);
        return null;
    }
    return otpDB;
    }catch{
        return null
    }
}

export async function deleteOtp(email: string) {
    await prisma.oTP.deleteMany({
        where:{email}
    });
}
