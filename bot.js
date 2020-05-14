const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "c!";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});



bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
      let prefix = config.prefix;
      if (!message.content.startsWith(config.prefix)) return;
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(prefix.length));
      if(commandfile) commandfile.run(bot,message,args);
      
      if (message.author.id == config.authorid && message.content.toLowerCase() == ">reaction"){
          var toSend = generateMessages();
          let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
          for (let mapObj of mappedArray){
              message.channel.send(mapObj[0]).then( sent => {
                  if (mapObj[1]){
                    sent.react(mapObj[1]);  
                  } 
              });
          }
      }
      
  });
  
  let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
  const reactions = ["✅"];
  
  //Function to generate the role messages, based on your settings
  function generateMessages(){
      var messages = [];
      messages.push(initialMessage);
      messages.push(`Clic here !`); //DONT CHANGE THIS
      return messages;
  }
  
  bot.on('raw', event => {
      if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
          
          let channel = bot.channels.get(event.d.channel_id);
          let message = channel.fetchMessage(event.d.message_id).then(msg=> {
          let user = msg.guild.members.get(event.d.user_id);
          
              if (msg.author.id == bot.user.id && msg.content != initialMessage){
              
                  if (user.id != bot.user.id){
                      var memberObj = msg.guild.members.get(user.id);
                      let role = message.guild.roles.get("526353894973112333");
                      
                      if (event.t === "MESSAGE_REACTION_ADD"){
                          memberObj.addRole(role).catch(console.error);
                      } else {
                          memberObj.removeRole(role).catch(console.error);
                      }
                  }
              }
          })
   
      }   
  });


client.login(process.env.TOKEN);
