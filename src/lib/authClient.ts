import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

const DEV_API_BASE = 'http://localhost:3000';
const PRO_API_BASE = 'https://api.westlakeaiforgood.com';
const API_BASE = process.env.NODE_ENV === 'development' ? DEV_API_BASE : PRO_API_BASE;

export const authClient = createAuthClient({
    baseURL: API_BASE,
    plugins: [
        adminClient()
    ]
})