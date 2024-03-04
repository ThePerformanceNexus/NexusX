const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        {
            name: `📺┆Activities`,
            value: `</activities:1205136742399737866>`,
            inline: true
        },
        {
            name: `🚫┆AFK`,
            value: `</afk help:1205136742399737867>`,
            inline: true
        },
        {
            name: `📣┆Announcement`,
            value: `</announcement help:1205136742399737868>`,
            inline: true
        },
        {
            name: `👮‍♂️┆Auto mod`,
            value: `</automod help:1205136742399737869>`,
            inline: true
        },
        {
            name: `⚙️┆Auto setup`,
            value: `</autosetup help:1205136742399737870>`,
            inline: true
        },
        {
            name: `🎂┆Birthday`,
            value: `</birthdays help:1205136742399737871>`,
            inline: true
        },
        {
            name: `🤖┆Bot`,
            value: `</bot help:1205136742399737872>`,
            inline: true
        },
        {
            name: `🎰┆Casino`,
            value: `</casino help:1205136742399737873>`,
            inline: true
        },
        {
            name: `⚙┆Configuration`,
            value: `</config help:1205136742399737875>`,
            inline: true
        },
        {
            name: `💰┆Economy`,
            value: `</economy help:1205136742605266955>`,
            inline: true
        },
        {
            name: `👪┆Family`,
            value: `</family help:1205136742605266957>`,
            inline: true
        },
        {
            name: `😂┆Fun`,
            value: `</fun help:1205136742605266958>`,
            inline: true
        },
        {
            name: `🎮┆Games`,
            value: `</games help:1205136742605266959>`,
            inline: true
        },
        {
            name: `🥳┆Giveaway`,
            value: `</giveaway help:1205136742605266960>`,
            inline: true
        },
        {
            name: `⚙️┆Guild settings`,
            value: `</guild help:1205136742605266961>`,
            inline: true
        },
        {
            name: `🖼┆Images`,
            value: `</images help:1205136742605266963>`,
            inline: true
        },
        {
            name: `📨┆Invites`,
            value: `</invites help:1205136742789947463>`,
            inline: true
        },
        {
            name: `🆙┆Leveling`,
            value: `</levels help:1205136742789947464>`,
            inline: true
        },
        {
            name: `💬┆Messages`,
            value: `</messages help:1205136742789947466>`,
            inline: true
        },
        {
            name: `👔┆Moderation`,
            value: `</moderation help:1205136742789947467>`,
            inline: true
        },
        {
            name: `🎶┆Music`,
            value: `</music help:1205136742789947468>`,
            inline: true
        },
        {
            name: `📓┆Notepad`,
            value: `</notepad help:1205136742789947469>`,
            inline: true
        },
        {
            name: `👤┆Profile`,
            value: `</profile help:1205136742789947470>`,
            inline: true
        },
        {
            name: `📻┆Radio`,
            value: `</radio help:1205136742789947471>`,
            inline: true
        },
        {
            name: `😛┆Reaction roles`,
            value: `</reactionroles help:1205136743100321812>`,
            inline: true
        },
        {
            name: `🔍┆Search`,
            value: `</search help:1205136743100321814>`,
            inline: true
        },
        {
            name: `📊┆Server stats`,
            value: `</serverstats help:1205136743100321815>`,
            inline: true
        },
        {
            name: `⚙️┆Setup`,
            value: `</setup help:1205136743100321817>`,
            inline: true
        },
        {
            name: `🎛┆Soundboard`,
            value: `</soundboard help:1205136743100321818>`,
            inline: true
        },
        {
            name: `🗨️┆Sticky messages`,
            value: `</stickymessages help:1205136743100321819>`,
            inline: true
        },
        {
            name: `💡┆Suggestions`,
            value: `</suggestions help:1205136743100321820>`,
            inline: true
        },
        {
            name: `🤝┆Thanks`,
            value: `</thanks help:1205136743100321821>`,
            inline: true
        },
        {
            name: `🎫┆Tickets`,
            value: `</tickets help:1205136743439929407>`,
            inline: true
        },
        {
            name: `⚒️┆Tools`,
            value: `</tools help:1205136743439929409>`,
            inline: true
        },
        {
            name: `🔊┆Voice`,
            value: `</voice help:1205136743439929410>`,
            inline: true
        },
        {
            name: `🪲┆Report Bug`,
            value: `</report:1205136743100321813>`,
            inline: true
        },
    ];

 client.on(Discord.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId == "Bot-helppanel") {
        if (interaction.values == "commands-Bothelp") {
            interaction.deferUpdate();
            let page = 1;

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('helpPrev')
                        .setEmoji('⬅️')
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true),

                    new Discord.ButtonBuilder()
                        .setCustomId('helpNext')
                        .setEmoji('➡️')
                        .setStyle(Discord.ButtonStyle.Secondary),

                    new Discord.ButtonBuilder()
                        .setLabel("Support server")
                        .setURL(client.config.discord.serverInvite)
                        .setStyle(Discord.ButtonStyle.Link),
                );
            const row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Bot-helppanel')
                        .setPlaceholder('❌┆Nothing selected')
                        .addOptions([
                            {
                                label: `Commands`,
                                description: `Show the commands of Bot!`,
                                emoji: "💻",
                                value: "commands-Bothelp",
                            },
                        ]),
                );

            client.embed({
                title: `❓・Help Panel - Page 1/3`,
                desc: `View all command categories of NexusX here! \n\n Click on them below to use them!`,
                fields: fields.slice(0, 12),
                components: [row],
                type: 'edit'
            }, interaction.message).then(msg => {
                const filter = i => i.user.id === interaction.user.id;

                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });

                collector.on('collect', async i => {
                    if (i.customId == "helpNext") {
                        if (page == 1) {
                            client.embed({
                                title: `❓・Help Panel - Page 2/3`,
                                desc: `View all command categories of NexusX here! \n\n Click on them below to use them!`,
                                fields: fields.slice(12, 24),
                                components: [row],
                                type: 'update'
                            }, i)
                            page += 1;
                            row.components[0].setDisabled(false);
                        } else if (page == 2) {
                            client.embed({
                                title: `❓・Help Panel - Page 3/3`,
                                desc: `View all command categories of NexusX here! \n\n Click on them below to use them!`,
                                fields: fields.slice(24, 36),
                                components: [row],
                                type: 'update'
                            }, i)
                            page += 1;
                            row.components[1].setDisabled(true);
                        }
                    }

                    else if (i.customId == "helpPrev") {
                        if (page == 3) {
                            client.embed({
                                title: `❓・Help Panel - Page 2/3`,
                                desc: `View all command categories of NexusX here! \n\n Click on them below to use them!`,
                                fields: fields.slice(12, 24),
                                components: [row],
                                type: 'update'
                            }, i)
                            page -= 1;
                            row.components[1].setDisabled(false);
                        } else if (page == 2) {
                            client.embed({
                                title: `❓・Help Panel - Page 1/3`,
                                desc: `View all command categories of NexusX here! \n\n Click on them below to use them!`,
                                fields: fields.slice(0, 12),
                                components: [row],
                                type: 'update'
                            }, i)
                            page -= 1;
                            row.components[0].setDisabled(true);
                        }
                    }
                });

                setTimeout(() => {
                    row.components[1].setDisabled(true);
                    row.components[2].setDisabled(true);
                    interaction.editReply({ components: [row] });
                }, 100000);
            })
        }
    }
}).setMaxListeners(0)
}