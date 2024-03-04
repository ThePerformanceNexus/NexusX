const Discord = require('discord.js');
const Schema = require("../../database/models/economy");
const items = require("../../database/models/store");

module.exports = async (client, interaction, args) => {
  const itemsData = await items.find();

  let options = [];

  itemsData.forEach(d => {
    const role = interaction.guild.roles.cache.get(d.Role);

    const generated = {
      label: `${role.name.substr(0, 24)} - ${d.Amount}$`,
      value: role.id,
    };

    options.push(generated);
  });

  options.push(
    {
      label: `🎣 Fishing Rod - 100$`,
      value: `fishingrod`,
      description: `Used to hunt fish`
    },
    {
      label: `⚡ VIP - 100000$`,
      value: `VIP`,
      description: `With this item, nobody can sudo you & other benefits.`
    },
  );

  const select = await client.generateSelect(`economyBuy`, options);

  client.embed({
    title: `🛒・NexusX Global Store`,
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

    if (selectedValue === 'fishingrod') {
      const data = await Schema.findOne({ User: i.user.id });
      if (!data || parseInt(100) > parseInt(data.Money)) {
        return client.errNormal({
          error: `You don't have enough money to buy this!`,
          type: 'update',
          components: []
        }, i);
      }

      client.removeMoney(i, i.user, 100);
      items.findOne({ User: i.user.id }, async (err, data) => {
        if (data) {
          data.FishingRod = true;
          data.save();
        } else {
          new items({
            User: i.user.id,
            FishingRod: true,
          }).save();
        }
      });

      return client.succNormal({
        text: `The purchase has been successfully completed`,
        fields: [
          {
            name: `📘┆Item`,
            value: `Fishing Rod - 100$`
          }
        ],
        type: 'update',
        components: []
      }, i);
    }

    if (selectedValue === 'VIP') {
      const data = await Schema.findOne({ User: i.user.id });
      if (!data || parseInt(100000) > parseInt(data.Money)) {
        return client.errNormal({
          error: `You don't have enough money to buy this!`,
          type: 'update',
          components: []
        }, i);
      }

      client.removeMoney(i, i.user, 100000);
      items.findOne({ User: i.user.id }, async (err, data) => {
        if (data) {
          data.VIP = true;
          data.save();
        } else {
          new items({
            User: i.user.id,
            VIP: true,
          }).save();
        }
      });

      return client.succNormal({
        text: `The purchase has been successfully completed`,
        fields: [
          {
            name: `📘┆Item`,
            value: `⚡ VIP - 100000$`,
            description: `With this item, nobody can sudo you & other benefits.`
          }
        ],
        type: 'update',
        components: []
      }, i);
    }

    const checkItems = await items.findOne({ Role: selectedValue });
    const role = interaction.guild.roles.cache.get(checkItems.Role);

    const data = await Schema.findOne({ User: i.user.id });
    if (!data || parseInt(checkItems.Amount) > parseInt(data.Money)) {
      return client.errNormal({
        error: `You don't have enough money to buy this!`,
        type: 'update',
        components: []
      }, i);
    }

    client.removeMoney(i, i.user, parseInt(checkItems.Amount));
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
          value: `${role.name} - ${checkItems.Amount}$`
        }
      ],
      type: 'update',
      components: []
    }, i);
  });
};