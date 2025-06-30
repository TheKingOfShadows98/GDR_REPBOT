const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_role')
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		await interaction.reply(`ADD_ROLE WORK IN PROGRESS`);
	},
};