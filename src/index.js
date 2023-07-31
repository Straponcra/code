require('dotenv').config();
const path = require('path');
const { Client, IntentsBitField, GatewayIntentBits, ActivityType, Interaction, ActionRowBuilder, EmbedBuilder, MessageManager, ActionRow } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const express = require('express');
const Discord = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const server = express();
server.all('/', (req, res) => {
    res.send('Bot is running!');
});
function keepAlive(){
    server.listen(3000,
        ()=>{console.log("Server is Ready!")});
}


const client = new Client( {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.Guilds
    ]
});




const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

client.on('guildMemberAdd', member => {
  const embed = new EmbedBuilder()
    .setTitle('Welcome')
    .setDescription(`Welcome ${member.guild.name} to the server! We hope you enjoy your stay with us.`)
    .setTimestamp()
    .setFooter('Sleepy Corner');
    
const channel = member.guild.channels.cache.get('1125089180477837482'); // Replace 'channel-id' with the ID of your welcome channel
  if (channel) {
  channel.send({ embeds: [embed] });
    }
});

const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;
  if (message.content.startsWith('@! Sleepsie♡#4889')) return;

  let conversationLog = [
    { role: 'system', content: 'You are a friendly chatbot.' },
  ];

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    
    prevMessages.forEach((msg) => {
      if (msg.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: "\n\nHello there, how may I assist you today? <a:stitch_kiss:1131208279591227413>",
          name: msg.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }

      if (msg.author.id == message.author.id) {
        conversationLog.push({
          role: 'user',
          content: msg.content,
          name: message.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        // max_tokens: 256, // limit token usage
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });
    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});


client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);
  } catch (error) {
    console.log(error);
  }
});


 

let status = [
    {
      name: 'Sleepy Corner',
      type: ActivityType.Streaming,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  
  ];

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB.')
        eventHandler(client);
        client.login(process.env.TOKEN)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
      }, 10000);

})();