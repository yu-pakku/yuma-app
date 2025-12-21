import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.headers.get("x-demo-token");
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/memos/:path*"],
};
