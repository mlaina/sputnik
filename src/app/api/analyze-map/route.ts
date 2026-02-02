import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, points } = await request.json()

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'REPLICATE_API_TOKEN not configured' },
        { status: 500 }
      )
    }

    // Use SAM (Segment Anything Model) to detect segments
    // If points are provided, use them as prompts for specific segments
    const input: Record<string, unknown> = {
      image: imageUrl,
      // Return all masks if no points specified
      ...(points && points.length > 0
        ? {
            input_points: points.map((p: { x: number; y: number }) => [p.x, p.y]),
            input_labels: points.map(() => 1), // 1 = foreground
          }
        : {}),
    }

    const output = await replicate.run(
      'meta/sam-2-base:06df3ae6bd9d958d94234c5c3a79fba3f0e4a6e4b7cdc102a0070aa7f8a5f687',
      { input }
    )

    return NextResponse.json({ segments: output })
  } catch (error) {
    console.error('Error analyzing map:', error)
    return NextResponse.json(
      { error: 'Failed to analyze map' },
      { status: 500 }
    )
  }
}
