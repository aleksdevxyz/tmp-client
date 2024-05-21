import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    id,
    type,
    link_not_work,
    drugs,
    false_information,
    child_abuse,
    csrf_token,
  } = await req.json();
  const signed_token = cookies().get("csrf-token")?.value;
  
  const complaint = await fetch(
    `${process.env.BASE_URL}/complaint?object_id=${id}&type=${type}&link_not_work=${link_not_work}&drugs=${drugs}&false_information=${false_information}&child_abuse=${child_abuse}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `csrf-token=${signed_token}`,
        "accept": "application/json",
      },
      body: JSON.stringify({csrf_token}),
    }
  );
  try {
    const contentType = complaint.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await complaint.json();
      return NextResponse.json(data);
    } else {
      const text = await complaint.text();
      return NextResponse.json({ error: text }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
