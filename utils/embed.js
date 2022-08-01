const { EmbedBuilder } = require("discord.js");

function createEmbed(type, args) {
    var embeds = [];
    var embed = new EmbedBuilder();

    var time = new Date().getTime();

    if (type == "help") {
        embed.setTitle("LABY.net - Commands")
            .setColor(0x0A56A5)
            .setURL(`https://laby.net/`)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/icons/866584873451520010/266b2af803271d122a57729cd28b7f4d.webp");

        embed.addFields(
            {
                name: "/search <Name>",
                value: "Searches for a user by his name"
            },
            {
                name: "/check <Name>",
                value: "Checks the status of a name"
            },
            {
                name: "/history <Name>",
                value: "Shows the name history of a user by his name"
            },
            {
                name: "/badge <Name>",
                value: "Shows all badges a user has"
            },
            {
                name: "/skin <Name>",
                value: "Shows the current skin of a user"
            }
        );

        embeds.push(embed);
    }

    if (type == "invalidLength") {
        embed.setColor(0xff2c2c)
            .setDescription(`**The Minecraft name '${fixDiscord(args.name)}' has a invalid length.**`);

        embeds.push(embed);
    }

    if (type == "invalidName") {
        embed.setColor(0xff2c2c)
            .setDescription(`**The Minecraft name '${fixDiscord(args.name)}' contains forbidden characters.**`);

        embeds.push(embed);
    }

    if (type == "notFound") {
        embed.setColor(0xff2c2c)
            .setDescription(`**Could not find any users matching '${fixDiscord(args.name)}'.**`);

        embeds.push(embed);
    }

    if (type == "search") {
        embed.setTitle(`Users matching '${fixDiscord(args.name)}'`)
            .setColor(0xbebebe)
            .setTimestamp();

        for (var i = 0; i < args.results.length; i++) {
            embed.addFields(
                {
                    name: `Name: ${fixDiscord(args.results[i].user_name)}`,
                    value: `UUID: ${args.results[i].uuid}`
                }
            );
        }

        embeds.push(embed);
    }

    if (type == "history") {
        embed.setTitle(`Name history of ${fixDiscord(args.name)}`)
            .setColor(0xbebebe)
            .setURL(`https://laby.net/@${args.name}`)
            .setThumbnail(`https://laby.net/texture/profile/head/${args.uuid}.png?size=256&time=${time}`);

        for (var i = 0; i < Math.min(args.history.length, 25); i++) {
            embed.addFields(
                {
                    name: fixDiscord(args.history[i].username),
                    value: args.history[i].changed_at == null ? 
                        "-" : `<t:${new Date(args.history[i].changed_at).getTime() / 1000}>`,
                }
            );
        }

        embeds.push(embed);
        
        for (var i = 1; i < Math.ceil(args.history.length / 25); i++) {
            var embedPage = new EmbedBuilder()
                .setColor(0xbebebe)
                .setThumbnail(`https://laby.net/texture/profile/head/${args.uuid}.png?size=256&time=${time}`);

            for (var j = 25 * i; j < Math.min(args.history.length, 25 * i + 25); j++) {
                embedPage.addFields(
                    {
                        name: fixDiscord(args.history[j].username),
                        value: args.history[j].changed_at == null ? 
                            "-" : `<t:${new Date(args.history[j].changed_at).getTime() / 1000}>`,
                    }
                );
            }

            embeds.push(embedPage);
        }        

        embeds[embeds.length - 1].setTimestamp();
    }

    if (type == "nameFree") {
        embed.setTitle(fixDiscord(args.name))
            .setColor(0x06c258)
            .setURL(`https://laby.net/@${args.name}`)
            .setTimestamp()
            .setDescription(`**The Minecraft name '${fixDiscord(args.name)}' is free.**`);

        embeds.push(embed);
    }

    if (type == "nameAlreadyUsed") {
        embed.setTitle(fixDiscord(args.name))
            .setColor(0xff2c2c)
            .setURL(`https://laby.net/@${args.name}`)
            .setTimestamp()
            .setDescription(`**The Minecraft name '${fixDiscord(args.name)}' is already in use.**`);

        embeds.push(embed);
    }

    if (type == "nameInDelay") {
        embed.setTitle(fixDiscord(args.name))
            .setColor(0xff781f)
            .setURL(`https://laby.net/@${args.name}`)
            .setTimestamp()
            .addFields(
                {
                    name: `The Minecraft name '${fixDiscord(args.name)}' currently blocked.`,
                    value: `Available at <t:${args.date}> (<t:${args.date}:R>)`
                }
            );

        embeds.push(embed);
    }

    if (type == "noBadges") {
        embed.setTitle(`Badges of ${fixDiscord(args.name)}`)
            .setColor(0xff781f)
            .setURL(`https://laby.net/@${args.name}`)
            .setTimestamp()
            .setDescription(`**'${fixDiscord(args.name)}' does not have any badges.**`);

        embeds.push(embed);
    }

    if (type == "badge") {
        embed.setTitle(`Badges of ${fixDiscord(args.name)}`)
            .setColor(0xbebebe)
            .setURL(`https://laby.net/@${args.name}`)
            .setThumbnail(`https://laby.net/texture/badge-2x/${args.badges[0].uuid}.png`);

        embed.addFields(
            {
                name: fixDiscord(args.badges[0].name),
                value: args.badges[0].description
            }
        );

        embeds.push(embed);     

        for (var i = 1; i < args.badges.length; i++) {
            var embedPage = new Discord.MessageEmbed()
                .setColor(0xbebebe)
                .setThumbnail(`https://laby.net/texture/badge-2x/${args.badges[i].uuid}.png`);

            embedPage.addFields(
                {
                    name: fixDiscord(args.badges[i].name),
                    value: args.badges[i].description
                }
            );

            embeds.push(embedPage);
        }  

        embeds[embeds.length - 1].setTimestamp();
    }

    if (type == "skin") {
        embed.setTitle(`Skin of ${fixDiscord(args.name)}`)
            .setColor(0xbebebe)
            .setURL(`https://laby.net/@${args.name}`)
            .setTimestamp()
            .setImage(`https://laby.net/texture/profile/body/${args.uuid}.png?size=256&time=${time}`);

        embeds.push(embed);
    }

    return embeds;
}

function fixDiscord(message) {
    return message.replaceAll("_", "\\_");
}

module.exports = { createEmbed };