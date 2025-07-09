import { get_settings } from "./Database/server_settings_queries.js";
import { get_roles } from "./Database/roles_queries.js";
import { get_credits } from "./Database/credits_queries";


async function fast_total(server_id, users_id){
	const settings = await get_settings(server_id);
	const server_roles = await get_roles(server_id);

	const user_credits = [];

	for (let user_index = 0; user_index < users_id.length; user_index++) {
		const user_id = users_id[user_index];
		const user_credits = await get_credits(server_id, user_id); 
		const member = await get_user(server_id, user_id);
		const user_roles = member.roles.cache.keys;
		const matched_roles = fast_match_roles(server_roles, user_roles);
		let total = settings.initial_credits;
		total += user_credits.aditional_credits;
		for (let i = 0; i < matched_roles.length; i++) {
			const role = matched_roles[i];
			total += role.credits;
		}
		user_credits.push({user_id: user_id, credits: total});
	}
}
function fast_match_roles(server_roles, user_roles_id){
	
	for (let i = 0; i < user_roles_id.length; i++) {
		const user_role = user_roles_id[i];
		for (let h = 0; h < server_roles.length; h++) {
			const reward_role = server_roles[h];
			if(user_role == reward_role.role_id){
				let match = {
					role_id: reward_role.role_id,
					credits: reward_role.credits
				}
				roles.push(match);
			}
		}
	}
	return roles;
}

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