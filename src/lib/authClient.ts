import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    // baseURL: "http://localhost:3000", // The base URL of your auth server
    baseURL: "https://api.westlakeaiforgood.com",
    plugins: [
        adminClient()
    ]
})