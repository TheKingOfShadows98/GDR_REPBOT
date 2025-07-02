import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Usalo para ver tus creditos actuales');
		
const execute = async(interaction) => {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`CREDITS WORK IN PROGRESS`);
	};

export { data , execute};