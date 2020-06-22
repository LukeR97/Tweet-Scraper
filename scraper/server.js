const http = require('http');
//Get the required function to use from index.js
const callTweetAPI = require('./index');
const port = 3007;
var resArray = [];

//db variables
const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'user',
      database: 'tweets',
      password: 'password',
      multipleStatements: true
});

function mysql_real_escape_string (str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
          case "\0":
              return "\\0";
          case "\x08":
              return "\\b";
          case "\x09":
              return "\\t";
          case "\x1a":
              return "\\z";
          case "\n":
              return "\\n";
          case "\r":
              return "\\r";
          case "\"":
          case "'":
          case "\\":
          case "%":
              return "\\"+char; // prepends a backslash to backslash, percent,
                                // and double/single quotes
      }
  });
}

function removeEmojis (str) {
  return str.replace(/[^\x00-\x7F]/g, "");
}


conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
  var sql = "CREATE TABLE IF NOT EXISTS `tweet` (`tweets` LONGTEXT)";
  conn.query(sql, function(err){
    if (err) throw err;
    console.log("Table created")
  })
})

http.createServer((req, res ) => {
    //Setting CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Access-Control-Request-Method', '*');
	  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    //browser always sends OPTIONS request first so deal with that
    //then deal with real request
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
    }
    //Browser targeting http://localhost:3007/search
    else if(req.url == "/search"){
        let query = '';
        //Extract the data from the request body and store in query
        req.on('data', chunk => {
            query += chunk;
        });
        //When the request ends, parse the data in query to json
        //Then get the key value from json and pass this to our callback function
        req.on('end', () => {
            var parsed = JSON.parse(query);
            var querytoSearch = parsed.query;
            console.log(querytoSearch);
            callTweetAPI.callTweetAPI(querytoSearch, function(response) {
                res.write(JSON.stringify(response));
                res.end(conn.connect(err => {
                  if (err) {
                    console.log("not connected due to error: " + err);
                  } else {
                    console.log("connected ! connection id is " + conn.threadId);
                    console.log(resArray);
                    var insert = "INSERT INTO `tweet` (`tweets`) VALUES (?)";
                    
                    response.forEach(function (item, index) {
                      console.log(item, index);
                      item = mysql_real_escape_string(item);
                      item = removeEmojis(item);
                      conn.query(insert, item, function (err, result) {
                        if (err) throw err;
                        console.log("record inserted: " + result.affectedRows);
                      });
                    });
                    console.log(err);
                  }
                }));
            });
        });
    }
}).listen(port);
