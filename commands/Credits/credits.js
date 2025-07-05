import {SlashCommandBuilder} from 'discord.js';
import { get_credits } from '../../Database/credits_queries.js';

const data = new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Usalo para ver tus creditos actuales');
		
const execute = async(interaction) => {
		await interaction.deferReply();
		const server_id = interaction.guild.id;
		const user_id = interaction.user.id;
		// PETICION A LA BASE DE DATOS DE LOS CREDITOS.
		const res = await get_credits(server_id,user_id);
			
		// COMPROBACION SI NO ES NULA
		if(res > 0){
			await interaction.editReply(`NO HAVE CREDITS`);
			return;
		}
		console.log(res[0].aditional_credits);
		await interaction.editReply(`YOUR ADDITIONAL CREDITS: ${res[0].aditional_credits}`);
	};

export { data , execute};