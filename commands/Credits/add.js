import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
	.setName('add')
	.setDescription('Dale gracias a alguien por ayudarte')
	.addUserOption(option => option.setName('user').setDescription('Usuario a agregar').setRequired(true));

const execute = async(interaction) => {
	
	await interaction.reply(`ADD WORK IN PROGRESS`);
};


export { data , execute};