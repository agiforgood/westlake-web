'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            {/* <NextThemesProvider attribute="class" defaultTheme="light"> */}
            <ToastProvider />
            {children}
            {/* </NextThemesProvider> */}
        </HeroUIProvider>
    )
}