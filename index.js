import { setupClient } from './discord_conection.js';
import { validate_logs_Table } from './Database/logs_queries.js';
import { validate_servers_Table } from './Database/server_settings_queries.js';
import { validate_users_Table } from './Database/credits_queries.js';
import { validate_role_Table } from './Database/roles_queries.js';
// VALIDATE ANY TABLE IF EXIST

(await validate_servers_Table());
(await validate_logs_Table());
(await validate_users_Table());
(await validate_role_Table());

// START BOT
 const client = setupClient();
 client.login(process.env.DISCORD_TOKEN);