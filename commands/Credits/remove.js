import {SlashCommandBuilder} from 'discord.js';
import { add_newLog } from '../../Database/logs_queries.js';
import { remove_credits } from '../../Database/credits_queries.js';

const data =  new SlashCommandBuilder()
		.setName('remove')
		.setDescription('REMOVE THE AMOUNT OF ADDITIONAL CREDITS TO A USER IF IS NEGATIVE, SET ZERO')
		.addUserOption(option => option.setName('user').setDescription('target user').setRequired(true))
		.addIntegerOption(option => option.setName('amount').setDescription('amount of credits').setMinValue(0).setRequired(true))
		;
const execute = async(interaction) => {

			const credits = interaction.options.getInteger('amount');
			const user_target = interaction.options.getUser('user');
			const server_id = interaction.guild.id;
			const author_id = interaction.user.id;
			// REMOVE CREDITS
			await remove_credits(server_id, user_target.id, credits);
			await interaction.reply(`REMOVED ${credits} TO ${user_target.username}`);
			// SEND LOG
			await add_newLog(server_id , interaction.user.id , `${author_id} REMOVE ${credits} credits TO ${user_target.id}`);
	};

export { data , execute};