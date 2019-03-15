const Commando = require('discord.js-commando');
const discord = require('discord.js');
const TOKEN = 'NDYxODk4NTUxMTM2NDg1Mzg4.D2XYnQ.oXDll9z-4gfHiOkGQmPGxeFRP3Y'
const bot = new Commando.Client({
    commandPrefix: 'p!'    
});

bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('music', 'Music')
bot.registry.registerGroup('admin', 'Admin')
bot.registry.registerGroup('everyone', 'Everyone')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

bot.on('message', function(message){
    if(message.content == 'Ping!')
    {
        message.channel.sendMessage('Pong, nice game..');
    }
});
    
bot.on('ready',function(){
     console.log("Bot Online");
     bot.user.setActivity('p!help | p!setup', { type: 'PLAYING' })
});

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find(channel => channel.name === 'welcome-goodbye')
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find(channel => channel.name === 'welcome-goodbye')
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', ';(')
        .addField('Bye Bye :(', 'We will all miss you!')
        .addField('The server now has', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.login(TOKEN)
