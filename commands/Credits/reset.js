const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`RESET WORK IN PROGRESS`);
	},
};