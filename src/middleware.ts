import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(req: NextRequest) {

  //TODO Make user only be able to access homepage

  {/* Implement Path Url to Header */}
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-url', req.url)

  {/* Implement Caching User Route */}
  const currentPath = req.nextUrl.pathname

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
