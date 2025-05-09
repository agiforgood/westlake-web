import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (accessToken) {
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/admin", "/network"], // Specify the routes the middleware applies to
};