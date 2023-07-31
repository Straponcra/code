require('dotenv').config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: '',
    label: 'Verify',
  }
  
];

client.on('ready', async (c) => {
  try {
    const channel = await client.channels.cache.get('1049345076188422226');
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: 'Claim or remove a role below.',
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});



client.login(process.env.TOKEN);

const { Client, IntentsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');



client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('test')
      .setDescription('hotmoms')
      .setColor('Random')
      .addFields(
        {
          name: 'mommy',
          value: 'ma',
          inline: true,
        },
        {
          name: 'mommy',
          value: 'ma',
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('Test')
      .setDescription('You will , \njump up')
      .setColor('Random')
      .addFields(
        {
          name: 'hoe',
          value: 'bad bot',
          inline: true,
        },
        {
          name: 'ma',
          value: 'bitch',
          inline: true,
        }
      );
      

    message.channel.send({ embeds: [embed] });
    
  } 
  
});