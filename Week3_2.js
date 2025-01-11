const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log("Request received:", request.url);
    const filePath = path.join(__dirname, request.url === '/' ? 'Week3_2.html' : request.url);
    const extName = String(path.extname(filePath)).toLowerCase();

    const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".jpg": "image/jpeg",
        ".png": "image/png"
    };

    const contentType = mimeTypes[extName] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile(path.join(__dirname, '404.html'), (err404, errorPage) => {
                    response.writeHead(404, { "Content-Type": "text/html" });
                    response.end('<h1>Error 404: Page not found</h1>');
                });
            } else {
                response.writeHead(500);
                response.end(`Server Error: ${err.code}`);
            }
        } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, 'utf-8');
        }
    });
});

const port = 3000; 

server.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
