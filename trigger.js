const Discord = require('discord.js');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static("dist"));
var port = 80;
/*app.listen(port, function() {
    console.log("listening on port "+ port);
});*/

//FUNCTIONS
function callback(err) {if (err) throw err;};
function isServer(msg, servername) { if (msg.channel.server && msg.channel.server.name === servername) return true; };
//ADOBOT!!!
const nbot = new Discord.Client();
nbot.login("astabile.design+dc@gmail.com", "thecakeisalie", callback);
nbot.on("ready", function(){ console.log("nbot live..."); });//end ready
nbot.on("message", function(msg) {
  //GLOBAL LIST
    var list = [];
    list.push('available commands: ?help');
    list.push("user information: !user Username");
    list.push("users in game: !game Gamename");
    list.push("link: :like a bullet train");
    list.push("link: :worm");
    list.push("image: /facepalm");
    list.push("image: /could you not");
    list.push("image: /tiny violin");
    list.push("image: /I don't need it");
    list.push("image: /got em");
    list.push("emoji: /sex");
    list.push("emoji: /whale");
    list.push("emoji: /octopus");
    list.push("emoji: /firetruck");
    list.push("emoji: /zombie");
  //EMILY LIST
  if (msg.author.username === "Spazcat" || msg.author.username === "Adoroam") {
    if (msg.author.username == "Spazcat") list.push("*Spazcat Only*");
    if (msg.author.username == "Adoroam") list.push("*Spazcat Emotes*");
    list.push('spaz: /angry');
    list.push('spaz: /cool');
    list.push('spaz: /cry');
    list.push('spaz: /happy');
    list.push('spaz: /love');
    list.push('spaz: /meh');
    list.push('spaz: /omg');
    list.push('spaz: /sigh');
    list.push('spaz: /sparkle');
    list.push('spaz: /teeth');
    list.push('spaz: /tongue');
    list.push('spaz: /wth');
  };

  //PERSONAL SWITCH
  if (msg.author.username == "Adoroam") {
    switch(msg.content){
      case 'test': sound(msg, "not relevant yet"); break;
         default:
      //
    };
  };
  //EMILY SWITCH
  if (msg.author.username == "Spazcat" || msg.author.username == "Adoroam") {
    switch(msg.content) {
      case '/angry': picture(msg, 'spazcat/angry.png'); break;
      case '/cool': picture(msg, 'spazcat/cool.png'); break;
      case '/cry': picture(msg, 'spazcat/cry.png'); break;
      case '/happy': picture(msg, 'spazcat/happy.png'); break;
      case '/love': picture(msg, 'spazcat/love.png'); break;
      case '/meh': picture(msg, 'spazcat/meh.png'); break;
      case '/omg': picture(msg, 'spazcat/omg.png'); break;
      case '/sigh': picture(msg, 'spazcat/sigh.png'); break;
      case '/sparkle': picture(msg, 'spazcat/sparkle.png'); break;
      case '/teeth': picture(msg, 'spazcat/teeth.png'); break;
      case '/tongue': picture(msg, 'spazcat/tongue.png'); break;
      case '/wth': picture(msg, 'spazcat/wth.png'); break;
      default:
      //
    };
  };
  //GLOBAL SWITCH
  switch(msg.content) {
    case "?help":
      nbot.deleteMessage(msg, callback);
      nbot.reply(msg, help(list), callback);
    break;
    case ":worm": simple(msg, "http://www.staggeringbeauty.com/"); break;
    case ":like a bullet train": simple(msg, "https://www.youtube.com/watch?v=gkime9M4z34"); break;
    //EMOTES
    case '/sex': simple(msg, "👉👌"); break;
    case '/whale': simple(msg, "🐳"); break;
    case '/octopus': simple(msg, "🐙"); break;
    case '/firetruck': simple(msg, "🚒"); break;
    case '/zombie': simple(msg, "(f-_-)f"); break;
    //IMAGES
    case '/facepalm': picture(msg, 'facepalm.jpg'); break;
    case '/could you not': picture(msg, 'could you not.jpg'); break;
    case '/tiny violin': picture(msg, 'tiny violin.jpg'); break;
    case "/I don't need it": picture(msg, "I don't need it.jpg"); break;
    case "/got em": picture(msg, "got 'em.jpg"); break;
    //SOUNDS
    case '!CENA': sound(msg, 'CENA'); break;
    case '!bdt': sound(msg, 'bdt'); break;
    case '!party': sound(msg, 'party'); break;
    case '!yay': sound(msg, 'yay'); break;
    case '!moan': sound(msg, 'moan'); break;
    case '!ww': sound(msg, 'wompwomp'); break;
    default:
      //USER
      if (msg.content.indexOf('!user ') === 0) user(msg);
      //Auto Accept Invites
      if (msg.content.indexOf("https://discord.gg/") === 0) autojoin(msg);
      //GAME
      if (msg.content.indexOf('!game ') === 0) game(msg);
  };

});//MESSAGES

/* ----- NEW MEMBER ----- */
nbot.on("serverNewMember", function(servObj, userObj){
  switch(servObj.name) {
    case "The Cat Cave":
      var str = "<@"+userObj.id+"> Welcome to The Cat Cave. This server it rated XXXX. All links are potentially NSFW!";
      var General = servObj.channels.get("name", "general");
      nbot.sendMessage(General, str, callback);
    break;
    case "ArchCombat":
      var str = "<@"+userObj.id+"> Welcome to ArchCombat. Please visit #welcome for more information.";
      var General = servObj.channels.get("name", "general");
      nbot.sendMessage(General, str, callback);
    break;
    default:
    //
  };
});

/* ----- VOICE JOIN ----- */
//first run
nbot.on("voiceStateUpdate", function(chanObj, userObj){
  var str = userObj.username +" joined voice channel " + chanObj.name;
  console.log(str);
});//end nbot voiceStateUpdate
//second+ run
nbot.on("voiceJoin", function(chanObj, userObj){
  var str = userObj.username +" joined voice channel " + chanObj.name;
  console.log(str);
});//end nbot voiceJoin*/



//FUNCTIONS
//!user
function user(msg) {
  var query = msg.content.slice(6, msg.content.length);
  var user = nbot.internal.users.get('username', query);
  function userGameVoice() {
    if (user.game) nbot.sendMessage(msg.channel, "game: "+user.game.name, callback);
    if (user.voiceChannel.name) nbot.sendMessage(msg.channel, "voice channel: "+user.voiceChannel.server.name+" - "+user.voiceChannel.name, callback);
  };
  function userStatus(){ nbot.sendMessage(msg.channel, "status: "+user.status, userGameVoice); };
  function userAvatar(){ nbot.sendFile(msg.channel, user.avatarURL, userStatus); };
  if (user) {
    if (user.avatarURL) {
      userAvatar();
    } else { userStatus(); };
  };
};
//?help
function help(list) {
  var str = '```\n';
  list.forEach(function(item){ str += item+'\n'; });
  str+="```"; return str;
};
//autojoin
function autojoin(msg) {
  nbot.joinServer(msg.content, function(err, server) {
    console.log("joined server: "+server.name);
  });
};
//picture
function picture(msg, image) {
  nbot.deleteMessage(msg, callback);
  nbot.sendFile(msg.channel, 'files/'+image, function(err){
    nbot.sendMessage(msg.channel, msg.author.username, callback);
  });
};
function simple(msg, str) {
  nbot.deleteMessage(msg, callback);
  nbot.sendMessage(msg.channel, str, callback);
};
function sound(msg, sound) {
  var query = msg.author.username;
  var user = nbot.internal.users.get('username', query);
  nbot.deleteMessage(msg, callback);
  if (msg.author.voiceChannel && msg.author.voiceChannel.id) {
    var Voice = msg.author.voiceChannel;
    nbot.joinVoiceChannel(Voice, function(err, con){
      con.playFile("files/"+sound+".mp3", {volume: 0.5}, function(err, intent){
        intent.on("end", function(err){ nbot.leaveVoiceChannel(); });
      });
    });
  };
};

function game(msg) {
  var Query = msg.content.slice(6, msg.content.length);
  var query = Query.toLowerCase();
  var userlist = nbot.users;
  var gamelist = [];
  var ugames = [];
  userlist.forEach(function(ul){
    if (ul.game && gamelist.indexOf(ul.game.name) === -1) gamelist.push(ul.game.name);
  });
  gamelist.forEach(function(gl){
      var gusers = []
      userlist.forEach(function(ul){
        if (ul.game && ul.game.name === gl && ul.game.name != "") gusers.push(ul.username);
      });
      var gObj = {game: gl, users: gusers};
      ugames.push(gObj);
  });
  ugames.sort();
  if (query === "all") {
    ugames.forEach(function(item, index){
      var str = '```\n';
      str += 'Game: '+ item.game +'\n';
      if (item.users.length > 1) {
        str += 'Users: ';
      } else {str += 'User: ';};
      item.users.forEach(function(usr, index){
        if (index == item.users.length -1) {
          str += usr +'\n';
        } else {  str += usr + ', '}
      });
      str+="```";
      nbot.sendMessage(msg.channel, str, callback);
    });
  } else {
    var filtered = ugames.filter(function(arg){

      return arg.game.toLowerCase() == query;
    });
    query = filtered[0];
    if (query && query.game) {
      var str = "```\nPlaying "+query.game+":\n";
      query.users.forEach(function(usr){
        str += '> '+ usr +'\n';
      });
      str += "```";
      nbot.sendMessage(msg.channel, str, callback);
    };
  };
};

var playlist = [];


/* IRC
var irc = require("irc");
var config = {
  channels: ["#adoroam", '#animatedbreak'],
  server: "irc.twitch.tv",
};
var adoirc = new irc.Client(config.server, "Adoroam", {
  channels: config.channels,
  userName: 'Adoroam',
  password: "oauth:ju2icc0zyemycar155bs4m9ks33f3t"
});
adoirc.addListener("message", function(from, to, text, message) {
  if (message.args[1] === "!playlist") {
    playlist.forEach(function(item){
      var str = item.user + " - " + item.link;
      adoirc.say(config.channels[0], str);
    });
  };
  if (message.args[1].indexOf("!addsong ") === 0 ){
    var query = message.args[1].slice(9, message.args[1].length);
    playlist.push({user:from, link: query});
  };
});
adoirc.addListener("raw", function(message){
  //console.log(message.args);
});
*/
