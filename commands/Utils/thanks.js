import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('thanks')
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`THANKS WORK IN PROGRESS`);
	};

export { data , execute};