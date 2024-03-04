const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
	let user = interaction.user;
	let timeout = 3600000;

	Schema2.findOne({
		Guild: interaction.guild.id,
		User: user.id
	}, async (err, dataTime) => {
		if (dataTime && dataTime.Work !== null && timeout - (Date.now() - dataTime.Work) > 0) {
			let time = (dataTime.Work / 1000 + timeout / 1000).toFixed(0);
			return client.errWait({
				time: time,
				type: 'editreply'
			}, interaction);
		} else {
			let amount = Math.floor(Math.random() * 230) + 20;
			let replies = [
       			`**${user.displayName}** work as a professional hacker. You manage to rake in ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a rare item on the black market for a hefty profit of ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a difficult challenge and earn a reward of ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** mine a large amount of valuable resources and sell them for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** create a successful online business and earn ${client.emotes.economy.coins}${amount} from sales`,
				`**${user.displayName}** win a tournament and earn ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** help a friend with their business and they give you ${client.emotes.economy.coins}${amount} as a thank you`,
				`**${user.displayName}** sell a custom-made item for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** find a valuable item and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a quest and earn ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** mine a rare ore and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** craft a valuable item and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** help a new player with their journey and they give you ${client.emotes.economy.coins}${amount} as a thank you`,
				`**${user.displayName}** find a hidden treasure chest and earn ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a stack of resources for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** craft a simple item and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** help a friend with their farm and they give you ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** find a valuable item in a dungeon and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** find a rare artifact and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a challenging puzzle and earn a reward of ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** participate in a scavenger hunt and find ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a stack of valuable gems for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a lottery and receive ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a hidden treasure map and find ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a rare pet to a collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a series of difficult quests and earn ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** craft a legendary weapon and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** help a friend with their construction project and they give you ${client.emotes.economy.coins}${amount} as a thank you`,
				`**${user.displayName}** find a valuable artifact in a dungeon and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a bet in a high-stakes casino game and earn ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a rare painting to a collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a hidden stash of gold coins and sell them for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a time-limited event and earn ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** broker a deal between two rival factions and receive ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a stack of enchanted books for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a race and receive ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** find a rare artifact in an ancient ruin and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a marathon and earn ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a stack of rare potions for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a bidding war and sell an item for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a hidden treasure chest in the depths of the ocean and earn ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a stack of valuable relics to a museum for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a difficult raid and receive ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a rare vehicle to a collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** find a hidden ancient scroll and sell it to a scholar for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a championship and earn ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** sell a stack of rare minerals for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a secret underground vault and find ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a complex heist and receive ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a rare artifact to a wealthy collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a challenging mission and earn a reward of ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** participate in a high-stakes poker game and win ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a stack of ancient manuscripts for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a treasure hunt and receive ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** discover a hidden cache of precious gemstones and sell them for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a rare vehicle to a collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a series of difficult missions and earn ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** craft a powerful magical artifact and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** help a friend with their scientific experiment and they give you ${client.emotes.economy.coins}${amount} as a thank you`,
				`**${user.displayName}** find a valuable relic in an ancient temple and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a bet in an underground fighting tournament and earn ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a rare antique to a collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a hidden stash of rare coins and sell them for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a time-limited event and earn ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** broker a peace treaty between two warring factions and receive ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a collection of rare musical instruments for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a championship and receive ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** find a legendary weapon in a mythical land and sell it for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a marathon and earn ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a stack of enchanted armor for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a bidding war and sell a rare painting for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a hidden treasure chest in a haunted mansion and earn ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** sell a collection of rare books to a famous author for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a difficult raid and receive ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a rare artifact to a museum for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** find a hidden ancient scroll and sell it to a scholar for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a championship and earn ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** sell a stack of rare minerals for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a secret underground vault and find ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a complex heist and receive ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a rare spaceship to a collector for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** find a hidden treasure map and embark on a lucrative journey, earning ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** win a high-stakes card game and receive ${client.emotes.economy.coins}${amount} as a prize`,
				`**${user.displayName}** sell a stack of rare artifacts to a prestigious museum for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** complete a dangerous expedition and receive ${client.emotes.economy.coins}${amount} as a reward`,
				`**${user.displayName}** sell a rare gemstone to a jewelry designer for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** discover a hidden hoard of ancient coins and sell them for ${client.emotes.economy.coins}${amount}`,
				`**${user.displayName}** participate in an exclusive art auction and sell a masterpiece for ${client.emotes.economy.coins}${amount}`
			]
			let result = Math.floor((Math.random() * replies.length));

			client.succNormal({
				text: `${replies[result]}`,
				author: {
					name: interaction.user.displayName,
					iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
				},
				type: 'editreply'

			}, interaction);

			if (dataTime) {
				dataTime.Work = Date.now();
				dataTime.save();
			} else {
				new Schema2({
					Guild: interaction.guild.id,
					User: user.id,
					Work: Date.now()
				}).save();
			}

			client.addMoney(interaction, user, amount);
		}
	})
}