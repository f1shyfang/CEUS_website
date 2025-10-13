import { Client, GatewayIntentBits, REST, Routes, CommandInteraction } from 'discord.js';
import { config, validateConfig } from './config';
import { EmailService } from './emailService';
import { CodeManager } from './codeManager';
import { commands } from './commands';

// Validate configuration
if (!validateConfig()) {
  console.error('❌ Configuration validation failed. Please check your .env file.');
  process.exit(1);
}

// Initialize services
const emailService = new EmailService();
const codeManager = new CodeManager();

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Register slash commands
async function registerCommands() {
  try {
    const rest = new REST({ version: '10' }).setToken(config.discord.token);
    
    console.log('🔄 Registering slash commands...');
    
    await rest.put(
      Routes.applicationCommands(config.discord.clientId),
      { body: commands.map(cmd => cmd.toJSON()) }
    );
    
    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

// Handle interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, user } = interaction as CommandInteraction;

  try {
    if (commandName === 'verify') {
      const email = interaction.options.get('email')?.value as string;

      // Validate .edu email
      if (!emailService.isValidEduEmail(email)) {
        await interaction.reply({
          content: '❌ Please provide a valid .edu email address.',
          ephemeral: true,
        });
        return;
      }

      // Check rate limit
      const rateLimitCheck = codeManager.canRequestCode(user.id);
      if (!rateLimitCheck.allowed) {
        await interaction.reply({
          content: `⏱️ ${rateLimitCheck.message}`,
          ephemeral: true,
        });
        return;
      }

      // Generate and send code
      const code = codeManager.createVerificationCode(user.id, email);
      const emailSent = await emailService.sendVerificationCode(email, code);

      if (emailSent) {
        codeManager.updateLastRequestTime(user.id, email);
        await interaction.reply({
          content: `✅ Verification code sent to **${email}**!\n\nUse \`/confirm code:YOUR_CODE\` to verify.\n\nThe code will expire in ${config.codeExpirationMinutes} minutes.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: '❌ Failed to send email. Please try again later or contact an administrator.',
          ephemeral: true,
        });
      }
    } else if (commandName === 'confirm') {
      const code = interaction.options.get('code')?.value as string;

      // Validate code format
      if (!/^\d{6}$/.test(code)) {
        await interaction.reply({
          content: '❌ Please provide a valid 6-digit code.',
          ephemeral: true,
        });
        return;
      }

      // Verify code
      const result = codeManager.verifyCode(user.id, code);

      if (result.success) {
        const email = codeManager.getUserEmail(user.id);
        await interaction.reply({
          content: `✅ ${result.message}\n\nYour email **${email}** has been verified!`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `❌ ${result.message}`,
          ephemeral: true,
        });
      }
    } else if (commandName === 'status') {
      const isVerified = codeManager.isUserVerified(user.id);
      const email = codeManager.getUserEmail(user.id);

      if (isVerified && email) {
        await interaction.reply({
          content: `✅ **Verification Status:** Verified\n📧 **Email:** ${email}`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: '❌ **Verification Status:** Not verified\n\nUse `/verify email:your@email.edu` to get started!',
          ephemeral: true,
        });
      }
    }
  } catch (error) {
    console.error('Error handling command:', error);
    await interaction.reply({
      content: '❌ An error occurred while processing your command.',
      ephemeral: true,
    });
  }
});

// Bot ready event
client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user?.tag}!`);
  console.log(`📧 Email service configured with ${config.email.host}`);
  
  // Cleanup expired codes every 5 minutes
  setInterval(() => {
    codeManager.cleanupExpiredCodes();
  }, 5 * 60 * 1000);
});

// Login and register commands
client.login(config.discord.token).then(() => {
  registerCommands();
});
