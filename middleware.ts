import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 如果没有语言前缀，重定向到默认语言
  if (!pathnameHasLocale) {
    // 对于根路径 '/'，重定向到默认语言
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
    }
    
    // 对于其他路径，在前面添加默认语言前缀
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // 匹配所有路径，除了:
    // - api 路由
    // - _next 静态文件  
    // - _vercel 内部路径
    // - 静态文件 (images, etc)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}