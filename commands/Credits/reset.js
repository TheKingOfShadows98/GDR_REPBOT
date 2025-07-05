import {SlashCommandBuilder} from 'discord.js';
import { add_newLog } from '../../Database/logs_queries.js';
import { reset_credits } from '../../Database/credits_queries.js';

const data = new SlashCommandBuilder()
		.setName('reset')
		.setDescription('set a user zero additional credits')
		.addUserOption(option => option.setName('user').setDescription('target user').setRequired(true))
const execute = async(interaction) => {
		await interaction.deferReply();
		const user_target = interaction.options.getUser('user');
		const server_id = interaction.guild.id;
		const author_id = interaction.user.id;
		// REMOVE CREDITS
		await reset_credits(server_id, user_target.id);
		await interaction.editReply(`RESETTED CREDITS OF ${user_target.username}`);
		// SEND LOG
		await add_newLog(server_id , interaction.user.id , `${author_id} SET TO ZERO ADDITIONAL CREDITS TO ${user_target.id}`);
	};

export { data , execute};