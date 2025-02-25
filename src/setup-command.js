import { MessageComponentTypes } from "discord-interactions";

export async function setup() {
  return {
    content: "Select channel for the bot to post loot.",
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.CHANNEL_SELECT,
            custom_id: "select_thread_channel",
            placeholder: "Select channel to post loot",
            channel_types: [15], // GUILD_FORUM
          },
        ],
      },
    ],
  };
}
