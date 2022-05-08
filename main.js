const Discord = require("discord.js");
const { createEmbed } = require("./utils/embed");
const { searchName, nameHistory, checkStatus, badges, skin } = require("./utils/checks");
const settings = require("./settings.js");

const BOT = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

BOT.on("ready", () => {
    BOT.user.setStatus("online");
    BOT.user.setActivity("-help | for help", { type: "PLAYING" });
});

BOT.on("messageCreate", (message) => {
    if (message.author.id == BOT.user.id) {
        return;
    }

    if (message.author.bot) {
        return;
    }

    if (message.channel.type != "GUILD_TEXT") {
        return;
    }

    if (!message.content.startsWith("-")) {
        return;
    }

    var command = message.content.substring(1).split(" ");

    if (command[0].toLowerCase() == "help") {
        var embed = createEmbed("help", {});
        message.channel.send({ embeds: embed });
    }

    if (command[0].toLowerCase() == "search") {
        var name = command[1];

        if (!name.match(/^[A-Za-z0-9_]+$/g)) {
            var embed = createEmbed("invalidName", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        searchName(name, function(name, results) {
            if (results == null) {
                var embed = createEmbed("notFound", { name });
                message.channel.send({ embeds: embed });

                return;
            }

            var embed = createEmbed("search", { name, results });
            message.channel.send({ embeds: embed });

            return;
        });
    }
    
    if (command[0].toLowerCase() == "history") {
        var name = command[1];

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        if (!name.match(/^[A-Za-z0-9_]+$/g)) {
            var embed = createEmbed("invalidName", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        nameHistory(name, function(name, uuid, history) {
            if (uuid == null || history == null) {
                var embed = createEmbed("notFound", { name });
                message.channel.send({ embeds: embed });

                return;
            }

            var embed = createEmbed("history", { name, uuid, history });
            message.channel.send({ embeds: embed });

            return;
        });
    }

    if (command[0].toLowerCase() == "check") {
        var name = command[1];

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        if (!name.match(/^[A-Za-z0-9_]+$/g)) {
            var embed = createEmbed("invalidName", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        checkStatus(name, function(name, uuid, date) {
            if (date != null) {
                var embed = createEmbed("nameInDelay", { name, uuid, date });
                message.channel.send({ embeds: embed });

                return;
            }

            if (uuid != null) {
                var embed = createEmbed("nameAlreadyUsed", { name, uuid });
                message.channel.send({ embeds: embed });

                return;
            }

            var embed = createEmbed("nameFree", { name });
            message.channel.send({ embeds: embed });

            return;
        });
    }

    if (command[0].toLowerCase() == "badge") {
        var name = command[1];

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        if (!name.match(/^[A-Za-z0-9_]+$/g)) {
            var embed = createEmbed("invalidName", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        badges(name, function(name, uuid, badges) {
            if (uuid == null || badges == null) {
                var embed = createEmbed("notFound", { name });
                message.channel.send({ embeds: embed });

                return;
            }

            if (badges.length == 0) {
                var embed = createEmbed("noBadges", { name, uuid });
                message.channel.send({ embeds: embed });

                return;
            }

            var embed = createEmbed("badge", { name, uuid, badges });
            message.channel.send({ embeds: embed });

            return;
        });
    }

    if (command[0].toLowerCase() == "skin") {
        var name = command[1];

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        if (!name.match(/^[A-Za-z0-9_]+$/g)) {
            var embed = createEmbed("invalidName", { name });
            message.channel.send({ embeds: embed });
            return;
        }

        skin(name, function(name, uuid) {
            if (uuid == null) {
                var embed = createEmbed("notFound", { name });
                message.channel.send({ embeds: embed });

                return;
            }

            var embed = createEmbed("skin", { name, uuid });
            message.channel.send({ embeds: embed });

            return;
        });
    }
});

BOT.login(settings.token);