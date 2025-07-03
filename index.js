import { setupClient } from './discord_conection.js';



// START BOT
 const client = setupClient();
 client.login(process.env.DISCORD_TOKEN);