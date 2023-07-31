const { EmbedBuilder } = require('discord.js');

client.on('guildMemberAdd', (member) => {
  message.channel.send(`${message.member} welccy.`);
  const channel = member.guild.channels.cache.find(ch => ch.name === 'hh'); //change 'welcome' to the name of your welcome channel 
  if (!channel) return;
  const embed = new EmbedBuilder()
  .setTitle('welcome')
    .setDescription(`Welcome ${member.user.username} to the server! We hope you enjoy your stay with us.`)
    .setTimestamp() 
    .setFooter('Sleepy Corner');
    message.channel.send({ embeds: [embed] });
}); 
