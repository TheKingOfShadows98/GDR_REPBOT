import { get_settings } from "./Database/server_settings_queries.js";
import { get_roles } from "./Database/roles_queries.js";
import { get_all_credits, get_credits } from "./Database/credits_queries.js";
import { get_user} from "./index.js";


export async function getLeaderBoard(server_id, members){
	const settings = await get_settings(server_id);

	const roles_response = await get_roles(server_id);
	const server_roles = roles_response.message;

	const users_aditional_credits = await get_all_credits(server_id);

	const leaderboard = [];
	for (let user_index = 0; user_index < members.length; user_index++) {
		const member = members[user_index];
		let total= 0;
		if(settings != undefined){
			total = settings.initial_credits;
		}
		const aditional_credits = users_aditional_credits.find( x => x.user_id === member.user.id);
		if(aditional_credits != undefined){
			total += aditional_credits.aditional_credits;
		}
		
		const member_roles = member.roles.cache.map( x => x.id);
		const matched_roles = fast_match_roles(server_roles, member_roles);
		
		matched_roles.forEach(role => {
			total += role.credits;
		});
		
		leaderboard.push({
			user_id: member.user.id,
			user_name: member.user.username,
			credits: total
		})

		
	}
	leaderboard.sort((a, b) => b.credits - a.credits)
	return leaderboard;
}

export async function fast_total(server_id, users_id){
	const settings = await get_settings(server_id);
	
	const roles_response = await get_roles(server_id);
	const server_roles = roles_response.message;
	
	const users_credits = [];

	for (let user_index = 0; user_index < users_id.length; user_index++) {
		const user_id = users_id[user_index];
		console.log(`UserID: ${user_id}`);
		//const user_credits_response = await get_credits(server_id, user_id); 
		
		console.log(`UserCredit Response: ${await get_credits(server_id, user_id)}`);
		const member = await get_user(server_id, user_id);
		const user_roles = member.roles.cache;
		console.log(`UserRoles: ${user_roles[0]}`);
		const matched_roles = fast_match_roles(server_roles, user_roles);
		let total = settings.initial_credits;
		
		
		if(user_credits_response > 0)
			total += user_credits_response.aditional_credits;
		for (let i = 0; i < matched_roles.length; i++) {
			const role = matched_roles[i];
			total += role.credits;
		}
		//console.log(total);
		users_credits.push({user_name:member.user.username, user_id: user_id, credits: total});
	}
	return users_credits;
}

function fast_match_roles(server_roles, user_roles_id){
	const roles = [];
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