import {SlashCommandBuilder} from 'discord.js';
import { getLeaderBoard } from '../../creditsUtils.js';
import { goldenColor } from '../../colors.js'; 
import { createEmbed } from '../../utilities.js';

const data =  new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('its a leaderboard c:');
    
const execute = async(interaction) => {
    await interaction.deferReply();

    const guild = interaction.guild;
	// OBTIENE TODOS LOS USUARIOS DEL SERVIDOR
	await guild.members.fetch();
	const members = guild.members.cache;
	const server_id = guild.id;
	// FILTRAR LOS USUARIOS BOT
	const nonBotMembers = members.filter(member => !member.user.bot);

	// CONVERTIR LOS USUARIOS NO BOTS A UN ARRAY DE SUS ID
	const users = [];
	nonBotMembers.forEach(element => { 
		const user = element.user;
		users.push(element);
	});
    const leaderboard = (await getLeaderBoard(interaction.guild.id, users)).slice(0,10);

		
      //EMBED
      const title = ":trophy: LEADEBOARD :trophy:";
      const description = "lorem ipsu";
      const fields = [];
		const number = {
		name: "position",
		value:  "1 \n2 \n3 \n4 \n5 \n6 \n7 \n8 \n9 \n 10\n",
		inline: true
	  }
	  fields.push(number);
	  const namesField = {
		name: "names",
		value: leaderboard.reduce((r, x) => r += `${x.user_name}\n`, ""),
		inline: true
	  }
	  fields.push(namesField);
	  const creditsField = {
		name: "credits",
		value: leaderboard.reduce((r, x) => r += `${x.credits}\n`, ""),
		inline: true
	  }
	  fields.push(creditsField);
      const color = goldenColor;
	  const embed = createEmbed({title: title, description: description, fields: fields, color: color});

		await interaction.editReply({embeds:[embed]});

	};

export { data , execute};