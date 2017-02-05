const cheerio = require('cheerio');
const request = require('request');
const baseUrl = 'https://developer.mozilla.org/en-US/search?q=';

// main: returns desc. and codesample
var getInfoOn = function(term) {
    return new Promise(function(resolve, reject) {
        request.getBody(baseUrl + term).then(function(body) {
            let articleLink = extractLink(body);
                request.getBody(articleLink).then(body => resolve(extractInfo(body)));
        })
    })
}

// returns HTML body of requested URL
request.getBody = function (url) { 
    return new Promise (function (resolve, reject) {
       request(url, (err, res, body) => {
            if (err) {
                resolve(err)
            }
            else resolve(body)
         })
    });
}

// returns Text and Code sample from HTML body
function extractInfo(body) {
    var res = {}
    body = cheerio.load(body);
    res.text = body('p', '#wikiArticle').text();
    res.code = body('pre', '#wikiArticle').first().text();
    res.title = body('h1').first().text();
    return res;
}
//add title search

//[class*=language-]

//returns Article link from body
function extractLink(body) {
    body = cheerio.load(body);
    return body('a[tabindex=1]', '.result-1').attr('href');
}

module.exports.getInfoOn = getInfoOn; 