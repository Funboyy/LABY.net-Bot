const { REST } = require('@discordjs/rest');
const { Client, GatewayIntentBits, SlashCommandBuilder, Routes } = require("discord.js");
const { createEmbed } = require("./utils/embed");
const { searchName, nameHistory, checkStatus, badges, skin } = require("./utils/checks");
const settings = require("./settings.js");
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const rest = new REST({ version: '10' }).setToken(settings.token);

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data);
}

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(settings.clientId), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    client.user.setStatus("online");
    client.user.setActivity({ name: "/help | for help", type: 0 });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const { commandName } = interaction;

    if (commandName === 'help') {
        const embed = createEmbed("help", {});
        interaction.reply({ embeds: embed });

        return;
    }

    if (commandName === 'search') {
        const name = interaction.options.getString('name', true);

        searchName(name, function(name, results) {
            if (results == null) {
                const embed = createEmbed("notFound", { name });
                interaction.reply({ embeds: embed });

                return;
            }

            var embed = createEmbed("search", { name, results });
            interaction.reply({ embeds: embed });

            return;
        });
    }

    if (commandName === 'check') {
        const name = interaction.options.getString('name', true);

        if (name.length < 3 || name.length > 16) {
            const embed = createEmbed("invalidLength", { name });
            interaction.reply({ embeds: embed });

            return;
        }

        checkStatus(name, function(name, uuid, date) {
            if (date != null) {
                const embed = createEmbed("nameInDelay", { name, uuid, date });
                interaction.reply({ embeds: embed });

                return;
            }

            if (uuid != null) {
                const embed = createEmbed("nameAlreadyUsed", { name, uuid });
                interaction.reply({ embeds: embed });

                return;
            }

            const embed = createEmbed("nameFree", { name });
            interaction.reply({ embeds: embed });

            return;
        });
    }

    if (commandName === 'history') {
        const name = interaction.options.getString('name', true);

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            interaction.reply({ embeds: embed });

            return;
        }

        nameHistory(name, function(name, uuid, history) {
            if (uuid == null || history == null) {
                var embed = createEmbed("notFound", { name });
                interaction.reply({ embeds: embed });

                return;
            }

            var embed = createEmbed("history", { name, uuid, history });
            interaction.reply({ embeds: embed });

            return;
        });
    }

    if (commandName === 'badge') {
        const name = interaction.options.getString('name', true);

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            interaction.reply({ embeds: embed });

            return;
        }

        badges(name, function(name, uuid, badges) {
            if (uuid == null || badges == null) {
                var embed = createEmbed("notFound", { name });
                interaction.reply({ embeds: embed });

                return;
            }

            if (badges.length == 0) {
                var embed = createEmbed("noBadges", { name, uuid });
                interaction.reply({ embeds: embed });

                return;
            }

            var embed = createEmbed("badge", { name, uuid, badges });
            interaction.reply({ embeds: embed });

            return;
        });
    }

    if (commandName === 'skin') {
        const name = interaction.options.getString('name', true);

        if (name.length < 3 || name.length > 16) {
            var embed = createEmbed("invalidLength", { name });
            interaction.reply({ embeds: embed });

            return;
        }

        skin(name, function(name, uuid) {
            if (uuid == null) {
                var embed = createEmbed("notFound", { name });
                interaction.reply({ embeds: embed });

                return;
            }

            var embed = createEmbed("skin", { name, uuid });
            interaction.reply({ embeds: embed });

            return;
        });
    }

});

client.login(settings.token);