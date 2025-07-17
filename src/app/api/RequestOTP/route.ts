import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveOtp } from "@/lib/OTPService";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOtp(email, otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your code is: <b>${otp}</b></p>`,
  });

  return NextResponse.json({ message: "OTP sent" });
}
``