const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Usalo para ver tus creditos actuales')
		.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)),
	async execute(interaction) {
		
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`CREDITS WORK IN PROGRESS`);
	},
};