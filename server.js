const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  // Serve index.html
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 - File not found');
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
    });
  }
  
  // Serve styles.css
  else if (req.url === '/styles.css') {
    fs.readFile('styles.css', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 - File not found');
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      }
    });
  }
  
  // Serve script.js
  else if (req.url === '/script.js') {
    fs.readFile('script.js', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 - File not found');
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      }
    });
  }
  
  // Serve JPG files
  else if (req.url.match(/\.jpg$/)) {
    const imagePath = path.join(__dirname, req.url);
    const imageStream = fs.createReadStream(imagePath);

    imageStream.on('open', () => {
      res.setHeader('Content-Type', 'image/jpeg');
      imageStream.pipe(res);
    });

    imageStream.on('error', () => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 404;
      res.end('404 - File not found');
    });
  }
  
  // Serve 404 page for all other requests
  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('404 - File not found');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
