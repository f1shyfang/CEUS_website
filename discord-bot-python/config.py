import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Discord
    DISCORD_TOKEN = os.getenv('DISCORD_TOKEN', '')
    
    # Email
    EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
    EMAIL_PORT = int(os.getenv('EMAIL_PORT', '587'))
    EMAIL_USER = os.getenv('EMAIL_USER', '')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD', '')
    
    # Bot settings
    CODE_EXPIRATION_MINUTES = int(os.getenv('CODE_EXPIRATION_MINUTES', '10'))
    RATE_LIMIT_MINUTES = int(os.getenv('RATE_LIMIT_MINUTES', '5'))

def validate_config():
    """Validate that all required configuration is present."""
    if not Config.DISCORD_TOKEN:
        print('❌ DISCORD_TOKEN is not set in .env file')
        return False
    if not Config.EMAIL_USER or not Config.EMAIL_PASSWORD:
        print('❌ Email credentials are not set in .env file')
        return False
    return True
