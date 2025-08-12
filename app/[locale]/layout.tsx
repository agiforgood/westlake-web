import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import type { Locale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "WestLake Dashboard",
  description: "User Dashboard for WestLake Platform",
  generator: "v0.dev",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  
  return (
    <html lang={locale}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider initialLocale={locale}>
            <div>{children}</div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
