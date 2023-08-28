import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { DatabaseConnection } from "./src/database/index.js";
import { CommandLoader, EventLoader } from "./src/structs/index.js";

class Bot extends Client {
  constructor() {
    super({
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

    this.commands = new Collection();
    this.commandLoader = new CommandLoader(this);
    this.eventLoader = new EventLoader(this);

    this.databaseConnection = new DatabaseConnection(
      process.env.DATABASE_URL,
      process.env.DATABASE_NAME
    );
  }

  async start() {
    try {
      await this.login(process.env.TOKEN);
      await this.databaseConnection.connect();

      this.commandLoader.loadCommands();
      this.eventLoader.loadEvents();
    } catch (error) {
      console.error("Error starting the bot:", error);
    }
  }
}

new Bot().start();
