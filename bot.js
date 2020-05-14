const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = '!';
var message = 'ping'

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', msg => {
    if (msg.content === (prefix + message)) {
      msg.reply('Pong!');
    }
  });

client.login(process.env.TOKEN);
