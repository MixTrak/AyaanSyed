import { NextResponse } from "next/server";

// This is a very simple admin login route.
// In production, use proper authentication (JWT, NextAuth, bcrypt, etc.).

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    // ✅ Check against env variable
    if (password === process.env.ADMIN_PASSWORD) {
      // You can later replace this with JWT or session cookies
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
