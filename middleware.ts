import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/config/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Якщо користувач зайшов на корінь сайту - редіректимо на дефолтну мову
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}`, request.url))
  }

  // Перевіряємо чи URL починається з валідної мови
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Якщо URL не містить мови - додаємо дефолтну
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, request.url))
  }
}

// Конфігуруємо на яких URL буде працювати middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
