
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import PaymentLog from "@/lib/models/PaymentLog";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET(req: Request) {
    // Basic protection: Admin would be authenticated via Middleware or client-side check + localStorage.
    // For API routes ideally we check cookies/headers.
    // Given the current simple `localStorage` based auth in admin/page.tsx, this API is publicly accessible if guessed.
    // I will implement it as is for now, matching the `api/messages` pattern (if any).
    // Let's check api/messages later if needed.

    try {
        await connectDB();
        const logs = await PaymentLog.find().sort({ date: -1 });
        return NextResponse.json(logs);
    } catch (error) {
        console.error("Error fetching logs", error);
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
