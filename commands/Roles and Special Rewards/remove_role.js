const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_role')
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		await interaction.reply(`REMOVE_ROLE WORK IN PROGRESS`);
	},
};