const { Events, MessageFlags, ComponentType } = require('discord.js');
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChannelSelectMenu()) return;

        const guild_id = interaction.guild.id;

        if (interaction.customId === 'select_upload_channel') {
            await db.set(`guild_${guild_id}.upload_channel`, interaction.values[0])
            .then(() => {
                interaction.reply({ content: 'Channel saved.', flags: MessageFlags.Ephemeral });
            })
            .catch((err) => {
                console.error(err);
                interaction.reply({ content: 'An error occurred.', flags: MessageFlags.Ephemeral });
            });
        } else if (interaction.customId === 'select_thread_channel') {
            await db.set(`guild_${guild_id}.thread_channel`, interaction.values[0])
            .then(() => {
                interaction.reply({ content: 'Channel saved.', flags: MessageFlags.Ephemeral });
            })
            .catch((err) => {
                console.error(err);
                interaction.reply({ content: 'An error occurred.', flags: MessageFlags.Ephemeral });
            });
        }
    },
};