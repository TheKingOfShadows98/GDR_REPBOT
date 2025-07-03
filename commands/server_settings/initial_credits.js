import {SlashCommandBuilder} from 'discord.js';
import { get_settings} from '../../Database/server_settings_queries.js';
const data = new SlashCommandBuilder()
        .setName('initial_credits')
        .setDescription('Dale gracias a alguien por ayudarte')
        ;
const execute = async(interaction) => {
        // build Settings
        const settings =  await get_settings(interaction.guild.id);
        // indicar a discord que la respuesta va a tomar mas tiempo.
        //await interaction.deferReply({ ephemeral: true });
        await interaction.reply(`INITIAL CREDITS: ${settings.initial_credits}`);
    };

export { data , execute};