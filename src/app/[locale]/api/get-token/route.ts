import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
  
  const {token} = await req.json()

  //  cookieStore.set("csrf_token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   path: "/",
  // });

  

  return NextResponse.json({ csrf_token: token });;
}