import {SlashCommandBuilder} from 'discord.js';

const data =  new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('its a leaderboard c:');
    
const execute = async(interaction) => {
		console.log('Executing Leaderboard');
		await interaction.reply(`leaderboard NOT IMPLEMENTED YET`);
	// Obtener la lista de miembros del servidor
    const guild = interaction.guild;
    try {
      // Asegurarse de que la lista de miembros esté cargada
      await guild.members.fetch(); // Esto carga todos los miembros del servidor
      const members = guild.members.cache;
		console.log(memberList);
      // Crear una lista de nombres de usuario (o IDs, según prefieras)
      const memberList = members.map(member => {
        const username = member.user.tag; // Formato: Nombre#Discriminador
        const userId = member.user.id;
        return `${username} (ID: ${userId})`;
      });
	  console.log(memberList);
    } catch (error) {
      console.error('Error al obtener miembros:', error);
    }
		
		await interaction.reply(`leaderboard NOT IMPLEMENTED YET`);
	};

export { data , execute};