//Cheerio is used for manipulating markup data structure.
//We feed the html of our url into cherrio and we can scrape
//required data from the markup
const cheerio = require('cheerio');
const request = require('request');

const callExternal = (query,callback) => {
    var search = query;
    console.log(search)
    const url = "https://twitter.com/hashtag/" + search + "?src=hash";
    request(url, function(err, res, body) {
        if(err) {
            return callback(err);
        } else {
            var tweetArray = [];
            let $ = cheerio.load(body);
            $('li.stream-item').each(function(index) {
                //var name = $(this).find('.fullname').text();
                //var tweet = $(this).find('p.tweet-text').text();
                tweetArray.push($(this).find('p.tweet-text').text());
                //console.log('user: ' + name);
                //console.log('tweet: ' + tweet);
                //append to json array
            });
            //return array
            return callback(tweetArray);
        }
    });
}

module.exports.callTweetAPI= callExternal;