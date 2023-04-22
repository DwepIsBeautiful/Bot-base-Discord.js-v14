import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick user command.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to kick")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const guildMember = interaction.guild.members.cache.get(user.id);

    await guildMember
      .kick()
      .then(() => {
        interaction.reply(`The user ${user} is been kicked from server.`);
      })
      .catch((err) => {
        interaction.reply({
          content: `Fail to kick user, reason: ${err}`,
          ephemeral: true,
        });
      });
  },
};
