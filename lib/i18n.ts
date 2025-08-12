export type Locale = "zh" | "en"

export const locales: Locale[] = ["zh", "en"]
export const defaultLocale: Locale = "zh"

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/")
  const locale = segments[1] as Locale

  if (locales.includes(locale)) {
    return locale
  }

  return defaultLocale
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/")
  const locale = segments[1] as Locale

  if (locales.includes(locale)) {
    return "/" + segments.slice(2).join("/")
  }

  return pathname
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // If path is empty, return just the locale
  if (!cleanPath) {
    return `/${locale}`
  }

  return `/${locale}/${cleanPath}`
}
