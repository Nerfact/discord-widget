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
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<title>Discord iframe Widget</title>');
  res.write('<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">');
  res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>');
  res.write('<script type="text/javascript" src="http://discord.deliriousdrunkards.com/discord.min.js"></script>');
  res.write('<script type="text/javascript">');
  res.write('discordWidget.init({');
  res.write('serverId: \'' + req.query.id + '\',');
    //serverId: '51143782082543616',
    //title: 'Discord Widget Title',
    //join: false,
    //alphabetical: false,
    //theme: 'dark',
    //hideChannels: ['Channel Name 1', 'Channel Name 2'],
    //showAllUsers: true,
    //allUsersDefaultState: true
  res.write('});');
  res.write('discordWidget.render();');
  res.write('</script>');
  res.write('<div class="discord-widget"></div>');
  res.end();
});

var server = app.listen(3838, function() {
  console.log('Listening on port %d', server.address().port);
});
