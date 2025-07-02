import {SlashCommandBuilder} from 'discord.js';

const data =  new SlashCommandBuilder()
		.setName('ping')
		.setDescription('PingPong');
const execute = async(interaction) => {
		let message = `Tu perfil:${interaction.user.id} , in ${interaction.guild.id}`;
		// Responder con un mensaje efímero
		await interaction.reply({
		content: message,
		ephemeral: true, // Esto hace que el mensaje sea solo visible para el usuario
		});
        console.log("executed command");
	};


export { data , execute};