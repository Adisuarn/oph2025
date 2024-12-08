import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import { getBaseUrl } from '~/libs/utils'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const code = new URL(req.url).searchParams.get('code')
    if (!code) throw new Error('Bad Request')

    const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
      getBaseUrl() + '/checkin?code=' + code
    )}&size=200&centerImageUrl=${encodeURIComponent('https://i.imgur.com/F3SLsQz.png')}`

    return new ImageResponse(
      (
        <div
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img src={qrUrl} alt="QR Code" tw="w-[200px] h-[200px]" />
          <p>Scan this QR code to check in!</p>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('OG Image generation failed:', error)
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'
      }`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    )
  }
}
