# Discord Widget
## Code Snippet
    <script type="text/javascript" src="http://discord.deliriousdrunkards.com/discord.min.js"></script>
    <script type="text/javascript">
        discordWidget.init({
            serverId: '51143782082543616',
            title: 'Discord Widget Title',
            join: false,
            alphabetical: false,
            theme: 'dark',
            hideChannels: ['Channel Name 1', 'Channel Name 2'],
            showAllUsers: true,
            allUsersDefaultState: true
        });
        discordWidget.render();
    </script>
    <div class="discord-widget"></div>

## Usage
Paste the snippet above into your site, and change the `serverId` parameter.
For more details, go [here](http://discord.deliriousdrunkards.com/).

## Screenshot
![](http://i.imgur.com/6zRoK2V.png)

## Changelog
#### 1.0
##### New Features
* Added version info to the widget to make troubleshooting issues on user sites easier.
* Started this changelog.
 
##### Bug Fixes
* N/A

## Help
If you run into trouble, let me know [here](https://github.com/RestingCoder/discord-widget/issues).
