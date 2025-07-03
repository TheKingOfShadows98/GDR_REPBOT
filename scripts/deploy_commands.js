import { REST, Routes } from "discord.js";

import dotenv from 'dotenv';
dotenv.config()
const commands = [];

import { scan_commands } from '../utilities.js';


// Grab all the command folders from the commands directory you created earlier
async function command_handler(data, execute){
	try
	{
		if (data && execute) {
			commands.push(data.toJSON());
		}
		else
		{
			console.log(`[WARNING] The command is missing a required "data" or "execute" property.`);
		}
	}
	catch(error)
	{
		console.log(error);
	}
}

await scan_commands(command_handler);


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands},
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		
		console.error(error);
	}
})();