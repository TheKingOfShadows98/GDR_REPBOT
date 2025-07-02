import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
		.setName('roles')
		.setDescription('visualiza todos los roles que tienen recompenzas');
const execute = async(interaction) => {
		
		await interaction.reply(`ROLES WORK IN PROGRESS`);
	};

export { data , execute};