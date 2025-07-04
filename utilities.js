import fs from 'node:fs';
import path from 'node:path';

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