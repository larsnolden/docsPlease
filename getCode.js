const request = require("request")
const cheerio = require("cheerio")
const https = require("https")

var url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys';

request(url, (err, res, body) => { 
    body = cheerio.load(body);
    console.log(body('pre', '#wikiArticle').html());
})

var options = {
    hostname: 'https://slack.com/api/files.upload',
    mehtod: 'GET',
    header: ''
}