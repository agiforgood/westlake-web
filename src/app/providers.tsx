'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { LogtoProvider } from '@logto/react'
import { logtoConfig } from '@/lib/logto'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LogtoProvider config={logtoConfig}>
            <HeroUIProvider>
                <ToastProvider />
                {children}
            </HeroUIProvider>
        </LogtoProvider>
    )
}