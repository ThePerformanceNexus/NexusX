const {
    CommandInteraction,
    Client
} = require('discord.js');
const {
    SlashCommandBuilder
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino')
        .setDescription('Play the casino game')
        .addSubcommand(subcommand =>
            subcommand
            .setName('help')
            .setDescription('Get information about the casino category commands')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('addmoney')
            .setDescription('Add money to a user')
            .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
            .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('balance')
            .setDescription('See your balance')
            .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('beg')
            .setDescription('Beg for money')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('reset')
            .setDescription('Reset everyone casino money to 0')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('crime')
            .setDescription('Commit a crime for chance to earn money')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('daily')
            .setDescription('Claim your daily money')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('deposit')
            .setDescription('Deposit money to the bank')
            .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('pay')
            .setDescription('Pay a user')
            .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
            .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('removemoney')
            .setDescription('Remove money from a user')
            .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
            .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('rob')
            .setDescription('Rob a user')
            .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
        )
        .addSubcommand(subcommand =>
			subcommand
			.setName('blackjack')
			.setDescription('Play a blackjack game to win money')
			.addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
			.setName('roulette')
			.setDescription('Play roulette')
			.addStringOption(option =>
				option.setName('color')
				.setDescription('The Colour you wanna bet on')
				.setRequired(true)
				.addChoices({
					name: 'Red',
					value: 'red'
				}, {
					name: 'Black',
					value: 'black'
				}, {
					name: 'Green',
					value: 'green'
				}, )
			)
			.addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
		)
        .addSubcommand(subcommand =>
            subcommand
                .setName('slots')
                .setDescription('Play slots')
                .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('withdraw')
            .setDescription('Withdraw your money from bank')
            .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('work')
            .setDescription('Work for some extra money')
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('leaderboard')
            .setDescription('See the casino leaderboard')
            .addStringOption(option =>
                option.setName('type')
                .setDescription('The leaderboard type that you want')
                .setRequired(true)
                .addChoices({
                    name: 'Money',
                    value: 'money'
                }, {
                    name: 'Bank',
                    value: 'bank'
                })
            )
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({
            fetchReply: true
        });
        client.loadSubcommands(client, interaction, args);
    },
};