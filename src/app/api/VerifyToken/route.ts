import jwt from "jsonwebtoken";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function GET(){
  const token = (await cookies()).get("token")?.value;
  if(!token) return NextResponse.json({LoggedIn: false}, {status: 401});
  try{
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.json({LoggedIn: true, user})
  }catch{
    return NextResponse.json({LoggedIn: false}, {status: 401});
  }
}