import { SlashCommandBuilder, ChannelType } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("say any message")
    .addStringOption((options) =>
      options
        .setName("msg")
        .setDescription("input the message")
        .setRequired(true)
    )
    .addChannelOption((options) =>
      options
        .setName("channel")
        .addChannelTypes(ChannelType.GuildText)
        .setDescription("Channel to send message")
        .setRequired(true)
    ),

  async execute(interaction) {
    const msg = interaction.options.getString("msg");
    const channel = interaction.options.getChannel("channel");

    try {
      await channel.send(msg);
      await interaction.reply({
        content: `Message sent with success for channel **${channel.name}**`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error ${error} sending your message.`
      );
    }
  },
};
