import re
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config

class EmailService:
    def __init__(self):
        self.host = Config.EMAIL_HOST
        self.port = Config.EMAIL_PORT
        self.user = Config.EMAIL_USER
        self.password = Config.EMAIL_PASSWORD
    
    async def send_verification_code(self, email: str, code: str) -> bool:
        """Send a verification code to the specified email."""
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['Subject'] = 'Your Discord Verification Code'
            message['From'] = f'"Discord 2FA Bot" <{self.user}>'
            message['To'] = email
            
            # Plain text version
            text = f"""Your verification code is: {code}

This code will expire in {Config.CODE_EXPIRATION_MINUTES} minutes.

If you didn't request this code, please ignore this email."""
            
            # HTML version
            html = f"""
            <html>
              <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Discord Verification Code</h2>
                <p>Your verification code is:</p>
                <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                  {code}
                </div>
                <p>This code will expire in <strong>{Config.CODE_EXPIRATION_MINUTES} minutes</strong>.</p>
                <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
              </body>
            </html>
            """
            
            # Attach both versions
            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')
            message.attach(part1)
            message.attach(part2)
            
            # Send email
            await aiosmtplib.send(
                message,
                hostname=self.host,
                port=self.port,
                username=self.user,
                password=self.password,
                start_tls=True,
            )
            
            return True
        except Exception as e:
            print(f'Error sending email: {e}')
            return False
    
    @staticmethod
    def is_valid_edu_email(email: str) -> bool:
        """Check if the email is a valid .edu email address."""
        edu_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$'
        return bool(re.match(edu_regex, email, re.IGNORECASE))
