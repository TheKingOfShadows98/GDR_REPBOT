import {SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { remove_role } from '../../Database/roles_queries.js';

const data = new SlashCommandBuilder()
		.setName('remove_role')
		.setDescription('Dale gracias a alguien por ayudarte')
		.addRoleOption(option =>
					option.setName('role')
					.setDescription('role to erase')
					.setRequired(true) // Or false if the option is not required
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		;
const execute = async(interaction) => {
		
		await interaction.deferReply();
		const server_id = interaction.guild.id;
		const amount = interaction.options.getInteger('reward');
		const author_id = interaction.user.id;
		const role = interaction.options.getRole('role');
		const response = await remove_role(server_id, role.id);
		console.log(response);
		if(response.confirm){
			interaction.editReply(response.message);
		}
		await add_newLog(server_id , `removed `, author_id ,role.id, 'ROLE');
	};

export { data , execute};