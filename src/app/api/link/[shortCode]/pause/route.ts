import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Link } from "@/models/Link";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  try {
    const { isPaused } = await req.json();

    if (typeof isPaused !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Invalid value" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updated = await Link.findOneAndUpdate(
      { shortCode },
      { isPaused },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
