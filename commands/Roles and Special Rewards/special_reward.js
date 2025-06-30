const { SlashCommandBuilder } = require('discord.js');

const command_name = 'special_reward';

module.exports = {
	data: new SlashCommandBuilder()
		.setName(command_name)
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		await interaction.reply(`${command_name} WORK IN PROGRESS`);
	},
};