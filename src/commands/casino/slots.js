const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍓", "🍒"];
const Discord = require('discord.js');
const ms = require("parse-ms");

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            let money = parseInt(interaction.options.getNumber('amount'));
            let win = false;

            if (!money) return client.errUsage({ usage: "slots [amount]", type: 'editreply' }, interaction);
            if (money > data.Money) return client.errNormal({ error: `You are betting more than you have!`, type: 'editreply' }, interaction);
            if (money > 5000) return client.errNormal2({ error: `The max bet amount is ${client.emotes.economy.coins}5000`, type: 'editreply' }, interaction);


            let number = [];
            for (i = 0; i < 3; i++) {
                // Increase the probability of losing by assigning more weight to losing items
                let randomNum = Math.random();
                if (randomNum < 0.75) {
                    // Assign losing items
                    number[i] = Math.floor(Math.random() * (slotItems.length - 1)) + 1;
                } else {
                    // Assign winning items
                    number[i] = 0;
                }
            }

            if (number[0] == number[1] && number[1] == number[2]) {
                money *= 9;
                win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                money *= 2;
                win = true;
            }

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('slots_1')
                        .setLabel(`${slotItems[number[0]]}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true),

                    new Discord.ButtonBuilder()
                        .setCustomId('slots_2')
                        .setLabel(`${slotItems[number[1]]}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true),

                    new Discord.ButtonBuilder()
                        .setCustomId('slots_3')
                        .setLabel(`${slotItems[number[2]]}`)
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true),
                );

            if (win) {
                client.embed({
                    title: `🎰・Slots`,
                    desc: `You won **${client.emotes.economy.coins} $${money}**`,
                    author: {
                        name: interaction.user.displayName,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                    },
                    color: client.config.colors.success,
                    components: [row],
                    type: 'editreply'
                }, interaction);

                data.Money += money;
                data.save();
            } else {
                client.embed({
                    title: `🎰・Slots`,
                    desc: `You lost **${client.emotes.economy.coins} $${money}**`,
                    author: {
                        name: interaction.user.displayName,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                    },
                    components: [row],
                    color: client.config.colors.error,
                    type: 'editreply'
                }, interaction);

                data.Money -= money;
                data.save();
            }
        } else {
            client.errNormal2({ error: `You have no ${client.emotes.economy.coins}!`, type: 'editreply' }, interaction);
        }
    });
};