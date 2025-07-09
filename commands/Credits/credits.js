import { SlashCommandBuilder} from 'discord.js';
import { get_credits } from '../../Database/credits_queries.js';
import { get_user } from '../../index.js';
import { get_settings } from '../../Database/server_settings_queries.js';
import { get_roles } from '../../Database/roles_queries.js';
import { createEmbed } from '../../utilities.js';

const data = new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Usalo para ver tus creditos actuales');
		
const execute = async(interaction) => {
		await interaction.deferReply();
		const server_id = interaction.guild.id;
		const user_id = interaction.user.id;
		// PETICION A LA BASE DE DATOS DE LOS CREDITOS.
		const res = await get_credits(server_id,user_id);
		const member = await get_user(server_id, user_id);
		// GET SETTINGS FROM SEVER_SETTINGS
		const settigns = await get_settings(server_id);
		const rewarded_roles = (await get_roles(server_id)).message;
		const user_roles = member.roles.cache;
		
		let roles = match_roles(rewarded_roles, user_roles);

		let total = settigns.initial_credits;

		let fields =[];
		
		fields.push({
			name: '🎫 Inital credits 🎫',
			value:`+${settigns.initial_credits}`,
			inline: false
		});
		if(res.length > 0){
			fields.push({
			name: '🧧 aditional credits 🧧',
			value:`+${res[0].aditional_credits}`,
			inline: false
			});
			total += res[0].aditional_credits;
		}

		if(roles.length > 0){
			for (let i = 0; i < roles.length; i++) {
				const role = roles[i];
				fields.push({
				name: `📜 ${role.name} Reward 📜`,
				value:`+${role.credits}`,
				inline: false
				});
				total += role.credits;
			}
		}

		fields.push({
		name: '🎉 total 🎉',
		value:`${total}`,
		inline: false
		});
		const embed = createEmbed({
			title: `${interaction.user.username} credits`,
			description: `caculation of your credits`,
			fields: fields,
			color: '#FFDA41'
		})
		
		await interaction.editReply({embeds:[embed]});
	};


function match_roles(server_roles, user_roles){
	const roles_actives = [];
	user_roles.forEach(role => {
			const obj = {
				role_id: role.id,
				name: role.name
			}
		roles_actives.push(obj);
		});
	let roles = [];
	for (let i = 0; i < roles_actives.length; i++) {
		const user_role = roles_actives[i];
		for (let h = 0; h < server_roles.length; h++) {
			const reward_role = server_roles[h];
			if(user_role.role_id == reward_role.role_id){
				let match = {
					role_id: user_role.role_id,
					name: user_role.name,
					credits: reward_role.credits
				}
				roles.push(match);
			}
		}
	}
	return roles;
}

export { data , execute};