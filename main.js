import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { connectToDatabase } from "./src/database/index.js";
import loaderEvents from "./src/handle/event-Handler.js";
import loaderSlashCommands from "./src/handle/command-Handler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildModeration,
  ],
});

//db
connectToDatabase();

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
  loaderSlashCommands(client);
  loaderEvents(client);
});
