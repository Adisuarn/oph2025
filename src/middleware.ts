import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {

  const currentPath = req.nextUrl.pathname

  {/* Implement Path Url to Header */}
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-current-path', currentPath)

  { /* Redirect User To HomePage*/}
  // if (currentPath !== '/') {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

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
