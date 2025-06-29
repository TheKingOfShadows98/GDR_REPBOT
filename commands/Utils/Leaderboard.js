const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('its a leaderboard c:'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
        console.log("Command Sended in " + interaction.guild.id);
		console.log("Command sended by " + interaction.user.id);
		await interaction.reply(`NOT IMPLEMENTED YET`);
	},
};