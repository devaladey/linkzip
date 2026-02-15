import { connectToDatabase } from "@/lib/mongoose";
import { Link } from "@/models/Link";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_: NextRequest, { params }: { params: Promise<{ shortCode: string }> }) {
  await connectToDatabase();

  const { shortCode } = await params;
  const link = await Link.findOne({ shortCode });

  if (!link) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }

  const now = new Date();

  // Check expiration
  if ((link.expiresAt && now > link.expiresAt) || 
      (link.maxClicks && link.clicks >= link.maxClicks) || 
      link.status === 'inactive') {
    return NextResponse.json({ error: 'Link is inactive' }, { status: 410 }); // 410 Gone
  }

  // Increment clicks
  link.clicks += 1;
  await link.save();

  // Redirect to long URL
  return NextResponse.redirect(link.longUrl);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  await connectToDatabase();

  const deletedLink = await Link.findOneAndDelete({ shortCode });

  if (!deletedLink) {
    return NextResponse.json(
      { error: "Link not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}