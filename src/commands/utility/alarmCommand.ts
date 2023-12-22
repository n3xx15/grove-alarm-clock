import {
  CommandInteraction,
  SlashCommandBuilder,
  GuildMemberRoleManager,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("alarm")
  .setDescription("Lässt den Wecker klingeln!!");

export async function execute(interaction: CommandInteraction) {
  if (!interaction.inCachedGuild) {
    throw new Error("not in Guild");
  }

  const roles = interaction.member?.roles as GuildMemberRoleManager;
  const members = interaction.guild?.members.cache;
  if (roles.cache.has("1187044777871540274")) {
    members?.forEach((member) => {
      if (member.user.bot || member.user == interaction.user) {
        return;
      }
      member.send("Es ist Kriiieg!! Zeit zum aufstehen!!");
    });
    interaction.reply({
      content: "Done!",
      ephemeral: true,
    });
  }
}
