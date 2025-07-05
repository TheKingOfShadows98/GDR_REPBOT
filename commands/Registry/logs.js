import {SlashCommandBuilder} from 'discord.js';
import { get_logs } from "../../Database/logs_queries.js";

const data = new SlashCommandBuilder()
		.setName('logs')
		.setDescription('show last 10 actions');
		
const execute = async(interaction) => {
	await interaction.deferReply();
		const server_id = interaction.guild.id;
		const logs = await get_logs(server_id);

		let message = "";
		logs.forEach(log => {
			message += `[${log.time_stamp}] > User [${log.author_id}] ${log.action} \n \n`;
		});
		
		await interaction.editReply(message);
	};

export { data , execute};