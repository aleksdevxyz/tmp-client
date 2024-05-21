import axios from "axios";
import { NextResponse } from "next/server";
import setCookie from "set-cookie-parser";
import cookie from "cookie";

export async function POST() {
  const request = await axios.get(
    `${process.env.BASE_URL}/get_csrf_tokens`,
    {
      withCredentials: true,
    }
  );
  const cookies = setCookie.parse(request.headers["set-cookie"] as string[], {
    map: true,
  });

  const setCookies = Object.values(cookies).map((cookieObj) => {
    return cookie.serialize(cookieObj.name, cookieObj.value, {
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "none",
      secure: true,
    });
  });

  
  const response = NextResponse.json({});
  response.headers.set("Set-Cookie", setCookies.join("; "));
  const csrf_token = request.data.csrf_token
  return NextResponse.json({csrf_token}, response);

}
