// Import the Client. 
const client = require("../index");

// Listen for t he guildMemberRemove or user leave event.
client.on("guildMemberRemove", (member) => {
       // Check if the guild of the member who joined is our guild.
       if (MemberGuild.guild.id === "1096452970020880495")  {
        const guild = client.guilds.cache.get("1096452970020880495");
        const leaveChannel = guild.channel.cache.get("1096452975309901917");

        // From now you can use <welcomeChannel>.send to send any message you want, it can also have embeds, button etc.
        // I will use normal.
        leaveChannel.send(`GoodBye, ${member}... :sob:`);
    }
});
// Checks if a member has left, and sends a goodbye message
client.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels.cache.get(process.env.GOODBYE_CHANNEL_ID);

    if (channel) message.send(`Goodbye <@${member.user.id}>!`);
});