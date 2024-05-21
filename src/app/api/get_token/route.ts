import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import setCookie from "set-cookie-parser";
import { cookies } from "next/headers";

export async function POST(req: NextRequest,res: NextResponse) {

  const request = await axios.get(
    `${process.env.BASE_URL}/get_csrf_tokens`,
    {
      withCredentials: true,
    }
  );
  const cookiesList = setCookie.parse(request.headers["set-cookie"] as string[], {
    map: true,
  });

  Object.values(cookiesList).map((cookieObj) => {
    return cookies().set(cookieObj.name, cookieObj.value, {
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "none",
      secure: true,
    });
  });

  const csrf_token = request.data.csrf_token
  
  return NextResponse.json(csrf_token);
}
