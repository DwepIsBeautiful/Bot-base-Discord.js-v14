import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban user command.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("reason from ban")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    const guildMember = interaction.guild.members.cache.get(user.id);

    !reason
      ? (reason = `This user has been banned by ${interaction.member.user.tag} Without a reason.`)
      : (reason = `This user has been banned by ${interaction.member.user.tag} for the reason: ${reason}.`);

    await guildMember
      .ban({
        days: 7, // delete messages from last 7 days
        reason: reason,
      })
      .then(() => {
        interaction.reply({
          content: `The user ${user} is banned!`,
          ephemeral: true,
        });
      })
      .catch((err) => {
        interaction.reply({
          content: `fail to ban user, reason: ${err},`,
          ephemeral: true,
        });
      });
  },
};
