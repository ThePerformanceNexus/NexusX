const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('item')
        .setDescription('Add Items for sale in Your Server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the Items category commands')
        )
                .addSubcommand((subcommand) =>
            subcommand
                .setName('buy')
                .setDescription('Buy items in the store')

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('store')
                .setDescription('Show the store of this guild')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deleteitem')
                .setDescription('Delete a role item from the store')
                .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('additem')
                .setDescription('Add a role item to the store')
                .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))

        )
    ,
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 