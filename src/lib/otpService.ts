import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function saveOtp(email: string, code:string){
    const expiresAt = new Date(Date.now()+1000*60*5);
    await prisma.oTP.upsert({
        where: {email},
        update:{code, expiresAt},
        create:{email,code,expiresAt}
    });
}
export async function getOtp(email:string){
    const otpDB = await prisma.oTP.findUnique({
        where:{email}
    });
    if(otpDB == null) return null;
    if(otpDB.expiresAt < new Date()) {
        await deleteOtp(email);
        return null;
    }
    return otpDB;
}

export async function deleteOtp(email: string) {
    await prisma.oTP.deleteMany({
        where:{email}
    });
}
