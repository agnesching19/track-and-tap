// export async function GET() {
//   const accessToken = process.env.STRAVA_ACCESS_TOKEN

//   const res = await fetch("https://www.strava.com/api/v3/athlete/activities", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })

//   if (!res.ok) {
//     return new Response("Failed to fetch activities", { status: res.status })
//   }

//   const activities = await res.json()
//   return Response.json(activities)
// }
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    console.log("🚀 ~ POST ~ code:", request.json())
    if (!code) {
      return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
    }

    // Example: Exchange the code with Strava's API for an access token
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
