import {SlashCommandBuilder} from 'discord.js';
import { get_credits } from '../../Database/credits_queries.js';

const data = new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Usalo para ver tus creditos actuales');
		
const execute = async(interaction) => {
	
		const server_id = interaction.guild.id;
		const user_id = interaction.user.id;
		// PETICION A LA BASE DE DATOS DE LOS CREDITOS.
		const res = await get_credits(server_id,user_id);
		// COMPROBACION SI NO ES NULA
		if(res == undefined){
			await interaction.reply(`NO HAVE CREDITS`);
			return;
		}
		console.log("user tag: " + interaction.user.tag);
		await interaction.reply(`YOUR ADDITIONAL CREDITS: ${res.additional_credits}`);
	};

export { data , execute};