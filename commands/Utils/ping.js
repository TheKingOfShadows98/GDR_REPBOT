import {SlashCommandBuilder} from 'discord.js';
import { createEmbed } from '../../utilities.js';

const data =  new SlashCommandBuilder()
		.setName('ping')
		.setDescription('PingPong');
const execute = async(interaction) => {
		
		const embed = createEmbed({
			title:"PONG",
			description:"",
			fields:[
			],
			color: '#00ff00'
		});
		interaction.reply({embeds: [embed] } );
	};
	

export { data , execute};