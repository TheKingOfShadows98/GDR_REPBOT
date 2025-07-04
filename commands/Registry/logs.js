import {SlashCommandBuilder} from 'discord.js';
import { get_logs } from "../../Database/logs_queries.js";

const data = new SlashCommandBuilder()
		.setName('logs')
		.setDescription('show last 10 actions');
		
const execute = async(interaction) => {
		const server_id = interaction.guild.id;

		const logs = await get_logs(server_id);

		const message = "";
		logs.forEach(log => {
			message += `${log} \n`;
		});

		await interaction.reply(message);
	};

export { data , execute};