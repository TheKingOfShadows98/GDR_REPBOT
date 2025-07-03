import {SlashCommandBuilder} from 'discord.js';
import { get_settings ,set_settings} from '../../Database/server_settings_queries.js';
const data = new SlashCommandBuilder()
		.setName('set_initial_credits')
		.setDescription('Dale gracias a alguien por ayudarte')
		.addIntegerOption(option =>
			option
			.setName('credits')
			.setDescription('The number of initial credits for users')
			.setRequired(true)
			.setMinValue(0)
		);
const execute = async(interaction) => {
		// build Settings
		const settings = {}
		settings.initial_credits = interaction.options.getInteger('credits');
		
		await set_settings(interaction.guild.id , settings)
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`SET INITIAL CREDITS TO ${settings.initial_credits}`);
	};

export { data , execute};