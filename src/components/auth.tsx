'use client'

import { Button } from "@heroui/button"

export function SignIn({ onSignIn }: { onSignIn: () => Promise<void> }) {
    return (
        <Button onPress={() => {
            onSignIn()
        }}>登录</Button>
    )
}

export function SignOut({ onSignOut }: { onSignOut: () => Promise<void> }) {
    return (
        <button onClick={() => {
            onSignOut()
        }}>
            退出登录
        </button>
    )
}