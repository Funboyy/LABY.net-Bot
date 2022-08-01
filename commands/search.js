const { SlashCommandBuilder } = require('discord.js');

const data = 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Searches for a user by his name.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name you want to search.') 
                .setRequired(true))
};
