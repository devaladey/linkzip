import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { Link } from "@/models/Link"

export async function POST(req: Request) {
  try {
    await connectToDatabase()

    const { longUrl, customAlias } = await req.json()

    if (!longUrl) {
      return NextResponse.json(
        { error: "Long URL is required" },
        { status: 400 }
      )
    }

    const shortCode =
      customAlias ||
      Math.random().toString(36).substring(2, 8).toLowerCase()

    // Check if alias already exists
    const existing = await Link.findOne({ shortCode })

    if (existing) {
      return NextResponse.json(
        { error: "Alias already taken" },
        { status: 409 }
      )
    }

    const newLink = await Link.create({
      longUrl,
      shortCode,
    })

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
