export type Locale = "zh"

export const locales: Locale[] = ["zh"]
export const defaultLocale: Locale = "zh"

export function getLocaleFromPathname(pathname: string): Locale {
  return defaultLocale
}

export function removeLocaleFromPathname(pathname: string): string {
  return pathname
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return path
}
