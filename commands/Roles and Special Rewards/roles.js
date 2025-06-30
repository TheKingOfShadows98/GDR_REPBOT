const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('visualiza todos los roles que tienen recompenzas'),
	async execute(interaction) {
		
		await interaction.reply(`ROLES WORK IN PROGRESS`);
	},
};