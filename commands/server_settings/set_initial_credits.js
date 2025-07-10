import {SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { set_settings} from '../../Database/server_settings_queries.js';
import { add_newLog } from '../../Database/logs_queries.js';

const data = new SlashCommandBuilder()
		.setName('set_initial_credits')
		.setDescription('Dale gracias a alguien por ayudarte')
		.addIntegerOption(option =>
			option
			.setName('credits')
			.setDescription('The number of initial credits for users')
			.setRequired(true)
			.setMinValue(0)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		;
const execute = async(interaction) => {
		// build Settings
		const settings = {}
		console.log(`[${interaction.guild.id}]: [${interaction.user.id}] run Set Initial Credits`);
		settings.initial_credits = interaction.options.getInteger('credits');
		await set_settings(interaction.guild.id, interaction.user.id, settings);
		interaction.reply(`SET INITIAL CREDITS TO ${settings.initial_credits}`);
		await add_newLog(interaction.guild.id, `SET INITIAL CREDITS TO ${settings.initial_credits}`, interaction.user.id, 'none', 'none');
		
	};

export { data , execute};