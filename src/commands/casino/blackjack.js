const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            // if (data.BlackjackCommands >= 20) return client.errNormal({ error: `You have reached the daily command limit for blackjack!`, type: 'editreply' }, interaction);

            let money = parseInt(interaction.options.getNumber('amount'));

            if (!money) return client.errUsage({ usage: "blackjack [amount]", type: 'editreply' }, interaction);
            if (money > data.Money) return client.errNormal2({ error: `You don't have enough ${client.emotes.economy.coins}!`, type: 'editreply' }, interaction);
            if (money > 5000) return client.errNormal2({ error: `The max bet amount is ${client.emotes.economy.coins}5000`, type: 'editreply' }, interaction);

            // data.Money -= money;
            data.BlackjackCommands += 1;
            data.save();

            var numCardsPulled = 0;
            var gameOver = false;
            var player = {
                cards: [],
                score: 0,
            };
            var dealer = {
                cards: [],
                score: 0,
            };
            function getCardsValue(a) {
                var cardArray = [],
                    sum = 0,
                    i = 0,
                    dk = 10.5,
                    doubleking = "QQ",
                    aceCount = 0;
                cardArray = a;
                for (i; i < cardArray.length; i += 1) {
                    if (
                        cardArray[i].rank === "J" ||
                        cardArray[i].rank === "Q" ||
                        cardArray[i].rank === "K"
                    ) {
                        sum += 10;
                    } else if (cardArray[i].rank === "A") {
                        sum += 11;
                        aceCount += 1;
                    } else if (cardArray[i].rank === doubleking) {
                        sum += dk;
                    } else {
                        sum += cardArray[i].rank;
                    }
                }
                while (aceCount > 0 && sum > 21) {
                    sum -= 10;
                    aceCount -= 1;
                }
                return sum;
            }

            var deck = {
                deckArray: [],
                initialize: function() {
                    var suitArray, rankArray, s, r, n;
                    suitArray = ["b", "d", "g", "s"];
                    rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
                    n = 13;
            
                    for (s = 0; s < suitArray.length; s += 1) {
                        for (r = 0; r < rankArray.length; r += 1) {
                            this.deckArray[s * n + r] = {
                                rank: rankArray[r],
                                suit: suitArray[s],
                            };
                        }
                    }
                },
                shuffle: function() {
                    var temp, i, rnd;
                    for (i = 0; i < this.deckArray.length; i += 1) {
                        rnd = Math.floor(Math.random() * this.deckArray.length);
                        temp = this.deckArray[i];
                        this.deckArray[i] = this.deckArray[rnd];
                        this.deckArray[rnd] = temp;
                    }
                },
            };
            
            deck.initialize();
            deck.shuffle();
            
            async function bet(outcome) {
                if (outcome === "win") {
                    data.Money += money;
                    data.save();
                }
                if (outcome === "lose") {
                    data.Money -= money;
                    data.save();
                }
                if (outcome === "surrender") {
                    data.Money -= money / 2;
                    data.save();
                }
                if (outcome === "blackjack") {
                    data.Money += money * 1.5;
                    data.save();
                }
            }
            
            function endMsg(f, msg, cl, dealerC) {
                let cardsMsg = "";
                player.cards.forEach(function(card) {
                    var emAR = ["♥", "♦", "♠", "♣"];
                    var t = emAR[Math.floor(Math.random() * emAR.length)];
                    cardsMsg += t + card.rank.toString();
                    if (card.suit == "d1") cardsMsg += "♥";
                    if (card.suit == "d2") cardsMsg += "♦";
                    if (card.suit == "d3") cardsMsg += "♠";
                    if (card.suit == "d4") cardsMsg += "♣";
                    cardsMsg += " ";
                });
                cardsMsg += " \n\n Value : " + player.score.toString() + "\n";
            
                


                var dealerMsg = "";
                if (!dealerC) {
                    var emAR = ["♥", "♦", "♠", "♣"];
                    var t = emAR[Math.floor(Math.random() * emAR.length)];
                    dealerMsg = t + dealer.cards[0].rank.toString();
                    if (dealer.cards[0].suit == "d1") dealerMsg += "♥";
                    if (dealer.cards[0].suit == "d2") dealerMsg += "♦";
                    if (dealer.cards[0].suit == "d3") dealerMsg += "♠";
                    if (dealer.cards[0].suit == "d4") dealerMsg += "♣";
                    dealerMsg += " ";
                    dealerMsg += " \n\n Value : " + dealer.score.toString() + "\n" ;
                } else {
                    dealerMsg = "";
                    dealer.cards.forEach(function(card) {
                        var emAR = ["♥", "♦", "♠", "♣"];
                        var t = emAR[Math.floor(Math.random() * emAR.length)];
                        dealerMsg += t + card.rank.toString();
                        if (card.suit == "d1") dealerMsg += "♥";
                        if (card.suit == "d2") dealerMsg += "♦";
                        if (card.suit == "d3") dealerMsg += "♠";
                        if (card.suit == "d4") dealerMsg += "♣";
                        dealerMsg += " ";
                    });
                    dealerMsg += "\n\n Value : " + dealer.score.toString() + "\n" ;
                }
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('blackjack_hit')
                            .setLabel("Hit")
                            .setEmoji("➕")
                            .setStyle(Discord.ButtonStyle.Success)
                            .setDisabled(gameOver),

                        new Discord.ButtonBuilder()
                            .setCustomId('blackjack_stand')
                            .setLabel("Stand")
                            .setEmoji("➖")
                            .setStyle(Discord.ButtonStyle.Danger)
                            .setDisabled(gameOver),

                        new Discord.ButtonBuilder()
                            .setCustomId('blackjack_surrender')
                            .setLabel("Surrender")
                            .setEmoji("🏳️")
                            .setStyle(Discord.ButtonStyle.Secondary)
                            .setDisabled(gameOver),
                            
                    )
                    
                    let total = data.Money;

                if (cl) {
                    client.embed({
                        desc: `## ${client.emotes.economy.coins} Balance : ${total} \n ${f} \n${msg}\n\n`,
                        author: {
                            name: interaction.user.displayName,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                        },
                        fields: [
                            {
                                name: `${user.displayName}'s Cards \n`,
                                value: cardsMsg,
                                inline: true,
                            },
                            {
                                name: `NexusX's Cards \n`,
                                value: dealerMsg,
                                inline: true,
                            }
                        ],
                        type: 'editreply'
                    }, interaction)
                }
                else {
                    client.embed({
                        desc: `## ${client.emotes.economy.coins} Balance : ${total} \n ${f} \n${msg}\n\n`,
                        author: {
                            name: interaction.user.displayName,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
                        },
                        fields: [
                            {
                                name: `${user.displayName}'s Cards \n`,
                                value: cardsMsg,
                                inline: true,
                            },
                            {
                                name: `NexusX's Cards \n`,
                                value: dealerMsg,
                                inline: true,
                            }
                        ],
                        components: [row],
                        type: 'editreply'
                    }, interaction)
                }
            }

            async function endGame() {
                if (player.score === 21 && dealer.score === 21) {
                    bet("tie");
                    gameOver = true;
                    endMsg(
                        `Results : Push! It's a tie! Your bet of ${client.emotes.economy.coins}${money} is returned.`,
                        ``
                    );
                }
            
                if (player.score === 21) {
                    bet("blackjack");
                    gameOver = true;
                    endMsg(
                        `Results : Blackjack! You win ${client.emotes.economy.coins}${money * 1.5}!`,
                        ``
                    );
                }
            
                if (player.score > 21) {
                    bet("lose");
                    gameOver = true;
                    endMsg(
                        `Results : Bust! You went over 21. You lose your bet of ${client.emotes.economy.coins}${money}.`,
                        ``
                    );
                }
            
                if (dealer.score === 21) {
                    bet("lose");
                    gameOver = true;
                    endMsg(
                        `Results : Dealer has blackjack! You lose your bet of ${client.emotes.economy.coins}${money}.`,
                        ``
                    );
                }
            
                if (dealer.score > 21) {
                    bet("win");
                    gameOver = true;
                    endMsg(
                        `Results : Dealer busts! You win ${client.emotes.economy.coins}${money}!`,
                        ``
                    );
                }
            
                if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
                    bet("win");
                    gameOver = true;
                    endMsg(
                        `Results : You win! Your bet of ${client.emotes.economy.coins}${money} is doubled!`,
                        ``
                    );
                }
            
                if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
                    bet("lose");
                    gameOver = true;
                    endMsg(
                        `Results : You lose! The dealer wins your bet of ${client.emotes.economy.coins}${money}.`,
                        ``
                    );
                }
            
                if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
                    bet("tie");
                    gameOver = true;
                    endMsg(
                        `Results : Push! It's a tie! Your bet of ${client.emotes.economy.coins}${money} is returned.`,
                        ``
                    );
                }
            }

            function dealerDraw() {
                dealer.cards.push(deck.deckArray[numCardsPulled]);
                dealer.score = getCardsValue(dealer.cards);
                numCardsPulled += 1;
            }

            function newGame() {
                hit();
                hit();
                dealerDraw();
                endGame();
            }

            function hit() {
                player.cards.push(deck.deckArray[numCardsPulled]);
                player.score = getCardsValue(player.cards);

                numCardsPulled += 1;
                if (numCardsPulled >2) {
                    endGame();
                }
            }

            function stand() {
                while (dealer.score <17) {
                    dealerDraw();
                }
                endGame();
            }

            function surrender() {
                bet("surrender");
                gameOver = true;

                // Send a public message to the channel informing the user that they surrendered and how much money they got back.
                // const surrenderMsg = `${user} surrendered and got back **$${(money /2).toFixed(2)} ${client.emotes.economy.coins}**! `;
                // interaction.channel.send(surrenderMsg);

                endMsg(
                    `Results : **You Surrendered and got back ${client.emotes.economy.coins}${money/2}**`,
                    ``,
                );
            }
            newGame();
            async function loop() {
                if (gameOver) return;

                endMsg(
                    ``,
                    "",
                    client.color
                  );

                const filter = i => i.user.id === interaction.user.id;
                interaction.channel.awaitMessageComponent({ filter, max: 1, time: 600000, errors: ["time"] })
                    .then(async i => {
                        if (i.customId == "blackjack_hit") {
                            hit();
                            loop();
                            return i.deferUpdate();;
                        } else if (i.customId == "blackjack_stand") {
                            stand();
                            loop();
                            return i.deferUpdate();;
                        } else if (i.customId == "blackjack_surrender") {
                            surrender();
                            loop();
                            return i.deferUpdate();;
                        }
                    })
                    
                    .catch(_ => {
                        interaction.channel.send(`${user} you didn't respond in time. Your bet has been returned.`);
                        // data.Money += money;
                        // data.BlackjackCommands -= 1;
                        // data.save();
                        gameOver = true;
                        endGame()
                        return;
                    });
            }
            await loop();
        }
        else {
            client.errNormal2({ error: `You don't have any ${client.emotes.economy.coins}!`, type: 'editreply' }, interaction);
        }
    })
}