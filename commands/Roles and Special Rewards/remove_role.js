import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('remove_role')
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		await interaction.reply(`REMOVE_ROLE WORK IN PROGRESS`);
	};

export { data , execute};