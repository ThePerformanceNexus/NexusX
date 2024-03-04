const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    let amount = interaction.options.getNumber('amount');
    let user = interaction.user;

    if (!amount) return client.errUsage({ usage: "withdraw [amount]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Enter a valid number!", type: 'editreply' }, interaction);

    if (amount < 0) return client.errNormal({ error: `You can't withdraw negative money!`, type: 'editreply' }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            if (data.Bank < amount) return client.errNormal({ error: `You don't have enough money in the bank to withdraw!`, type: 'editreply' }, interaction);

            data.Money += amount;
            data.Bank -= amount;
            data.save();

            client.succNormal({
                text: `**${user.displayName}** withdrawn ${client.emotes.economy.coins}${amount} from his bank account!`,
                author: {
                    name: interaction.user.displayName,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                },
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({ text: `You don't have any money to withdraw!`, type: 'editreply' }, interaction);
        }
    })
}