const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer((req, res)  => {
    var query = url.parse(req.url, true);
    var filename = query.pathname === '/' ? './index.html' : '.' + query.pathname + '.html';
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err != null) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            fs.readFile('./404.html', 'utf8', (err, data) => {
                if (err != null){
                    res.write('404 Not Found');
                } else {
                    res.write(data);
                }
                res.end();
            });
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(process.env.PORT || 8080);