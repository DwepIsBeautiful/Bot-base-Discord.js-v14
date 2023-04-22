import { readdirSync } from "fs";

export default async function loaderEvents(client) {
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
        client.once(handler.name, (...args) =>
          handler.execute(...args, client)
        );
      } else {
        client.on(handler.name, (...args) => handler.execute(...args, client));
      }
    }
  }

  console.log("Events Loaded ✔");
}
