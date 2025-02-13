// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

http.createServer(function(req, res){
	var urlObj = url.parse(req.url, true);
	var pathName = urlObj.pathname;
	if(pathName == '/'){
		var filePath = path.join(__dirname, '/index.html');
		fs.readFile(filePath, function(err, data){
			if(err){
				console.log(err);
			}else{
				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(data);
			}
		})
	}else if(pathName == '/getComments'){
		var json = JSON.stringify(comments);
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end(json);
	}else if(pathName == '/addComment'){
		var comment = urlObj.query;
		comments.push(comment);
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end('{"status": 1, "message": "success"}');
	}else{
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end('404 Not Found');
	}
}).listen(3000, function(){
	console.log('Server is running at port 3000');
});