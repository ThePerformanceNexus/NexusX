const Discord = require('discord.js');
const Schema = require("../../database/models/economy");
const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {
  const storeData = await store.find({ Guild: interaction.guild.id });

  if (storeData.length === 0) {
     client.errNormal({
      error: `${interaction.guild.name} currently has nothing to offer`,
      type: 'editreply',
      components: []
    }, interaction);
  }

  let options = [];

  storeData.forEach(d => {
    const role = interaction.guild.roles.cache.get(d.Role);

    const generated = {
      label: `${role.name.substr(0, 24)} - ${d.Amount}$`,
      value: role.id,
    };

    options.push(generated);
  });

  const select = await client.generateSelect(`economyBuy`, options);

  client.embed({
    title: `🛒・${interaction.guild.name}'s Store`,
    desc: `Choose an item from the menu to buy`,
    components: [select],
    type: 'editreply'
  }, interaction);

  const filter = i => {
    return i.user.id === interaction.user.id;
  };

  interaction.channel.awaitMessageComponent({ filter, componentType: Discord.ComponentType.StringSelect, time: 60000 }).then(async i => {
    const selectedValue = i.values[0];
    const buyPerson = i.guild.members.cache.get(i.user.id);

    const checkStore = await store.findOne({ Guild: i.guild.id, Role: selectedValue });
    const role = interaction.guild.roles.cache.get(checkStore.Role);

    const data = await Schema.findOne({ Guild: i.guild.id, User: i.user.id });
    if (!data || parseInt(checkStore.Amount) > parseInt(data.Money)) {
      return client.errNormal({
        error: `You don't have enough money to buy this!`,
        type: 'update',
        components: []
      }, i);
    }

    client.removeMoney(i, i.user, parseInt(checkStore.Amount));
    try {
      await buyPerson.roles.add(role);
    } catch (e) {
      return client.errNormal({
        error: `I can't add <@&${role}> to you!`,
        type: 'update',
        components: []
      }, i);
    }

    client.succNormal({
      text: `The purchase has been successfully completed`,
      fields: [
        {
          name: `📘┆Item`,
          value: `${role.name} - ${checkStore.Amount}$`
        }
      ],
      type: 'update',
      components: []
    }, i);
  });
};