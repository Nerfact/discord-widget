var discordWidget = discordWidget || (function(){
  var _params = {};

  return {
    init : function(Params) {
      _params = Params;
    },
    render : function() {
      appendCssFile('http://discord.knightsoftheblade.com/style.min.css', 'css')
      var url = 'http://discordapp.com/api/servers/' + _params.serverId + '/embed.json';

      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var data = JSON.parse(xmlhttp.responseText);
          renderWidget(data, _params.font);
        }
      }
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    }
  };

  function renderWidget(d, f) {
    var formatted = '';
    var gameName = '';

    for (var i = 0; i < d.channels.length; i++) {
      formatted += '<li class="discord-channel">' + d.channels[i].name + '</li><ul class="discord-userlist">';
      for (var j = 0; j < d.members.length; j++) {
        gameName = '';
        if (d.members[j].game)
        gameName = ' - ' + d.members[j].game.name;
        if (d.members[j].channel_id == d.channels[i].id) {
          if (d.members[j].status != 'online') {
            formatted += '<li class="discord-user"><img src="' + d.members[j].avatar_url +
            '" class="discord-avatar"/><div class="discord-user-status discord-idle"></div>' +
            d.members[j].username + '<span>' + gameName + '</span></li>';
          } else {
            formatted += '<li class="discord-user"><img src="' + d.members[j].avatar_url +
            '" class="discord-avatar"/><div class="discord-user-status discord-online"></div>' +
            d.members[j].username + '<span>' + gameName + '</span></li>';
          }
        }
      }
      formatted += '</ul>';
    }

    var discordJoin = '';
    if (d.instant_invite != 'null')
    discordJoin = '<p class="discord-join"><a href="' + d.instant_invite + '">Join Server</a></p>';

    document.getElementsByClassName('discord-tree')[0].innerHTML = formatted;
    document.getElementsByClassName('discord-users-online')[0].innerHTML = 'Users Online: ' + d.members.length;
    document.getElementsByClassName('discord-join')[0].innerHTML = discordJoin;
  }
  function appendCssFile(filename, filetype){
    if (filetype=="css"){
      var fileref=document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}());
