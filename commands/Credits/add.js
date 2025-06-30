const { SlashCommandBuilder } = require('discord.js');
const { Server, User } = require('../../models/index');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Dale gracias a alguien por ayudarte')
		.addUserOption(option => option.setName('user').setDescription('Usuario a agregar').setRequired(true))
		,
	async execute(interaction) {
		const guildId = interaction.guild.id;
    	const userId = interaction.options.getUser('user').id;


		
		await interaction.reply(`ADD WORK IN PROGRESS`);
	},
};