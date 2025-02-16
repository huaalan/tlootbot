const { 
    SlashCommandBuilder, 
    ChannelSelectMenuBuilder, 
    ActionRowBuilder, 
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Settings to configure which channels to post loot.'),
	async execute(interaction) {
        const row = new ActionRowBuilder();
        let instr = 'Select channel for the bot to post loot.';
        const select_thread_channel = new ChannelSelectMenuBuilder()
            .setCustomId('select_thread_channel')
            .setPlaceholder('Select channel to post loot')
            .addChannelTypes('GuildForum');
        row.addComponents(select_thread_channel);

		await interaction.reply({
            content: instr,
            components: [row],
        });
	},
};