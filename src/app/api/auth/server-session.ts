import { getServerSession } from "next-auth/next";
import AuthOptions from './[...nextAuth]';

export async function getSessionData() {
  const session = await getServerSession(AuthOptions);
  return session;
}