const Discord = require('discord.js');
const Canvacord = require("canvacord");

const Functions = require("../../database/models/functions");
const Schema = require("../../database/models/levels");

module.exports = async (client, interaction, args) => {
    const data = await Functions.findOne({ Guild: interaction.guild.id });

    if (data && data.Levels == true) {
        const target = interaction.options.getUser('user') || interaction.user;
        const user = await client.fetchLevels(target.id, interaction.guild.id);
        if(!user || !user.xp) return client.errNormal({
            error: "This user has no levels!",
            type: 'editreply'
        }, interaction);
        let xpRequired = client.xpFor(user.level + 1);

        const background = "https://media.discordapp.net/attachments/1205792109467009034/1209539793470361710/bgbg.webp?ex=65e74ab6&is=65d4d5b6&hm=a09b95d3df685314e0e9436f880fbf8ec3634a5a2f027ad3501ef84f410fadad&=&format=webp&width=1167&height=352";
        const rankCard = new Canvacord.Rank()
            .setAvatar(target.displayAvatarURL({ dynamic: false, extension: 'png' }))
            .setRequiredXP(xpRequired)
            .setCurrentXP(user.xp)
            .setLevel(user.level)
            .setProgressBar("#c86553", "COLOR")
            .setUsername(target.displayName)
            .setStatus("dnd")
            .setRank(user.position)
            .setBackground("IMAGE", background);// Replace "IMAGE_URL" with the URL of your desired background image
        rankCard.build()
            .then(data => {
                const attachment = new Discord.AttachmentBuilder(data, { name: "RankCard.png" });
                interaction.editReply({ files: [attachment] });
            });
    }
    else {
        client.errNormal({
            error: "Levels are disabled in this guild!",
            type: 'editreply'
        }, interaction);
    }
}

