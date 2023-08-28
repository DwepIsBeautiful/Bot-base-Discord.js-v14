import { readdirSync } from "fs";

class CommandLoader {
  constructor(client) {
    this.client = client;
  }

  async loadCommands() {
    const commands = [];

    const categories = readdirSync("src/commands", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const category of categories) {
      const commandFiles = readdirSync(`src/commands/${category}`).filter(
        (file) => file.endsWith(".js")
      );

      for (const commandFile of commandFiles) {
        const command = await import(`../commands/${category}/${commandFile}`);
        const commandHandle = command.default;

        if (!commandHandle || !commandHandle.execute || !commandHandle.data) {
          console.warn(
            `[WARNING] The command at ${commandFile} is missing a required "data" or "execute" property.`
          );
          continue;
        }

        this.client.commands.set(commandHandle.data.name, commandHandle);
        commands.push(commandHandle.data.toJSON());
      }
    }

    await this.client.application?.commands.set(commands);
    console.log("Commands Loaded ✔");
  }
}

class EventLoader {
  constructor(client) {
    this.client = client;
  }

  async loadEvents() {
    const categories = readdirSync("src/events", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const category of categories) {
      const files = readdirSync(`src/events/${category}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of files) {
        const event = await import(`../events/${category}/${file}`);
        const handler = event.default || event;

        if (handler.once) {
          this.client.once(handler.name, (...args) =>
            handler.execute(...args, this.client)
          );
        } else {
          this.client.on(handler.name, (...args) =>
            handler.execute(...args, this.client)
          );
        }
      }
    }

    console.log("Events Loaded ✔");
  }
}

export { CommandLoader, EventLoader };
