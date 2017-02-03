var search = require('./search.js');
var Bot = require('slackbots');

// create Bot
var settings = {
    token: 'xoxb-136546456211-hu0sNM1MUUbUERzu5lMiJjbK',
    name: 'derda'
} 

var bot = new Bot(settings);

//Greeting
bot.on('start', function(data) {
    bot.postMessageToChannel('random', 'Hey there, I help you search MDN Docs!');
});

bot.on('message', function(message) {
    //do not respond to messages send by himself
    if(message.subtype === 'bot_message') console.log('its him himself')
    if(message.user && message.user != bot.self.id && message.type == 'message') {
        search.getInfoOn(message.text).then(text => bot.postMessageToChannel('random', formatOut(text)));
    }
});

//formats the MDN Doc text with Markdown properly
function formatOut(obj) {
    if(obj.text.length > 200) {
        obj.text = obj.text.slice(0, 200);
    }

    //obj.code = " `" + obj.code + "` ";
    return obj.text + '  \n' + obj.code;
}