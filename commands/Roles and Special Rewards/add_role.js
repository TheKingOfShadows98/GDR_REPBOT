import {SlashCommandBuilder} from 'discord.js';
import { set_role_reward } from '../../Database/roles_queries.js';
import { add_newLog } from '../../Database/logs_queries.js';

const data = new SlashCommandBuilder()
		.setName('add_role')
		.setDescription('add a reward to a existent role')
		.addRoleOption(option =>
       		option.setName('role')
           	.setDescription('The role to affect')
           	.setRequired(true) // Or false if the option is not required
   		).addIntegerOption(option =>
			option.setName("reward")
			.setDescription("Amount of credits for this role")
			.setRequired(true)
		)
		;
const execute = async(interaction) => {
		await interaction.deferReply();
		const server_id = interaction.guild.id;
		const amount = interaction.options.getInteger('reward');
		const author_id = interaction.user.id;
		const role = interaction.options.getRole('role');
		const response = await set_role_reward(server_id, role.id, role.name, amount);
		console.log(response);
		if(response.confirm){
			interaction.editReply(response.message);
		}
		await add_newLog(server_id , `added ${amount} credits to `, author_id ,role.id, 'ROLE');
	};

export { data , execute};