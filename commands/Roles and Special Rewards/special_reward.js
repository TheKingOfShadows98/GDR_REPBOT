import {SlashCommandBuilder} from 'discord.js';

const command_name = 'special_reward';

const data = new SlashCommandBuilder()
		.setName(command_name)
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		await interaction.reply(`${command_name} WORK IN PROGRESS`);
	};

export { data , execute};