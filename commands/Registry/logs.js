import {SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { get_logs } from "../../Database/logs_queries.js";
import { get_user } from '../../index.js';
import { get_role } from '../../index.js';


const data = new SlashCommandBuilder()
		.setName('logs')
		.setDescription('show last 10 actions')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
		
const execute = async(interaction) => {
	await interaction.deferReply();
		const server_id = interaction.guild.id;
		const logs = await get_logs(server_id);
		let message = "Last 10 actions: \n";

		for (let index = 0; index < logs.length; index++) {
			const log = logs[index];
			console.log(log);

			switch (log.target_type) {
				case 'USER':
					{
						const member = await get_user(interaction.guild.id, log.author_id);
						const target = await get_user(interaction.guild.id, log.target_id);
						message += `[${log.time_stamp}] > **${member.user.username}** ${log.action} ${target.user.username} \n \n`;
						break;
					}
				case 'ROLE':
					{
						const member = await get_user(interaction.guild.id, log.author_id);
						const target = await get_role(interaction.guild.id, log.target_id);
						message += `[${log.time_stamp}] > **${member.user.username}** ${log.action} ${target.name} \n \n`;
						break;
					}
				default:
					{
						const member = await get_user(interaction.guild.id, log.author_id);
						message += `[${log.time_stamp}] > **${member.user.username}** ${log.action} \n \n`;
						break;
					}
			}
			if(log.target_type === 'USER'){

			}
			
		}
		
		
		await interaction.editReply(message);
	};



export { data , execute};