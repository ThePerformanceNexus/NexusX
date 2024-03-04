const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
  let user = interaction.user;
  let timeout = 86400000;
  let amount = 200;

  Schema2.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, dataTime) => {
    if (dataTime && dataTime.Daily !== null && timeout - (Date.now() - dataTime.Daily) > 0) {
      let time = (dataTime.Daily / 1000 + timeout / 1000).toFixed(0);
      return client.errWait({
        time: time,
        type: 'editreply'
      }, interaction);
    }
    else {

      client.succNormal({
        text: `**${user.displayName}** collected his daily reward! and got ${client.emotes.economy.coins}${amount}`,
        author: {
          name: interaction.user.displayName,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
      },
        type: 'editreply'
      }, interaction);

      if (dataTime) {
        dataTime.Daily = Date.now();
        dataTime.save();
      }
      else {
        new Schema2({
          Guild: interaction.guild.id,
          User: user.id,
          Daily: Date.now()
        }).save();
      }

      client.addMoney(interaction, user, amount);
    }
  })
}

 