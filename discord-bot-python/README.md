# Discord 2FA Bot - Python

A Discord bot that sends verification codes to .edu email addresses for user verification.

## Features

- ✅ Send 6-digit verification codes to .edu emails
- ✅ Email validation (must be .edu domain)
- ✅ Code expiration (configurable, default 10 minutes)
- ✅ Rate limiting (configurable, default 5 minutes between requests)
- ✅ Slash commands for easy interaction
- ✅ Ephemeral messages (only visible to the user)
- ✅ In-memory storage (can be upgraded to database)

## Prerequisites

- Python 3.8+
- Discord Bot Token
- Email account with SMTP access (Gmail recommended)

## Setup

### 1. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to "Bot" section and click "Add Bot"
4. Copy the bot token (you'll need this for `.env`)
5. Enable these Privileged Gateway Intents (if needed):
   - Server Members Intent (optional)
6. Go to "OAuth2" → "URL Generator"
   - Select scopes: `bot`, `applications.commands`
   - Select bot permissions: `Send Messages`, `Use Slash Commands`
   - Copy the generated URL and use it to invite the bot to your server

### 2. Email Setup (Gmail Example)

1. Enable 2-Step Verification on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Copy the 16-character password (you'll need this for `.env`)

### 3. Install Dependencies

```bash
cd discord-bot-python
pip install -r requirements.txt
```

Or using a virtual environment (recommended):

```bash
cd discord-bot-python
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
DISCORD_TOKEN=your_discord_bot_token_here

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password

CODE_EXPIRATION_MINUTES=10
RATE_LIMIT_MINUTES=5
```

### 5. Run the Bot

```bash
python bot.py
```

## Commands

- `/verify email:your@email.edu` - Request a verification code
- `/confirm code:123456` - Verify your email with the code
- `/status` - Check your verification status

## Project Structure

```
discord-bot-python/
├── bot.py              # Main bot file
├── config.py           # Configuration management
├── email_service.py    # Email sending logic
├── code_manager.py     # Code generation and verification
├── requirements.txt    # Python dependencies
├── .env.example
└── README.md
```

## Upgrading to Database

The current implementation uses in-memory storage. For production, consider upgrading to:

- **MongoDB**: Using `pymongo`
- **PostgreSQL**: Using `psycopg2` or `asyncpg`
- **SQLite**: Using built-in `sqlite3` module
- **Redis**: Using `redis-py` or `aioredis`

Example with SQLite:

```python
import sqlite3

# Create database
conn = sqlite3.connect('bot_data.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        discord_id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        verified BOOLEAN DEFAULT 0,
        last_request_time TIMESTAMP
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS verification_codes (
        user_id INTEGER PRIMARY KEY,
        code TEXT NOT NULL,
        email TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (discord_id)
    )
''')

conn.commit()
```

## Security Notes

- Never commit your `.env` file
- Use app-specific passwords for email
- Implement additional rate limiting for production
- Consider adding CAPTCHA for public bots
- Store sensitive data in environment variables
- Use a proper database for production

## Troubleshooting

**Bot not responding:**
- Check if bot token is correct
- Ensure bot has proper permissions in your server
- Verify slash commands are synced (wait a few minutes after starting)

**Email not sending:**
- Verify email credentials are correct
- Check if 2-Step Verification is enabled (for Gmail)
- Ensure app password is used (not regular password)
- Check firewall/network settings for SMTP port 587

**Commands not showing:**
- Wait 1-5 minutes for Discord to sync commands
- Try kicking and re-inviting the bot
- Restart the bot

**Import errors:**
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check Python version: `python --version` (should be 3.8+)

## License

MIT
