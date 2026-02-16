import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { Link } from "@/models/Link"
// import { Link as LinkType } from "@/types/link"

export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const { longUrl, customAlias, expiresAt, maxClicks } = await req.json()

    if (!longUrl) {
      return NextResponse.json(
        { error: "Long URL is required" },
        { status: 400 }
      )
    }

    const shortCode =
      customAlias ||
      Math.random().toString(36).substring(2, 8).toLowerCase()

    const existing = await Link.findOne({ shortCode })
    if (existing) {
      return NextResponse.json(
        { error: "Alias already taken" },
        { status: 409 }
      )
    }

    const newLinkData: {longUrl: string; shortCode: string; expiresAt?: Date; maxClicks?: number} = {
      longUrl,
      shortCode,
    }

    if (expiresAt) {
      const expiresDate = new Date(expiresAt)
      if (isNaN(expiresDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid expiration date" },
          { status: 400 }
        )
      }
      newLinkData.expiresAt = expiresDate
    }

    if (maxClicks) {
      const max = Number(maxClicks)
      if (isNaN(max) || max < 1) {
        return NextResponse.json(
          { error: "Maximum clicks must be a positive number" },
          { status: 400 }
        )
      }
      newLinkData.maxClicks = max
    }

    const newLink = await Link.create(newLinkData)

    return NextResponse.json({ shortCode: newLink.shortCode })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectToDatabase()

   
    const links = await Link.find();

    return NextResponse.json({ results: links.length, links })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
