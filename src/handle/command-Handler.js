import { readdirSync } from "fs";

export default async function loaderSlashCommands(client) {
  await client.commands.clear();

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

      client.commands.set(commandHandle.data.name, commandHandle);
      commands.push(commandHandle.data.toJSON());
    }
  }

  await client.application?.commands.set(commands);
  console.log("Commands Loaded ✔");
}
