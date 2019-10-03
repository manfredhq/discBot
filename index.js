const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
var fs = require('fs');

//Connection a la BDD

const db_server = "XXXXX";
const db_name = "XXXX";
const db_password = "XXXX";

const bdd_co = mysql.createConnection({
    host: db_server,
    user: db_name,
    password: db_password,
    database: db_name
});

var userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
var channel_selected = JSON.parse(fs.readFileSync('storage/channel_selected.json', 'utf8'));

const token = 'XXXXXX';

const PREFIX = "!!";
var version = "1.0.0";


bot.on('ready', () => {
    console.log('This bot is online !');
})

bot.on('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    var sender = message.author;

    switch(args[0]){
        case 'ping':
            message.channel.send("pong");
            break;
        case 'website':
            message.channel.send("http://little-rpg.fr/workshop/beeleave/public/index.php?statut=accueil");
            break;
        case 'info':
            if (args[1]=== 'version'){
                message.channel.send('version ' + version);
            } else {
                message.channel.send("you must enter another argument (ex: version)");
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('error define another arg')
            message.channel.bulkDelete(args[1]);
            break;
        case 'setchannel':
                channel_selected["selected"] = {
                    selected: message.channel.name
                }
            fs.writeFile("Storage/channel_selected.json", JSON.stringify(channel_selected), (err) => {
                if (err) console.error(err);
            })
            break;
    }
    if (message.channel.name == channel_selected["selected"]["selected"]){
        console.log('if success');
        userData[sender.id] = {
            message: message.content,
            username: sender.tag,
            channel: message.channel.name
        }
        
        //La querry que je veut faire

        /*var querry = "Insert into DMessage Values ('" + sender.tag + "' '" + message.content + "')";
        console.log(querry);
        bdd_co.connect(function(err) {
            if (err) throw err;
            bdd_co.query(querry, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
          });*/

        fs.writeFile("Storage/userData.json", JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        })
    }
    console.log('if ended');
})

bot.login(token);