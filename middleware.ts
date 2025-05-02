import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get country from various sources with better debugging
  const geoCountry = request.geo?.country
  const vercelCountry = request.headers.get("x-vercel-ip-country")
  const cfCountry = request.headers.get("cf-ipcountry") // Cloudflare also provides this

  // Log all possible sources for debugging
  console.log({
    geoCountry,
    vercelCountry,
    cfCountry,
    allHeaders: Object.fromEntries(request.headers.entries()),
    url: request.url,
    geo: request.geo,
  })

  // Use the first available country source or default to "unknown"
  const country = geoCountry || vercelCountry || cfCountry || "unknown"
  console.log(`Detected country: ${country}`)

  // Check if the request is for the home page
  const url = request.nextUrl.clone()
  if (url.pathname === "/") {
    // If user is from Kuwait, redirect to Kuwait-specific page
    if (country.toLowerCase() === "kw") {
      url.pathname = "/kw"
      return NextResponse.redirect(url)
    }

    // For testing: You can force a redirect by adding a country query parameter
    // Example: /?country=kw
    const forcedCountry = url.searchParams.get("jo")
    if (forcedCountry && forcedCountry.toLowerCase() === "kw") {
      url.pathname = "/kw"
      url.searchParams.delete("country") // Remove the query parameter
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
}
