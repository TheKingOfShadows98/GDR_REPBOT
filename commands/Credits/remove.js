import {SlashCommandBuilder} from 'discord.js';

const data =  new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Dale gracias a alguien por ayudarte');
const execute = async(interaction) => {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`REMOVE WORK IN PROGRESS`);
	};

export { data , execute};