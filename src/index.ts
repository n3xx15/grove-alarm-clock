import { Client, GuildMemberRoleManager } from "discord.js";
import * as config from "./config/config.json";
import { commands } from "./commands/index";
import { deployCommands } from "./commands/deployCommands";

const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    "GuildMembers",
    "GuildPresences",
  ],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const senderRoles = interaction.member?.roles as GuildMemberRoleManager;
  if (!senderRoles.cache.has("1187573794391470253")) {
    interaction.reply({
      content: "You are not allowed to interact with me!",
      ephemeral: true,
    });
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.token);
