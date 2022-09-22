const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('badge')
		.setDescription('Shows all badges a user has.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the user you want to see their badges.')
                .setRequired(true))
};
