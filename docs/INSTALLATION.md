## Self hosting the bot
Want to host the bot yourself, if not [invite him](https://discord.com/oauth2/authorize?client_id=775412494235729960&permissions=6441790847&redirect_uri=https%3A%2F%2Fdiscord.gg%2FMsJ99j5Bcv&response_type=code&scope=connections%20guilds.join%20identify%20bot)?

>Support will only be given on errors done by the base source code. (No edits to the code.)
### Installation

First of all, make sure you have downloaded:
 * [Node.js](https://nodejs.org/en/). (Version 12 or higher)
 * NPM (Normally comes with Node.js)
 * [MongoDB](https://www.mongodb.com/) (This can be a local server or one hosted by them)
 * [git](https://git-scm.com/) (optional).

Now, clone this repository by
downloading or running the command `git clone https://github.com/Discord-Avengers-Assemble-Server/Avengers-Assemble.git`.

Next run the following commands:
```
$ cd Avengers-Assemble
$ npm install
```
This will install all the correct dependencies needed to run the bot. (This might take some time depending on your host's speed)


### Configuring the config file

Find the file `src/config.js`, this is where all your information will go.
* The API's are highly recommended to fill in but are optionally (If you have a missing API, the command it  to will not work.)
* `disabledCommands` & `disabledPlugins` is if you want to notload any commands or command categories.
* `DiscordBotLists` does not mean anything right now, fill them in if you want.
* `SupportServer` will match the support server for your bot.
* `websiteURL` will match your bot's dashboard, If you want don't have one use `https://localhost`.
* `defaultSettings` are the settings the bot will use when in DM's.
* `emojis` are for custom emojis.
* `MongoDBURl` where your MongoDB URL will go. (This is VITAL, you need it for the bot to work, **please also remember to replace <password> with your actual password**)

### Running the bot
Once the config file has been filled out, you will need to run the Lavalink.jar file in /Lavalink. This will allow the bot to play music.

If you are running the Lavalink.jar on a different server you will need the IP of that server, this IP will need to be entered in `src/base/Audio-Manager.js` in the Nodes array.

More information on lavalink can be [found here.](https://github.com/Frederikam/Lavalink)
After you have filled out your config file and ran the lavalink server; you can run the following command:
```
$ node .
```

## Extra information

**NOTE**: Running the bot with a process manager (like [PM2](https://discordjs.guide/improving-dev-environment/pm2.html)) is recommended.

>This bot must be run on a Discord bot account. Do NOT try to run this on a normal user account. This is against the Discord [Terms of Service](https://discord.com/terms).

>Also, do NOT play with the `eval` command, unless you know what you are doing.
