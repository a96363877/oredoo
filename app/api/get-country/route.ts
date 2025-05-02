import { NextResponse } from "next/server"

// This is a server-side API route that can be used as another option
// to detect the country if client-side detection fails
export async function GET(request: Request) {
  try {
    // Use a third-party service to get the IP and country
    const response = await fetch("https://ipapi.co/json/", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      country: data.country_code || "unknown",
      countryName: data.country_name || "Unknown",
      ip: data.ip || "unknown",
      success: true,
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        country: "unknown",
        countryName: "Unknown",
        success: false,
        error: "Failed to detect country",
      },
      { status: 500 },
    )
  }
}
