const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_initial_credits')
		.setDescription('Dale gracias a alguien por ayudarte'),
	async execute(interaction) {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`SET INITIAL CREDITS WORK IN PROGRESS`);
	},
};