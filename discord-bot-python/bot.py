import discord
from discord import app_commands
from discord.ext import tasks
import asyncio
from config import Config, validate_config
from email_service import EmailService
from code_manager import CodeManager

# Validate configuration
if not validate_config():
    print('❌ Configuration validation failed. Please check your .env file.')
    exit(1)

# Initialize services
email_service = EmailService()
code_manager = CodeManager()

# Create bot client
intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

@tree.command(name='verify', description='Send a verification code to your .edu email')
@app_commands.describe(email='Your .edu email address')
async def verify(interaction: discord.Interaction, email: str):
    """Send a verification code to the user's .edu email."""
    user_id = interaction.user.id
    
    # Validate .edu email
    if not email_service.is_valid_edu_email(email):
        await interaction.response.send_message(
            '❌ Please provide a valid .edu email address.',
            ephemeral=True
        )
        return
    
    # Check rate limit
    allowed, message = code_manager.can_request_code(user_id)
    if not allowed:
        await interaction.response.send_message(
            f'⏱️ {message}',
            ephemeral=True
        )
        return
    
    # Defer response as email sending might take time
    await interaction.response.defer(ephemeral=True)
    
    # Generate and send code
    code = code_manager.create_verification_code(user_id, email)
    email_sent = await email_service.send_verification_code(email, code)
    
    if email_sent:
        code_manager.update_last_request_time(user_id, email)
        await interaction.followup.send(
            f'✅ Verification code sent to **{email}**!\n\n'
            f'Use `/confirm code:YOUR_CODE` to verify.\n\n'
            f'The code will expire in {Config.CODE_EXPIRATION_MINUTES} minutes.',
            ephemeral=True
        )
    else:
        await interaction.followup.send(
            '❌ Failed to send email. Please try again later or contact an administrator.',
            ephemeral=True
        )

@tree.command(name='confirm', description='Confirm your email with the verification code')
@app_commands.describe(code='The 6-digit verification code sent to your email')
async def confirm(interaction: discord.Interaction, code: str):
    """Verify the user's email with the provided code."""
    user_id = interaction.user.id
    
    # Validate code format
    if not code.isdigit() or len(code) != 6:
        await interaction.response.send_message(
            '❌ Please provide a valid 6-digit code.',
            ephemeral=True
        )
        return
    
    # Verify code
    success, message = code_manager.verify_code(user_id, code)
    
    if success:
        email = code_manager.get_user_email(user_id)
        await interaction.response.send_message(
            f'✅ {message}\n\nYour email **{email}** has been verified!',
            ephemeral=True
        )
    else:
        await interaction.response.send_message(
            f'❌ {message}',
            ephemeral=True
        )

@tree.command(name='status', description='Check your verification status')
async def status(interaction: discord.Interaction):
    """Check the user's verification status."""
    user_id = interaction.user.id
    is_verified = code_manager.is_user_verified(user_id)
    email = code_manager.get_user_email(user_id)
    
    if is_verified and email:
        await interaction.response.send_message(
            f'✅ **Verification Status:** Verified\n📧 **Email:** {email}',
            ephemeral=True
        )
    else:
        await interaction.response.send_message(
            '❌ **Verification Status:** Not verified\n\n'
            'Use `/verify email:your@email.edu` to get started!',
            ephemeral=True
        )

@tasks.loop(minutes=5)
async def cleanup_task():
    """Periodically cleanup expired verification codes."""
    code_manager.cleanup_expired_codes()

@client.event
async def on_ready():
    """Called when the bot is ready."""
    print(f'✅ Bot is online as {client.user}!')
    print(f'📧 Email service configured with {Config.EMAIL_HOST}')
    
    # Sync commands with Discord
    await tree.sync()
    print('✅ Commands synced!')
    
    # Start cleanup task
    cleanup_task.start()

# Run the bot
if __name__ == '__main__':
    client.run(Config.DISCORD_TOKEN)
