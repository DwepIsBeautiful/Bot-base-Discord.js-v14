import { Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`The bot ${client.user.tag} is online!`);
  },
};
