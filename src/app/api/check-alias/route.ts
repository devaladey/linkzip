import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Link } from '@/models/Link';

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);
  const alias = url.searchParams.get('alias');

  if (!alias) {
    return NextResponse.json({ available: false, error: 'No alias provided' }, { status: 400 });
  }

  // Check if alias exists
  const existingLink = await Link.findOne({ shortCode: alias });

  const available = !existingLink;

  return NextResponse.json({ available });
}
