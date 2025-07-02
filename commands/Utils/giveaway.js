import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`GIVEAWAY WORK IN PROGRESS`);
	};

export { data , execute};