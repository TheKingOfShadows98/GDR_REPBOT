const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`GIVEAWAY WORK IN PROGRESS`);
	},
};