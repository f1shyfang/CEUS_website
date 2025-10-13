export interface VerificationCode {
  code: string;
  email: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserData {
  discordId: string;
  email: string;
  verified: boolean;
  lastRequestTime?: Date;
}
