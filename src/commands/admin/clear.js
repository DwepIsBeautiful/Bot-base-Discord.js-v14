import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("this command clear chat message")
    .addIntegerOption((options) =>
      options
        .setName("amount")
        .setDescription("enter the amount of message to be deleted.")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const messageAmount = interaction.options.getInteger("amount");

    const messageFetch = await interaction.channel.messages.fetch({
      limit: messageAmount,
    });

    await interaction.channel
      .bulkDelete(messageFetch, true)
      .then((msg) => {
        interaction.reply({
          content: `A total of ${msg.size} messages were deleted from this channel! 😘`,
          ephemeral: true,
        });
      })
      .catch(() => {
        interaction.channel.send({
          content: `There was an error deleting the messages, maybe they are too old or need permission 😢`,
          ephemeral: true,
        });
      });
  },
};
