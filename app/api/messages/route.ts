import mongoose, { Schema, model, models } from "mongoose";
import { NextResponse } from "next/server";

// ✅ MongoDB connection (no external lib file needed)
const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables");
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

// ✅ Message Schema & Model
const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);

// ✅ GET all messages
export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// ✅ DELETE a message by ID
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch{
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
