import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/config/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}`, request.url))
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
