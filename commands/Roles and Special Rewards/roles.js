import {SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { get_roles } from '../../Database/roles_queries.js';
import { get_role } from '../../index.js';

const data = new SlashCommandBuilder()
		.setName('roles')
		.setDescription('visualiza todos los roles que tienen recompenzas')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		;
const execute = async(interaction) => {
	await interaction.deferReply();
	const server_id = interaction.guild.id;

	const query = await get_roles(server_id);
	
	let message = 'ROLES WITH CREDIT REWARD:\n'

	for (let index = 0; index < query.message.length; index++) {
		const element = query.message[index];
		const roleData = await get_role(server_id, element.role_id);
		message += `@${roleData.name} with ${element.credits}`
		console.log(message);
	}
	await interaction.editReply(message);
};
		
export { data , execute};