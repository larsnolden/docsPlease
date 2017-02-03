const Search = require('./search.js')
const Botkit = require('botkit')

var token = 'xoxb-136546456211-hu0sNM1MUUbUERzu5lMiJjbK';

var controller = Botkit.slackbot({
    debug: true
})

var bot = controller.spawn({
    token: token
}).startRTM();

controller.hears([''], 'direct_message,direct_mention,mention', function(bot, message) {
    Search.getInfoOn(message.text).then(res => bot.reply(message, res.code));
    bot.api.files.upload({
        token: token,
        content: 'bloede kuh',
        filetype: 'javascript',
        filename: 'res.title',
        channels: message.channel
    },function(err,response) {
        if(err) console.log(err)
        else console.log('upload: ' + response.ok)
    })
})

//get response in conversation.activate() to wait for async stuff to finish


controller.hears(['derda'], 'ambient', function(bot, message) {
    bot.reply(message, 'Huh? 🤖');
})

function replyQuery(message, res) {
    bot.reply(message, res.code);
}
