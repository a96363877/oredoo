// This function gets the user's country using ipapi.co (free tier, no API key required)
export async function getUserCountry(): Promise<string> {
    try {
      const response = await fetch("https://ipapi.co/json/", {
        cache: "no-store", // Ensure we don't cache the response
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      const data = await response.json()
      console.log("Geolocation data:", data)
  
      return data.country_name || "unknown"
    } catch (error) {
      console.error("Error fetching country:", error)
      return "unknown"
    }
  }
  
  // Alternative function using ip-api.com (another free option)
  export async function getUserCountryAlternative(): Promise<string> {
    try {
      const response = await fetch("http://ip-api.com/json/", {
        cache: "no-store",
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      const data = await response.json()
      console.log("Alternative geolocation data:", data)
  
      return data.countryCode || "unknown"
    } catch (error) {
      console.error("Error fetching country (alternative):", error)
      return "unknown"
    }
  }
  