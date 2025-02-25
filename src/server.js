/**
 * The core server that runs on a Cloudflare worker.
 */

import { AutoRouter } from "itty-router";
import { 
  InteractionResponseType, 
  InteractionResponseFlags,
  InteractionType,
} from "discord-interactions";

import { setup } from "./setup-command.js";
import { extractImage } from "./extract-image-command.js";
import { verifyDiscordRequest } from "./util.js";

class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    super(jsonBody, init);
  }
}

const router = AutoRouter();

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get("/", (request, env) => {
  return new Response(`👋 ${env.APP_ID}`);
});

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post("/", async (request, env) => {

  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env
  );

  if (!isValid || !interaction) {
    return new Response("Bad request signature.", { status: 401 });
  }

  const guild_id = interaction.guild_id;

  if (interaction.type === InteractionType.PING) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    // Most user commands will come as `APPLICATION_COMMAND`.
    switch (interaction.data.name.toLowerCase()) {
      case "setup": {
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: await setup()
        });
      }
      case "extract-image": {
        console.log('extract-image')
        let extract_threads = await extractImage(interaction, env);
        console.log(extract_threads);
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "extract to ",
            flags: InteractionResponseFlags.EPHEMERAL,
          },
        });
      }
      default:
        return new JsonResponse({ error: "Unknown Command" }, { status: 400 });
    }
  }

  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    // Component interactions are recieved here
    let component_id = interaction.data.custom_id;

    switch (component_id) {
      case "select_thread_channel": {
        // get selected channel
        let channel_id = interaction.data.values[0];
        // store channel in kv
        await env.tlootbotkv.put(`guild_${guild_id}.thread_channel`, channel_id);
        return new JsonResponse({
          type: InteractionResponseType.UPDATE_MESSAGE,
          data: {
            content: "Channel setting saved.",
            components: [],
          },
        });
      }
      default:
        return new JsonResponse({ error: "Unknown Selection" }, { status: 400 });
    }
    
  }

  console.error("Unknown Interaction Type");
  return new JsonResponse({ error: "Unknown Interaction Type" }, { status: 400 });
});

router.all("*", () => new Response("Not Found.", { status: 404 }));

const server = {
  verifyDiscordRequest,
  fetch: router.fetch,
};

export default server;