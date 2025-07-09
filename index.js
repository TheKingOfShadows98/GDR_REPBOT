import { setupClient } from './discord_conection.js';
import { validate_logs_Table } from './Database/logs_queries.js';
import { validate_servers_Table } from './Database/server_settings_queries.js';
import { validate_users_Table } from './Database/credits_queries.js';
import { validate_role_Table } from './Database/roles_queries.js';

// VALIDATE ANY TABLE IF EXIST


async function validate_Database(){
    await validate_servers_Table();
    await validate_logs_Table();
    await validate_users_Table();
    await validate_role_Table();
}
(await validate_Database())
// START BOT
 const client = setupClient();
 client.login(process.env.DISCORD_TOKEN);


 export async function get_user(guild_id, user_id){
    const guild = await client.guilds.fetch(guild_id);
		const member = await guild.members.fetch(user_id);
    return member;
 }

 export async function get_role(guild_id, role_id){
    const guild = await client.guilds.fetch(guild_id);
    const role = await guild.roles.fetch(role_id);
    return role;
 }