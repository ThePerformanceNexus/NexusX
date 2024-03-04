const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('user') || interaction.user;

    if (user.bot) return client.errNormal({
        error: "You cannot see the balance of a bot!",
        type: 'editreply'
    }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {

            let total = data.Money + data.Bank;

            client.embed({
                // title: `${client.emotes.economy.bank}・Balance`,
                fields: [
                    {
                        name: `${client.emotes.economy.pocket}︱Wallet`,
                        value: `${client.emotes.economy.coins}${data.Money}`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.bank}︱Bank`,
                        value: `${client.emotes.economy.coins}${data.Bank}`,
                        inline: true
                    },
                    {
                        name: `💰︱Total`,
                        value: `${client.emotes.economy.coins}${total}`,
                        inline: true
                    }
                ],
                desc: `### ${client.emotes.economy.bank}︱Balance \n The current balance of **${user.displayName}**`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `The user doesn't have any money!`, type: 'editreply'
            }, interaction);
        }
    })
}