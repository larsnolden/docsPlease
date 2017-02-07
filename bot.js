const Search = require('./search.js')
const Botkit = require('botkit')

var token = 'xoxb';

var controller = Botkit.slackbot({
    debug: true
})

var bot = controller.spawn({
    token: token
}).startRTM();

controller.on('direct_message,direct_mention,mention', function(bot, message) {
    Search.getInfoOn(message.text).then(res => {
        createSnippet(res.title, res.code, message.channel);
        listen(res);
    })

    var listen = function(res) {
        controller.hears(['more'], 'ambient', x => bot.reply(message, res.text))
    }
})

controller.hears(['derda'], 'ambient', function(bot, message) {
    bot.reply(message, 'Huh? 🤖');
})

/*
title: Title of snippet - string
code: code snippet that will be displayed - string
channel: channel code wher it will be posted - num
*/
function createSnippet(title, code, channel) {
    console.log(title, code, channel)
    return new Promise((resolve, reject) => {
        bot.api.files.upload({
            token: token,
            content: code,
            filetype: 'javascript',
            filename: title,
            channels: channel
        },function(err,response) {
            if(err) {
                console.log('fileError')
                reject(err)
            }
            else {
                console.log('file:', response)
                resolve(response.ok)
            }
        })
    })
}

controller.on('tick',i  => {});