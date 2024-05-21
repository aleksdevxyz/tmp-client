import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {

    const request = await req.json();
    const signed_token = req.cookies.get("csrf-token")?.value
    const { csrf_token } = request.csrf_token
    
    const link = request.link
    const category = request.category

    const post = await fetch(`${process.env.BASE_URL}/request_to_add?type=Канал&link=${link}&category=${category}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `csrf-token=${signed_token}`,
            "accept": "application/json",
        },
        body: JSON.stringify({ csrf_token }),
    });

    if (!post.ok) {
        const error = await post.json();
        return NextResponse.json(error, { status: post.status });
    }

    const data = await post.json();

    return NextResponse.json(data);
}