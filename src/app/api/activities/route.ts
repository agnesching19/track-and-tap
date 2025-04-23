import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import stravaV3, { DetailedActivityResponse } from "strava-v3";
import { AuthRepository } from "@/app/lib/modules/AuthRepository";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  /**
   * Verifying Auth
   */
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  if (
    typeof accessToken !== "string" ||
    !jwt.verify(accessToken, process.env.JWT_KEY!)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const authRepository = new AuthRepository();
  const decodedAccessToken = jwt.decode(accessToken);

  if (decodedAccessToken === null || typeof decodedAccessToken === "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const auth = authRepository.readAuth(decodedAccessToken.id);

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /**
   * Getting activities from Strava
   */
  stravaV3.client(auth.accessToken);
  const activities: DetailedActivityResponse[] =
    await stravaV3.athlete.listActivities({ per_page: 10 });

  return NextResponse.json({ activities });
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method is not supported for this endpoint" },
    { status: 405 }
  );
}
