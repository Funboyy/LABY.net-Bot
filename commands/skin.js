const { SlashCommandBuilder } = require('discord.js');

const data = 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skin')
		.setDescription('Shows the current skin of a user.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the user you want to see the skin.')
                .setRequired(true))
};
