import nodemailer from 'nodemailer';
import { config } from './config';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"Discord 2FA Bot" <${config.email.user}>`,
        to: email,
        subject: 'Your Discord Verification Code',
        text: `Your verification code is: ${code}\n\nThis code will expire in ${config.codeExpirationMinutes} minutes.\n\nIf you didn't request this code, please ignore this email.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Discord Verification Code</h2>
            <p>Your verification code is:</p>
            <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${code}
            </div>
            <p>This code will expire in <strong>${config.codeExpirationMinutes} minutes</strong>.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  isValidEduEmail(email: string): boolean {
    const eduRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/i;
    return eduRegex.test(email);
  }
}
