import {SlashCommandBuilder} from 'discord.js';
import { add_credits } from '../../Database/credits_queries.js';
import { add_newLog } from '../../Database/logs_queries.js';

const data = new SlashCommandBuilder()
	.setName('add')
	.setDescription('Dale gracias a alguien por ayudarte')
	.addUserOption(option => option.setName('user').setDescription('target user').setRequired(true))
	.addIntegerOption(option => option.setName('amount').setDescription('amount of credits').setMinValue(0).setRequired(true))
	;
const execute = async(interaction) => {
	await interaction.deferReply();
	const credits = interaction.options.getInteger('amount');
	const user_target = interaction.options.getUser('user');
	if(interaction.guild == null){
		interaction.editReply(`this bot only work in servers`);
	}
	const server_id = interaction.guild.id;
	const author_id = interaction.user.id;
	await add_credits(server_id, user_target.id, credits);
	await interaction.editReply(`ADDED ${credits} to ${user_target.username}`);
	await add_newLog(server_id , `give ${credits} credits to `, author_id ,user_target.id, 'USER');
};


export { data , execute};  