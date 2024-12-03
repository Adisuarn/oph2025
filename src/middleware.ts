import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-url', req.url)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
