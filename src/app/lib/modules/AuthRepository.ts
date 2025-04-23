import { Database } from "./Database";

export type AuthToken = {
  userId: number;
  expiresAt: number;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
};

export class AuthRepository extends Database<AuthToken> {
  public createAuth(authCreation: AuthToken) {
    return this.createEntry("auth", String(authCreation.userId), authCreation, {
      upsert: true,
    });
  }

  public readAuth(userId: string) {
    return this.readEntry("auth", userId);
  }
}
