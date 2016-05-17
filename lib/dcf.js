// discord functions
// ============
function callback(err) {if (err) throw err;};
module.exports = {
//SIMPLE
    simple: function(trig, msg, str) {
        trig.deleteMessage(msg, callback);
        trig.sendMessage(msg.channel, str, callback);
    },
//REPLY
    reply: function(trig, msg, str) {
        trig.deleteMessage(msg, callback);
        trig.reply(msg, str, callback);
    },
//PICTURE
    picture: function(trig,msg, image) {
      trig.deleteMessage(msg, callback);
      trig.sendFile(msg.channel, 'files/'+image, function(err){
        trig.sendMessage(msg.channel, msg.author.username, callback);
      });
    },
    spaz: function(trig, msg, image) {
      trig.deleteMessage(msg, callback);
      if (msg.author.username == "Spazcat" || msg.author.id === '93606599888740352') {
        trig.sendFile(msg.channel, 'files/spazcat/'+image, function(err){
          trig.sendMessage(msg.channel, msg.author.username, callback);
        });
      };
    },
//SOUND
    sound: function(trig, msg, sound) {
        var query = msg.author.username;
        var user = trig.internal.users.get('username', query);
        trig.deleteMessage(msg, callback);
        if (msg.author.voiceChannel && msg.author.voiceChannel.id) {
          var Voice = msg.author.voiceChannel;
          trig.joinVoiceChannel(Voice, function(err, con){
            con.playFile("files/"+sound+".mp3", {volume: 0.5}, function(err, intent){
              intent.on("end", function(err){ trig.leaveVoiceChannel(); });
            });
          });
        };
    },
//USER
    user: function(trig, msg) {
        var query = msg.content.slice(6, msg.content.length);
        var user = trig.internal.users.get('username', query);
        function userGameVoice() {
          if (user.game) trig.sendMessage(msg.channel, "game: "+user.game.name, callback);
          if (user.voiceChannel.name) trig.sendMessage(msg.channel, "voice channel: "+user.voiceChannel.server.name+" - "+user.voiceChannel.name, callback);
        };
        function userStatus(){ trig.sendMessage(msg.channel, "status: "+user.status, userGameVoice); };
        function userAvatar(){ trig.sendFile(msg.channel, user.avatarURL, userStatus); };
        if (user) {
          if (user.avatarURL) {
            userAvatar();
          } else { userStatus(); };
        };
    },
//GAME
    game: function(trig, msg) {
        var Query = msg.content.slice(6, msg.content.length);
        var query = Query.toLowerCase();
        var userlist = trig.users;
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
            trig.sendMessage(msg.channel, str, callback);
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
            trig.sendMessage(msg.channel, str, callback);
          };
        };
    },
    help: function(list) {
        var str = '```\n';
        list.forEach(function(item){ str += item+'\n'; });
        str+="```"; return str;
    },
    autojoin: function(msg) {
        trig.joinServer(msg.content, function(err, server) {
          console.log("joined server: "+server.name);
        });
    }

};
