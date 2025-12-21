import { NextResponse } from "next/server";

const LARAVEL_API =
  process.env.LARAVEL_API || "http://localhost:8003/api/memos";

export async function GET() {
  try {
    const res = await fetch(LARAVEL_API, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Laravel GET failed");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch memos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(LARAVEL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Laravel POST failed");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create memo" },
      { status: 500 }
    );
  }
}
　