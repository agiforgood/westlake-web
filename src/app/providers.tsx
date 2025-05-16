"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { LogtoProvider } from "@logto/react";
import { logtoConfig } from "@/lib/logto";
import { ProfileProvider } from "./providers/ProfileProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LogtoProvider config={logtoConfig}>
      <HeroUIProvider>
        <ProfileProvider>
          <ToastProvider />
          {children}
        </ProfileProvider>
      </HeroUIProvider>
    </LogtoProvider>
  );
}
