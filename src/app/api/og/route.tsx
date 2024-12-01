import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const title = new URL(req.url).searchParams.get('title') || 'Friend'
    return new ImageResponse(
      (
        <div
          tw="flex flex-col"
          style={{
            fontSize: 40,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            padding: '50px 200px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            Hello{title ? `, ${title}` : ''}!
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=0, must-revalidate'
        }
      }
    )
  } catch (error) {
    console.error('OG Image generation failed:', error)
    return new Response(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
}
