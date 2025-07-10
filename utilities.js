import fs from 'node:fs';
import path from 'node:path';
import { EmbedBuilder } from 'discord.js';

const scan_commands = async (command_callback) => {
    const foldersPath = path.join('./commands');
    const commandFolders = fs.readdirSync(foldersPath);
    
    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const {data, execute} = await import(`./${filePath}`); // Usamos import dinámico
        command_callback(data, execute);

      }
    }
}

export function getCurrentTimestamp() {
  const now = new Date();
  // Format: YYYY-MM-DD HH:MM:SS
  return now.toISOString().replace('T', ' ').split('.')[0];
}

export {scan_commands};



/**
 * Crea un embed personalizado para respuestas del bot
 * @param {string} title - Título del embed
 * @param {string} description - Descripción del embed
 * @param {Array<{name: string, value: string, inline?: boolean}>} fields - Campos del embed
 * @param {string} color - Color en formato hexadecimal (opcional)
 * @returns {EmbedBuilder} - Embed listo para enviar
 */
export function createEmbed({ title, description, fields = [], color = '#0099ff' }) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp()
    .setFooter({ text: 'powered by @ZAndy' });

  if (fields.length > 0) {
    embed.addFields(fields);
  }

  return embed;
}