require('dotenv').config();
const { 
    ContextMenuCommandBuilder, 
    ApplicationCommandType,
    Client,
    GatewayIntentBits,
    MessageFlags,
} = require('discord.js');
const { createWorker } = require('tesseract.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { textExtract } = require('./../../text-extract.js');
const { getItemImage } = require('./../../get-item-image.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.login(process.env.DISCORD_TOKEN);

module.exports = { 
    data: new ContextMenuCommandBuilder()
        .setName('extract-image')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const worker = await createWorker('eng');
        const thread_channel_id = await db.get(`guild_${interaction.guild.id}.thread_channel`);
        const message = interaction.options.getMessage('message');
        const attachments = message.attachments;
        let img_url;
        let new_threads = [];
        for (const a of attachments) {
            // get the image to be processed using tessaract
            img_url = a[1].proxyURL;
            let ret = await worker.recognize(img_url);

            // Convert the text into an array of text lines
            // so we can extract the title and trait
            let text_lines = ret.data.text.split("\n");
            
            let extract_result = textExtract(text_lines);
            console.log('Title: ' + extract_result.title + ' Trait: ' + extract_result.trait);
            let image_embed = getItemImage(extract_result.title);

            let channel = await client.channels.fetch(thread_channel_id);
            let thread;
            if (channel === null) {
                await interaction.reply({ content: 'Channel not found. Please set a channel with /settings.', flags: MessageFlags.Ephemeral });
                return;
            } else if (!channel.type === 15) {
                await interaction.reply({ content: 'Set channel is not a forum channel.', flags: MessageFlags.Ephemeral });
                return;
            } else {
                // Create a thread with the extracted title and trait
                thread = await channel.threads.create({
                    name: extract_result.title,
                    message: {
                        content: 'Trait: ' + extract_result.trait
                    }
                });
                // Add the image embed if it exists
                if (image_embed) {
                    thread.message.embeds = [image_embed];
                }
            }
            new_threads.push(thread.url);
        };
        await worker.terminate();
        await interaction.reply({ content: new_threads.join('\n')});
    },
};