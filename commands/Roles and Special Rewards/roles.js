import {SlashCommandBuilder} from 'discord.js';
import { get_roles } from '../../Database/roles_queries.js';

const data = new SlashCommandBuilder()
		.setName('roles')
		.setDescription('visualiza todos los roles que tienen recompenzas');
const execute = async(interaction) => {
	await interaction.deferReply();
	const server_id = interaction.guild.id;

	const query = await get_roles(server_id);
	console.log(query);


	await interaction.editReply(`ADD_ROLE WORK IN PROGRESS`);
};
		
export { data , execute};