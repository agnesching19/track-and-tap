export async function GET() {
  const accessToken = process.env.STRAVA_ACCESS_TOKEN

  const res = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!res.ok) {
    return new Response("Failed to fetch activities", { status: res.status })
  }

  const activities = await res.json()
  return Response.json(activities)
}