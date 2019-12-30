var discord = require("discord.js");
var mongoose = require("mongoose");
var Canvas = require('canvas');
var botConfig = require('../botconfig.json');

let dbusername = botConfig.dbuser;
let dbpasswd = botConfig.dbpass;
mongoose.connect('mongodb+srv://' + dbusername + ':'+ dbpasswd +'@yukiko-pcvs8.mongodb.net/discordbot?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var Users = require('../model/xp.js')

module.exports.run = async (bot, message, args) => {


    //var canvas = Canvas.createCanvas(934, 282);
    //var ctx = canvas.getContext('2d');
    ////Get Background Image
    //var background = await Canvas.loadImage('https://cdn.asthriona.com/discordbotCard.jpg');
    //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //ctx.beginPath();
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    //ctx.fillRect(260, 80, 650, 130);
    //ctx.stroke();
    ////show Username
    //ctx.font = '60px sans-serif';
    //ctx.fillStyle = '#fff';
    //ctx.fillText(message.author.username, 280, 141);
    ////Show Avatar
    //var avatar = await Canvas.loadImage(message.author.displayAvatarURL);
    //ctx.beginPath();
    //ctx.arc(140, 128, 110, 0, Math.PI * 2);
    //ctx.closePath();
    //ctx.clip();
    //ctx.drawImage(avatar, 25, 15, 256, 256);
    ////Show Level & XP
    //ctx.font = '50px sans-serif';
    //ctx.fillStyle = '#fff';
    //ctx.fillText("You are level " + users.level +" - "+ users.xp + " XP", 280, 185);
    //var lvlimg = new discord.Attachment(canvas.toBuffer(), 'lvlup-image.png');
    //message.channel.send(lvlimg);
    
    //Temp New Cards

    Users.findOne({
        did: message.author
    }, (err, users) =>{
        if(err) console.log(err);

        let rankCard = new discord.RichEmbed()
        .setTitle(message.author.username+"'s rank card")
        .setColor("#800080")
        .setThumbnail(message.author.displayAvatarURL);
        if(!users){
            rankCard.addField("You are Level:", "0", true);
            rankCard.addField("You have:", "0xp", true);
            rankCard.addField("You send:", "0 Message", true);
            rankCard.setFooter(message.timestamp)
            return message.reply(rankCard);
        }else{
            rankCard.addField("You are level :", users.level, true)
            rankCard.addField("You have :", users.xp + "xp", true)
            rankCard.addField("You have send :", users.message + " message", true)
            rankCard.setFooter("Yukiko bot", bot.user.displayAvatarURL)
            return message.reply(rankCard);


        }

    });

    }
     
module.exports.help = {
    name: "rank",
    description: "Show... bot uptime? more or less."
}
