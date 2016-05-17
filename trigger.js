const Discord = require('discord.js');
const fs = require('fs');
const dcf = require('./lib/dcf.js');
const AR = require('./lib/AR.js');


//FUNCTIONS
function callback(err) {if (err) throw err;};
function isServer(msg, servername) { if (msg.channel.server && msg.channel.server.name === servername) return true; };

//DISCORD BOT!!!
const trig = new Discord.Client(); // defines bot
trig.login("astabile.design+harpbot@gmail.com", "adobot", callback); // logs bot in
trig.on("ready", function(){ console.log("trig live..."); }); // bot's ready status
trig.on("message", function(msg) {

  // builds list of commands from external arrays in AR.js
  var list = []; // blank array
  AR.main.forEach(function(item) {list.push(item);}); // adds global array items
  if (msg.author.username === "Spazcat" || msg.author.id === '93606599888740352') AR.spaz.forEach(function(item) {list.push(item);}); // adds spazcat emotes conditionally

  // MESSAGE SWITCH
  // =================
  switch(msg.content) {
    // COMMAND LIST
    case '!help': dcf.reply(trig, msg, dcf.help(list)); break;
    // LINKS
    case '!worm': dcf.simple(trig, msg, 'http://www.staggeringbeauty.com/'); break;
    case '!like a bullet train': dcf.simple(trig, msg, 'https://www.youtube.com/watch?v=gkime9M4z34'); break;
    // EMOTES
    case '!sex': dcf.simple(trig, msg, "👉👌"); break;
    case '!whale': dcf.simple(trig, msg, "🐳"); break;
    case '!octopus': dcf.simple(trig, msg, "🐙"); break;
    case '!firetruck': dcf.simple(trig, msg, "🚒"); break;
    case '!zombie': dcf.simple(trig, msg, "(f-_-)f"); break;
    // IMAGES
    case '!facepalm': dcf.picture(trig, msg, 'facepalm.jpg'); break;
    case '!could you not': dcf.picture(trig, msg, 'could you not.jpg'); break;
    case '!tiny violin': dcf.picture(trig, msg, 'tiny violin.jpg'); break;
    case "!I don't need it": dcf.picture(trig, msg, "I don't need it.jpg"); break;
    case "!got em": dcf.picture(trig, msg, "got 'em.jpg"); break;
    // SOUNDS
    case '!CENA': dcf.sound(trig, msg, 'CENA'); break;
    case '!bdt': dcf.sound(trig, msg, 'bdt'); break;
    case '!party': dcf.sound(trig, msg, 'party'); break;
    case '!yay': dcf.sound(trig, msg, 'yay'); break;
    case '!moan': dcf.sound(trig, msg, 'moan'); break;
    case '!ww': dcf.sound(trig, msg, 'wompwomp'); break;
    // SPAZCAT
    case '!angry': dcf.spaz(trig, msg, 'angry.png'); break;
    case '!cool': dcf.spaz(trig, msg, 'cool.png'); break;
    case '!cry': dcf.spaz(trig, msg, 'cry.png'); break;
    case '!happy': dcf.spaz(trig, msg, 'happy.png'); break;
    case '!love': dcf.spaz(trig, msg, 'love.png'); break;
    case '!meh': dcf.spaz(trig, msg, 'meh.png'); break;
    case '!omg': dcf.spaz(trig, msg, 'omg.png'); break;
    case '!sigh': dcf.spaz(trig, msg, 'sigh.png'); break;
    case '!sparkle': dcf.spaz(trig, msg, 'sparkle.png'); break;
    case '!teeth': dcf.spaz(trig, msg, 'teeth.png'); break;
    case '!tongue': dcf.spaz(trig, msg, 'tongue.png'); break;
    case '!wth': dcf.spaz(trig, msg, 'wth.png'); break;
    default:
    // USER
      if (msg.content.indexOf('!user ') === 0) dcf.user(trig, msg);
    // Auto Accept Invites
      if (msg.content.indexOf("https://discord.gg/") === 0) dcf.autojoin(trig, msg);
    // GAME
      if (msg.content.indexOf('!game ') === 0) dcf.game(trig, msg);
  };

});//MESSAGES

/* ----- NEW MEMBER ----- */
trig.on("serverNewMember", function(servObj, userObj){
  switch(servObj.name) {
    case "The Cat Cave":
      var str = "<@"+userObj.id+"> Welcome to The Cat Cave. This server it rated XXXX. All links are potentially NSFW!";
      var General = servObj.channels.get("name", "general");
      trig.sendMessage(General, str, callback);
    break;
    case "ArchCombat":
      var str = "<@"+userObj.id+"> Welcome to ArchCombat. Please visit #welcome for more information.";
      var General = servObj.channels.get("name", "general");
      trig.sendMessage(General, str, callback);
    break;
    default:
    //
  };
});

/* ----- VOICE JOIN ----- */
//first run
trig.on("voiceStateUpdate", function(chanObj, userObj){
  var str = userObj.username +" joined voice channel " + chanObj.name;
  console.log(str);
});//end trig voiceStateUpdate
//second+ run
trig.on("voiceJoin", function(chanObj, userObj){
  var str = userObj.username +" joined voice channel " + chanObj.name;
  console.log(str);
});//end trig voiceJoin*/


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
