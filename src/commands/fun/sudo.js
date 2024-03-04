const items = require("../../database/models/economyItems");
const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const user = interaction.options.getUser('user');
  const text = interaction.options.getString('text');

  if (text.length >= 2000) {
    return client.errNormal({ error: "You may not use more than 2000 characters!", type: 'editreply' }, interaction);
  } else if (user.id === '1141808347402739732') {
    return client.errNormal({ error: "You can't use this command on the bot's owner", type: 'editreply' }, interaction);
  }

  const member = interaction.guild.members.cache.get(user.id);
  const itemsData = await items.findOne({ Guild: interaction.guild.id, User: member.id });

    if (itemsData && itemsData.VIP) {
    return client.errNormal({ error: "You can't use this command on a user with VIP status!", type: 'editreply' }, interaction);
  }

  interaction.channel.createWebhook({
    name: member.displayName,
    avatar: user.displayAvatarURL(),
  }).then(async (_webhook) => {
    await _webhook.send(client.removeMentions(text));
    _webhook.delete();

    client.succNormal({
      text: `The sudo message was sent!`,
      type: 'ephemeraledit'
    }, interaction);

    console.log(`User: ${interaction.user.tag} (ID: ${interaction.user.id})`);
    console.log(`Target: ${member.displayName} (ID: ${member.id})`);

    setTimeout(() => {
      interaction.deleteReply().catch(console.error);
    }, 100); // Delayed deletion after 100 milliseconds
  }).catch(console.error);
};