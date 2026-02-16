import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongoose";
import { Link } from "@/models/Link";

export default async function ShortLinkPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  await connectToDatabase();

  const link = await Link.findOne({ shortCode });

  if (!link) {
    return redirect("/");
  }

  if(link.isPaused) {
    return redirect("/");
  }

  const now = new Date();
  if (
    (link.maxClicks && link.clicks >= link.maxClicks) ||
    (link.expiresAt && link.expiresAt < now)
  ) {
    return redirect("/"); 
  }

  link.clicks += 1;
  await link.save();

  return redirect(link.longUrl);
}
