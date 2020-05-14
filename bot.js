const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
//    Add emoji name
var emojiname = ["",""];

//    Add role name
var rolename=["",""];


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});



client.on('message', msg => {

if(msg.content.startsWith(prefix+"reaction")){
  if(!msg.channel.guild) return;
  for(let n in emojiname){
  var emoji =[msg.guild.emojis.find(r => r.name == emojiname[n])];
  for(let i in emoji){
   msg.react(emoji[i]);
  }
 }
}
});



client.on("messageReactionAdd",(reaction,user)=>{
  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;
  for(let n in emojiname){
  if(reaction.emoji.name == emojiname[n]){
    let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);          
    reaction.message.guild.member(user).addRole(role).catch(console.error);
  }
}
});


client.on("messageReactionRemove",(reaction,user)=>{
  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;
  for(let n in emojiname){
  if(reaction.emoji.name == emojiname[n]){
    let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);   
    reaction.message.guild.member(user).removeRole(role).catch(console.error);
  }
  }
});


client.login(process.env.TOKEN);
