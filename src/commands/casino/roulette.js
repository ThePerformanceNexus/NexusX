const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            if (data.RouletteCommands >= 10) return client.errNormal({ error: `You have reached the daily command limit for roulette!`, type: 'editreply' }, interaction);
            
            function isOdd(num) {
                if ((num % 2) == 0) return false;
                else if ((num % 2) == 1) return true;
            }

            let colour = interaction.options.getString('color');
            let money = parseInt(interaction.options.getNumber('amount'));

            let random = Math.floor(Math.random() * 37);

            if (!colour || !money) return client.errUsage({ usage: "roulette [color] [amount]", type: 'editreply' }, interaction);
            colour = colour.toLowerCase()
            if (money > data.Money) return client.errNormal({ error: `You are betting more than you have!`, type: 'editreply' }, interaction);
            if (money > 5000) return client.errNormal2({ error: `The max bet amount is 5000 ${client.emotes.economy.coins}`, type: 'editreply' }, interaction);

            // Calculate the payout
            let payout = 0;
            if (random == 0 && colour == "green") { // Green
                payout = money * 15;
            } else if (isOdd(random) && colour == "red") { // Red
                payout = money * 1.5;
            } else if (!isOdd(random) && colour == "black") { // Black
                payout = money * 2;
            }

            // Update the user's balance
            if (payout > 0) {
                data.Money += payout;
            } else {
                data.Money -= money;
            }

            data.RouletteCommands += 1;
            await data.save(); // Save the document once, after all updates are made

            if (payout > 0) {
                client.embed({ title: `🎰・Multiplier: ${payout / money}x`, 
                     author: {
                    name: interaction.user.displayName,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                }, desc: `You won **${client.emotes.economy.coins} $${payout}**`, type: 'editreply' }, interaction);
            } else {
                client.embed({ title: `🎰・Multiplier: 0x`,
                  author: {
                    name: interaction.user.displayName,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                },   desc: `You lost **${client.emotes.economy.coins} $${money}**`, type: 'editreply' }, interaction);
            }

        } else {
            client.errNormal2({ error: `You have no ${client.emotes.economy.coins}!`, type: 'editreply' }, interaction);
        }
    })
}