const Discord = require('discord.js');
const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;
    let timeout = 3600000;

    Schema2.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, dataTime) => {
        if (dataTime && dataTime.Crime !== null && timeout - (Date.now() - dataTime.Crime) > 0) {
            let time = (dataTime.Crime / 1000 + timeout / 1000).toFixed(0);
            return client.errWait({
                time: time,
                type: 'editreply'
            }, interaction);
        } else {
            let replies = [
                { crime: 'Hacking', successMsg: 'Your hacking attempt was successful!', fineMsg: 'You were caught hacking and have been fined', minFine: 10, maxFine: 40, successChance: 80 },
                { crime: 'Burglary', successMsg: 'You successfully burglarized a house!', fineMsg: 'You were caught during a burglary and have been fined', minFine: 20, maxFine: 50, successChance: 70 },
                { crime: 'Robbery', successMsg: 'You carried out a successful robbery!', fineMsg: 'You were caught during a robbery and have been fined', minFine: 30, maxFine: 60, successChance: 75 },
                { crime: 'Murder', successMsg: 'You committed murder and got away with it!', fineMsg: 'You were caught for murder and have been fined', minFine: 50, maxFine: 100, successChance: 50 },
                { crime: 'Dealing drugs', successMsg: 'You successfully made a drug deal!', fineMsg: 'You were caught dealing drugs and have been fined', minFine: 40, maxFine: 80, successChance: 85 },
                { crime: 'Child abuse', successMsg: 'You carried out a heinous act of child abuse!', fineMsg: 'You were caught for child abuse and have been fined', minFine: 60, maxFine: 120, successChance: 60 },
                { crime: 'Arms trade', successMsg: 'You successfully completed an illegal arms trade!', fineMsg: 'You were caught for illegal arms trade and have been fined', minFine: 70, maxFine: 140, successChance: 70 },
                { crime: 'Street robbery', successMsg: 'You robbed someone on the street and got away!', fineMsg: 'You were caught for street robbery and have been fined', minFine: 30, maxFine: 60, successChance: 80 }
            ];

            let result = Math.floor(Math.random() * replies.length);
            let successChance = replies[result].successChance;
            let result2 = Math.floor(Math.random() * 100);
            let amount = Math.floor(Math.random() * 80) + 1;

            if (result2 <= successChance) {
                client.succNormal({
                    text: replies[result].successMsg,
                    fields: [
                        {
                            name: `🦹‍♂️︱Crime`,
                            value: replies[result].crime,
                            inline: true
                        },
                        {
                            name: `💰︱Earned`,
                            value: `${client.emotes.economy.coins}${amount}`,
                            inline: true
                        }
                    ],
                    type: 'editreply'
                }, interaction);

                client.addMoney(interaction, user, amount);

                if (dataTime) {
                    dataTime.Crime = Date.now();
                    dataTime.save();
                } else {
                    new Schema2({
                        Guild: interaction.guild.id,
                        User: user.id,
                        Crime: Date.now()
                    }).save();
                }
            } else {
                let fine = Math.floor(Math.random() * (replies[result].maxFine - replies[result].minFine + 1)) + replies[result].minFine;
                client.errNormal({
                    error: `${replies[result].fineMsg} $${fine}`,
                    type: 'editreply'
                }, interaction);

                client.removeMoney(interaction, user, fine);

                if (dataTime) {
                    dataTime.Crime = Date.now();
                    dataTime.save();
                } else {
                    new Schema2({
                        Guild: interaction.guild.id,
                        User: user.id,
                        Crime: Date.now()
                    }).save();
                }
            }
        }
    })
}