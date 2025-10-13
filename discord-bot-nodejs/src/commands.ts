import { SlashCommandBuilder } from 'discord.js';

export const commands = [
  new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Send a verification code to your .edu email')
    .addStringOption(option =>
      option
        .setName('email')
        .setDescription('Your .edu email address')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('confirm')
    .setDescription('Confirm your email with the verification code')
    .addStringOption(option =>
      option
        .setName('code')
        .setDescription('The 6-digit verification code sent to your email')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check your verification status'),
];
