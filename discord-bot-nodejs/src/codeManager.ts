import { VerificationCode, UserData } from './types';
import { config } from './config';

export class CodeManager {
  private verificationCodes: Map<string, VerificationCode> = new Map();
  private userData: Map<string, UserData> = new Map();

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  createVerificationCode(userId: string, email: string): string {
    // Remove any existing code for this user
    this.removeCodeForUser(userId);

    const code = this.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + config.codeExpirationMinutes);

    const verificationCode: VerificationCode = {
      code,
      email,
      userId,
      expiresAt,
      createdAt: new Date(),
    };

    this.verificationCodes.set(userId, verificationCode);
    return code;
  }

  verifyCode(userId: string, code: string): { success: boolean; message: string } {
    const storedCode = this.verificationCodes.get(userId);

    if (!storedCode) {
      return { success: false, message: 'No verification code found. Please request a new code.' };
    }

    if (new Date() > storedCode.expiresAt) {
      this.verificationCodes.delete(userId);
      return { success: false, message: 'Verification code has expired. Please request a new code.' };
    }

    if (storedCode.code !== code) {
      return { success: false, message: 'Invalid verification code. Please try again.' };
    }

    // Code is valid - mark user as verified
    this.userData.set(userId, {
      discordId: userId,
      email: storedCode.email,
      verified: true,
    });

    this.verificationCodes.delete(userId);
    return { success: true, message: 'Email verified successfully!' };
  }

  canRequestCode(userId: string): { allowed: boolean; message?: string } {
    const user = this.userData.get(userId);
    
    if (user?.lastRequestTime) {
      const timeSinceLastRequest = Date.now() - user.lastRequestTime.getTime();
      const rateLimitMs = config.rateLimitMinutes * 60 * 1000;

      if (timeSinceLastRequest < rateLimitMs) {
        const minutesLeft = Math.ceil((rateLimitMs - timeSinceLastRequest) / 60000);
        return {
          allowed: false,
          message: `Please wait ${minutesLeft} minute(s) before requesting another code.`,
        };
      }
    }

    return { allowed: true };
  }

  updateLastRequestTime(userId: string, email: string): void {
    const user = this.userData.get(userId) || {
      discordId: userId,
      email,
      verified: false,
    };
    user.lastRequestTime = new Date();
    this.userData.set(userId, user);
  }

  isUserVerified(userId: string): boolean {
    return this.userData.get(userId)?.verified || false;
  }

  getUserEmail(userId: string): string | null {
    return this.userData.get(userId)?.email || null;
  }

  private removeCodeForUser(userId: string): void {
    this.verificationCodes.delete(userId);
  }

  // Cleanup expired codes periodically
  cleanupExpiredCodes(): void {
    const now = new Date();
    for (const [userId, code] of this.verificationCodes.entries()) {
      if (now > code.expiresAt) {
        this.verificationCodes.delete(userId);
      }
    }
  }
}
