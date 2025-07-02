import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('add_role')
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		await interaction.reply(`ADD_ROLE WORK IN PROGRESS`);
	};

export { data , execute};