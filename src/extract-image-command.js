import { InteractionResponseType } from "discord-interactions";
import { createWorker } from 'tesseract.js';
// cannot use tesseract with cloudflare worker
import { textExtract } from './text-extract.js';
import { getItemImage } from './get-item-image.js';
import { DiscordRequest } from './util.js';

export async function extractImage(interaction, env) {
    console.log('extracting...');
    const worker = await createWorker('eng');
    console.log('worker created');
    // get stored channel id
    let thread_channel_id = await env.tlootbotkv.get(`guild_${guild_id}.thread_channel`);
    // use webhook to get channel object
    let endpoint = `channels/${thread_channel_id}`;
    let channel_obj = await DiscordRequest(endpoint, env, { method: 'GET' });
    console.log(channel_obj);
    const message = interaction.options.getMessage('message');
    console.log(message);
    const attachments = message.attachments;
    console.log(attachments);
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
        console.log(image_embed)

        let thread;
        if (channel_obj == null) {
            return { error: 'Channel not found. Please set a channel with /settings.'}, { status: 400 };
        } else if (!channel_obj.type === 15) {
            return { error: "Configured channel is not a forum channel." }, { status: 400 };
        }
        // else {
        //     // Create a thread with the extracted title and trait
        //     thread = await channel_obj.threads.create({
        //         name: extract_result.title,
        //         message: {
        //             content: 'Trait: ' + extract_result.trait
        //         }
        //     });
        //     // Add the image embed if it exists
        //     if (image_embed) {
        //         thread.message.embeds = [image_embed];
        //     }
        // }
        // new_threads.push(thread.url);
    };
    await worker.terminate();
    return {
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: new_threads.join('\n')
              }
            };
}