import {SlashCommandBuilder, userMention, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../../utilities.js';
import { getLeaderBoard } from '../../creditsUtils.js';
import { goldenColor, rumaninaFlag} from '../../colors.js';

const data = new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Dale gracias a alguien por ayudarte')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		;
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
			users.push(element);
		});
		// LEADERBOARD DEL SERVIDOR
		const leaderboard = await getLeaderBoard(interaction.guild.id, users);

		// EMBEDINGS THINGS
			const title = `GIVEAWAY`;
			const description = `Running a Wheel`;
			const img = 'https://media.discordapp.net/attachments/655795230720655451/1363602612850790420/sleepycat.gif?ex=68716ae5&is=68701965&hm=5dbbedd656521942e38e1673dc2431ae27154d54448c060bf56b06bbcc60bd97&=';
			const winner_image = 'https://media.discordapp.net/attachments/1017790140887859305/1363582385626681536/winner.gif?ex=6871580e&is=6870068e&hm=6445df778935838958a261ca7d5ae9211a1d7a46db7b0c28fea47bbd30e10dee&';
			const color = goldenColor;
			
			
		try {
			const participants_field = {name: `Participants`, value: `${users.length}`, inline: false};
			
			
			const embed = createEmbed({title: title, description: description, fields: [participants_field], color: color})
			embed.setImage(img);
			interaction.editReply({embeds:[embed]});
			
			// TOTAL OF CREDITS
			const total = leaderboard.reduce((sum, item)=> { 
				return sum + item.credits;
			},0);
			const total_credits_field = {name: `Total entries`, value: `${total}`, inline: false};
			embed.addFields([total_credits_field]);

			interaction.editReply({embeds:[embed]});
			
			for (let index = 0; index < 30; index++) {
				const user_index = Math.floor(Math.random() * leaderboard.length);
				const value = index % 3;

				const r_user = leaderboard[user_index].user_name;
				const field = {name: "Possible Winner", value: r_user, inline: false};

				const r_embed = createEmbed({title: "Possible Winner", description: r_user, fields: [], color: rumaninaFlag[value]})
				interaction.editReply({embeds:[embed, r_embed]});
				await delay(2000);
			}
				

			let credit_selected = Math.floor(Math.random() * (total - 1) ) + 1; // SELECT RANDOM CREDIT REWARDED
			console.log(credit_selected);
			while( credit_selected > 0){
				const user_data = leaderboard.shift();
				credit_selected -= user_data.credits;
				if(credit_selected < 1){
					embed.setTitle('WINNER')
					embed.setDescription(`${userMention(user_data.user_id)}`);
					embed.setImage(winner_image);
					interaction.editReply({embeds:[embed]});
					break;

				}
			}

		} catch (error) {
			console.error(error);
		}
		
	};


const delay = ms => new Promise(res => setTimeout(res, ms));
export { data , execute};