# Discord 2FA Bot - Node.js/TypeScript

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

- Node.js 18+ and npm
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
7. Copy your Application ID from the "General Information" page (this is your CLIENT_ID)

### 2. Email Setup (Gmail Example)

1. Enable 2-Step Verification on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Copy the 16-character password (you'll need this for `.env`)

### 3. Install Dependencies

```bash
cd discord-bot-nodejs
npm install
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_discord_client_id_here

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password

CODE_EXPIRATION_MINUTES=10
RATE_LIMIT_MINUTES=5
```

### 5. Run the Bot

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

## Commands

- `/verify email:your@email.edu` - Request a verification code
- `/confirm code:123456` - Verify your email with the code
- `/status` - Check your verification status

## Project Structure

```
discord-bot-nodejs/
├── src/
│   ├── index.ts          # Main bot file
│   ├── config.ts         # Configuration management
│   ├── commands.ts       # Slash command definitions
│   ├── emailService.ts   # Email sending logic
│   ├── codeManager.ts    # Code generation and verification
│   └── types.ts          # TypeScript type definitions
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Upgrading to Database

The current implementation uses in-memory storage. For production, consider upgrading to:

- **MongoDB**: For flexible document storage
- **PostgreSQL**: For relational data
- **Redis**: For fast in-memory caching with persistence

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
- Ensure CLIENT_ID is correct

## License

MIT
