import { Client, Collection, Events, IntentsBitField, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { setupClient } from './discord_conection.js';

const client = setupClient();
// LOGIN BOT
client.login(process.env.DISCORD_TOKEN);