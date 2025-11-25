import { NextRequest, NextResponse } from "next/server";

// Add your allowed origins here
// For Vercel preview deployments, you might need to allow preview URLs dynamically
const allowedOrigins = [
  "http://localhost:3000",
  "https://megastom-frontend-git-payload-migration-ginetiks-projects.vercel.app",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";

  // Allow all Vercel preview deployments
  const isAllowedOrigin =
    allowedOrigins.includes(origin) || origin.includes("vercel.app");

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/:path*",
};
