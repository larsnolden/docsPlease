var search = require('./search.js');
var Bot = require('slackbots');

// create Bot
var settings = {
    token: '**',
    name: 'Boble'
} 

var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('random', 'Hey there, I help you search MDN Docs!');
});

bot.on('message', function(data) {
    bot.postMessageToChannel('random', 'response');
});

getInfoOn("Array").then(text => console.log(text));
