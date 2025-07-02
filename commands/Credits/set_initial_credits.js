import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('set_initial_credits')
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`SET INITIAL CREDITS WORK IN PROGRESS`);
	};

export { data , execute};