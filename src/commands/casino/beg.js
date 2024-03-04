const Discord = require('discord.js');

const Schema = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    let timeout = 180000;
    let amount = 10;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, dataTime) => {
        if (dataTime && dataTime.Beg !== null && timeout - (Date.now() - dataTime.Beg) > 0) {
            let time = (dataTime.Beg / 1000 + timeout / 1000).toFixed(0);
            return client.errWait({
                time: time,
                type: 'editreply'
            }, interaction);
        }
        else {

            client.succNormal({
                text: `**${user.displayName}** begged for some money and got ${client.emotes.economy.coins}${amount}`,
                author: {
                    name: interaction.user.displayName,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                },
                type: 'editreply'
            }, interaction);

            if (dataTime) {
                dataTime.Beg = Date.now();
                dataTime.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    User: user.id,
                    Beg: Date.now()
                }).save();
            }

            client.addMoney(interaction, user, amount);
        }
    })
}

 