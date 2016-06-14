var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<title>Discord iframe Widget</title>');
  res.write('<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">');
  res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>');
  res.write('<div id="container">');
  res.write('<p>Check your iframe widget settings <a href="http://discord.deliriousdrunkards.com">here</a>.</p>');
  res.write('</div>');
  res.end();
});

app.get('/render', function(req, res){
  var treeTop = '5px';
  var treeBottom = '70px';
  var usersOnlineBottom = '50px';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<title>Discord iframe Widget</title>');
  res.write('<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">');
  res.write('<style>body{font-family:Raleway;margin:0;}</style>');
  res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>');
  res.write('<script type="text/javascript" src="http://discord.deliriousdrunkards.com/discord.min.js"></script>');
  res.write('<script type="text/javascript">');
  res.write('discordWidget.init({');
  res.write('serverId: \'' + req.query.id + '\',');
  if (req.query.title){
    res.write('title: \'' + req.query.title + '\',');
    treeTop = '34px';
  }
  if (req.query.theme){
    res.write('theme: \'' + req.query.theme + '\',');
  }
  if (req.query.join){
    res.write('join: ' + req.query.join + ',');
    if (req.query.join == 'true') {
      treeBottom = '70px';
      usersOnlineBottom = '50px';
    } else {
      treeBottom = '20px';
      usersOnlineBottom = '5px';
    }
  }
  if (req.query.abc){
    res.write('alphabetical: ' + req.query.abc + ',');
  }
  if (req.query.showall){
    res.write('showAllUsers: ' + req.query.showall + ',');
  }
  if (req.query.shownick){
    res.write('showNick: ' + req.query.shownick + ',');
  }
  if (req.query.toggle){
    res.write('allUsersDefaultState: ' + req.query.toggle + ',');
  }
    //allUsersDefaultState: true
  res.write('});');
  res.write('discordWidget.render();');
  res.write('</script>');
  res.write('<div class="discord-widget" style="height:100%;margin:0"></div>');
  res.write('<style>.discord-fade{display:none;}.discord-join{position: absolute;bottom: 15px;width: auto;left:15px;right:15px;}.discord-tree{position: absolute;left: 15px;right:0;top:'+treeTop+';bottom:'+treeBottom+';overflow-y: auto;overflow-x: hidden;}.discord-users-online{position: absolute;bottom: '+usersOnlineBottom+';right: 15px;}</style>');
  res.end();
});

var server = app.listen(3838, function() {
  console.log('Listening on port %d', server.address().port);
});
