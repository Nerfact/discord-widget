var discordWidget = discordWidget || (function(){
  var _params = {};

  return {
    init : function(Params) {
      Params.serverId = typeof Params.serverId !== 'undefined' ? Params.serverId : false;
      Params.title = typeof Params.title !== 'undefined' ? Params.title : false;
      Params.join = typeof Params.join !== 'undefined' ? Params.join : true;
      Params.alphabetical = typeof Params.alphabetical !== 'undefined' ? Params.alphabetical : false;
      Params.theme = typeof Params.theme !== 'undefined' ? Params.theme : 'light';
      Params.hideChannels = typeof Params.hideChannels !== 'undefined' ? Params.hideChannels : false;
      Params.showAllUsers = typeof Params.showAllUsers !== 'undefined' ? Params.showAllUsers : false;
      _params.serverId = Params.serverId;
      _params.title = Params.title;
      _params.join = Params.join;
      _params.alphabetical = Params.alphabetical;
      _params.theme = Params.theme;
      _params.hideChannels = Params.hideChannels;
      _params.showAllUsers = Params.showAllUsers;
    },
    render : function() {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "http://code.jquery.com/jquery-1.11.3.min.js";
      document.head.appendChild(s);

      s.onload = function () {
        if (_params.theme == 'dark') {
          $('head').append('<link rel="stylesheet" href="http://discord.knightsoftheblade.com/dark.min.css" type="text/css" />');
        } else {
          $('head').append('<link rel="stylesheet" href="http://discord.knightsoftheblade.com/light.min.css" type="text/css" />');
        }

        var url = 'http://discordapp.com/api/servers/' + _params.serverId + '/embed.json';

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            renderWidget(data, _params);
            $(".discord-allusers-toggle").click(function(){
              $(".discord-allusers").toggle(100, function(){
                if ($(this).is(':visible')) {
                  $(".discord-allusers-toggle").html('&#9662; Online Users');
                } else {
                  $(".discord-allusers-toggle").html('&#9656; Online Users');
                }
              });
            });
          }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function sortChannels(a, b) {
          if (a.position < b.position)
          return -1;
          if (a.position > b.position)
          return 1;
          return 0;
        }

        function renderChannel(name) {
          return '<li class="discord-channel">' + name + '</li><ul class="discord-userlist">';
        }
        function renderUser(member, channelId) {
          var gameName = '';
          if (member.game)
          gameName = ' - ' + member.game.name;
          if (member.channel_id == channelId) {
            if (member.status != 'online') {
              return '<li class="discord-user"><img src="' + member.avatar_url +
              '" class="discord-avatar"/><div class="discord-user-status discord-idle"></div>' +
              member.username + '<span>' + gameName + '</span></li>';
            } else {
              return '<li class="discord-user"><img src="' + member.avatar_url +
              '" class="discord-avatar"/><div class="discord-user-status discord-online"></div>' +
              member.username + '<span>' + gameName + '</span></li>';
            }
          }
          else {
            return '';
          }
        }

        function renderWidget(d, p) {
          var widgetElement = $('.discord-widget')[0];
          var defaultInnerHtml = '<ul class="discord-tree"></ul><p class="discord-users-online"></p><p class="discord-join"></p><div class="discord-fade"></div>';
          var formatted = '';
          var gameName = '';
          var treeElement, usersElement, joinElement;
          var channels, users, hideChannel;

          if (p.title !== false) {
            widgetElement.innerHTML = '<div class="discord-title"><h3>' + p.title + '</h3></div>' + defaultInnerHtml;
            treeElement = $('.discord-tree')[0];
          } else {
            widgetElement.innerHTML = defaultInnerHtml;
            treeElement = $('.discord-tree')[0];
            treeElement.style.marginTop = '0';
          }

          usersElement = $('.discord-users-online')[0];
          joinElement = $('.discord-join')[0];

          if (p.alphabetical) {
            channels = [];
            for (var i = 0; i < d.channels.length; i++) {
              hideChannel = false;
              for (var j = 0; j < p.hideChannels.length; j++) {
                if (d.channels[i].name.includes(p.hideChannels[j])) {
                  hideChannel = true;
                }
              }
              if (!hideChannel) {
                channels.push(d.channels[i]);
              }
            }

            for (var i = 0; i < channels.length; i++) {
              formatted += renderChannel(channels[i].name);
              for (var j = 0; j < d.members.length; j++) {
                formatted += renderUser(d.members[j], channels[i].id);
              }
              formatted += '</ul>';
            }
          } else {
            channels = [];
            for (var i = 0; i < d.channels.length; i++) {
              hideChannel = false;
              for (var j = 0; j < p.hideChannels.length; j++) {
                if (d.channels[i].name.includes(p.hideChannels[j])) {
                  hideChannel = true;
                }
              }
              if (!hideChannel) {
                channels.push(d.channels[i]);
              }
            }
            channels.sort(sortChannels);

            for (var i = 0; i < channels.length; i++) {
              formatted += renderChannel(channels[i].name);
              for (var j = 0; j < d.members.length; j++) {
                formatted += renderUser(d.members[j], channels[i].id);
              }
              formatted += '</ul>';
            }
          }

          if (p.showAllUsers) {
            formatted += '<li class="discord-channel discord-allusers-toggle">&#9662; Online Users</li><ul class="discord-userlist discord-allusers">';
            for (var j = 0; j < d.members.length; j++) {
              if (!d.members[j].channel_id) {
                formatted += renderUser(d.members[j]);
              }
            }
            formatted += '</ul>';
          }

          var discordJoin = '';
          if (d.instant_invite != 'null')
          discordJoin = '<p class="discord-join"><a href="' + d.instant_invite + '">Join Server</a></p>';

          treeElement.innerHTML = formatted;
          usersElement.innerHTML = 'Users Online: ' + d.members.length;
          if (p.join) {
            joinElement.innerHTML = discordJoin;
          } else {
            joinElement.style.display = 'none';
          }
        }
      }
    }
  };
}());
