// src/app/api/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getOtp, deleteOtp } from "@/lib/OTPService";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  const otpValid = await getOtp(email);

  if (!otpValid || otp !== otpValid?.code) {
    return NextResponse.json({ message: `${otp} ${otpValid}` }, { status: 401 });
  }

  deleteOtp(email);
  return NextResponse.json({message:"verify success!!!"},{status:200});
}