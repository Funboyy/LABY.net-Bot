const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Checks the status of a name.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name you want to check.')
                .setRequired(true))
};
