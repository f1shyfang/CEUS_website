import dotenv from 'dotenv';

dotenv.config();

export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN || '',
    clientId: process.env.CLIENT_ID || '',
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
  },
  codeExpirationMinutes: parseInt(process.env.CODE_EXPIRATION_MINUTES || '10'),
  rateLimitMinutes: parseInt(process.env.RATE_LIMIT_MINUTES || '5'),
};

export function validateConfig(): boolean {
  if (!config.discord.token) {
    console.error('❌ DISCORD_TOKEN is not set in .env file');
    return false;
  }
  if (!config.email.user || !config.email.password) {
    console.error('❌ Email credentials are not set in .env file');
    return false;
  }
  return true;
}
