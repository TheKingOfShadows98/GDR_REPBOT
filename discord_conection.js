import { Client, Collection, Events, IntentsBitField, GatewayIntentBits, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { scan_commands } from './utilities.js';

dotenv.config();

const setupClient = () =>
{
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      GatewayIntentBits.Guilds, // Necesario para acceder a información del servidor
      GatewayIntentBits.GuildMembers, // Necesario para acceder a información de los miembros
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent
    ],
  });

  client.commands = new Collection();
  function command_handler(data, execute){
    if (data && execute) {
      client.commands.set(data.name, {data,execute});
    } else {
      console.log(`[WARNING] The command is missing a required "data" or "execute" property.`);
    }
  }

  

  scan_commands(command_handler);

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      }
    }
  });

  client.on('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
  });

  return client;
}


export {setupClient};