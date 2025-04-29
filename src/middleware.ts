import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const cookieHeader = request.headers.get("cookie");
    const cookies = cookieHeader?.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc.set(key, value);
        return acc;
    }, new Map());

    const sessionCookie =
        cookies?.get("better-auth.session_token") ||
        cookies?.get("__Secure-better-auth.session_token");

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/admin", "/network"], // Specify the routes the middleware applies to
};