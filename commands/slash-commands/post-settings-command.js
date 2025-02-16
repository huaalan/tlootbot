const { 
    SlashCommandBuilder, 
    ChannelSelectMenuBuilder, 
    ActionRowBuilder, 
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Settings to configure which channels to post loot.')
        .addStringOption(option =>
			option.setName('channel_type')
				.setDescription('The gif category')
				.setRequired(true)
                .addChoices(
                    { name: 'Upload Channel', value: 'upload_channel' },
                    { name: 'Thread Channel', value: 'thread_channel' },
                )
    ),
	async execute(interaction) {
        const choice = interaction.options.getString('channel_type');
        const row = new ActionRowBuilder();
        let instr;

        if ( choice === 'upload_channel' ) {
            instr = 'Select channel where loot image is uploaded.';
            const select_upload_channel = new ChannelSelectMenuBuilder()
                .setCustomId('select_upload_channel')
                .setPlaceholder('Select upload channel for loot')
                .addChannelTypes('GuildText');
            row.addComponents(select_upload_channel);
        } else if ( choice === 'thread_channel' ) {
            instr = 'Select channel for the bot to post loot.';
            const select_thread_channel = new ChannelSelectMenuBuilder()
                .setCustomId('select_thread_channel')
                .setPlaceholder('Select channel to post loot')
                .addChannelTypes('GuildForum');
            row.addComponents(select_thread_channel);
        }

		await interaction.reply({
            content: instr,
            components: [row],
        });
	},
};