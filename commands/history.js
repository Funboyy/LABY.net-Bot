const { SlashCommandBuilder } = require('discord.js');

const data = 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('history')
		.setDescription('Shows the name history of a user by his name.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the user you want to see the name history.')
                .setRequired(true))
};
