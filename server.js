var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var baseDirectory = __dirname;   // or whatever base directory you want

var port = 9615;

http.createServer(function (request, response) {
    try {
        var requestUrl = url.parse(request.url);

        // need to use path.normalize to make the directories in baseDirectory inaccessable
        var fsPath = baseDirectory+path.normalize(requestUrl.pathname);

        var fileStream = fs.createReadStream(fsPath);
        fileStream.pipe(response)
        .on('open', function() {
             response.writeHead(200);
        })
        .on('error',function(e) {
             response.writeHead(404);     // assume the file doesn't exist
             response.end();
        });
   } catch(e) {
        response.writeHead(500);
        response.end();     // end the response so browsers don't hang
        console.log(e.stack);
   }
}).listen(port); // CreateServer and listen to the allocated port

console.log("listening on port "+ port);