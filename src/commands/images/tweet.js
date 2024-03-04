const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    const user = interaction.user.displayName;
    let text = interaction.options.getString('text');

    if (text.length > 68) text = text.slice(0, 65) + "...";

    try {
        fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`)

            .then((res) => res.json()).catch({})
            .then(async (json) => {

                client.embed({
                    title: `🖼・Tweet`,
                    image: json.message,
                    type: 'editreply'
                }, interaction)

            }).catch({})
    }
    catch { }

}

 