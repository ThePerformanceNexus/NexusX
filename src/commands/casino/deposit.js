const Discord = require('discord.js');
const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
  let amount = interaction.options.getNumber('amount');
  let user = interaction.user;

  if (!amount) return client.errUsage({ usage: "deposit [amount]", type: 'editreply' }, interaction);

  if (isNaN(amount)) return client.errNormal({ error: "Enter a valid number!", type: 'editreply' }, interaction);

  if (amount < 0) return client.errNormal({ error: `You can't deposit negative money!`, type: 'editreply' }, interaction);

  Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
    if (data) {
      if (data.Money < parseInt(amount)) return client.errNormal({ error: `You don't have that much money!`, type: 'editreply' }, interaction);

      let money = parseInt(amount);

      data.Money -= money;
      data.Bank += money;
      await data.save();
      
      // Calculate 3% increase
      let weeklyIncrease = money * 0.03;
      data.WeeklyIncrease += weeklyIncrease;
      await data.save();
      
      client.succNormal({
        text: `**${user.displayName}** deposited ${client.emotes.economy.coins}${amount} into his bank account!`,
        author: {
          name: interaction.user.displayName,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
      },
        type: 'editreply'
      }, interaction);
    } else {
      client.errNormal({ text: `You don't have any money to deposit!`, type: 'editreply' }, interaction);
    }
  });
}