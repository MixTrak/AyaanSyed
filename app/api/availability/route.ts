import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Availability from "@/lib/models/Availability";

export async function GET() {
  await dbConnect();

  let doc = await Availability.findOne();
  if (!doc) {
    doc = await Availability.create({ available: false });
  }

  return NextResponse.json({ available: doc.available });
}

export async function PATCH(req: Request) {
  await dbConnect();
  const { available } = await req.json();

  let doc = await Availability.findOne();
  if (!doc) {
    doc = await Availability.create({ available });
  } else {
    doc.available = available;
    await doc.save();
  }

  return NextResponse.json({ success: true, available: doc.available });
}
