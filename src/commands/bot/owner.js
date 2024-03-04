const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `**The Performance Nexus**`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `**ThePerformanceNexus#9934**`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `**The Nexus**`,
            inline: true,
        },
        ],
        type: 'editreply'
    }, interaction)
}

 