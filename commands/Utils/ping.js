import {SlashCommandBuilder} from 'discord.js';
import { get_user } from '../../index.js';
import { createEmbed } from '../../utilities.js';

const data =  new SlashCommandBuilder()
		.setName('ping')
		.setDescription('PingPong');
const execute = async(interaction) => {
		
		const embed = createEmbed({
			title:"PING PONG",
			description:"ESTE ES UN PING PONG",
			fields:[
				{ name: 'Miembros', value: `${interaction.guild.memberCount}`},
				{ name: 'Creado el', value: `${interaction.guild.createdAt.toDateString()}`},
			],
			color: '#00ff00'
		});
		interaction.reply({embeds: [embed] } );
	};
	

export { data , execute};