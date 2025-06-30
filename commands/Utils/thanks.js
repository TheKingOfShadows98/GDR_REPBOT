const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thanks')
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`THANKS WORK IN PROGRESS`);
	},
};