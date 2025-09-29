// Main server file for Part B & part C combined 
const http = require('http');
const url = require('url');
const Utils = require('./modules/utils.js');
const FileService = require('./modules/fileService.js');

class ServerApplication {

    constructor() {

        this.utils = new Utils();
        this.files = new FileService();
        this.port = process.env.PORT || 3000; // Render injects PORT
    
    }

    start() {

        const server = http.createServer((req, res) => this.route(req, res));
        
        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    }

    route(req, res) {

        const parsed = url.parse(req.url, true);
        const pathname = parsed.pathname || '/';

        if (pathname === '/COMP4537/labs/3/getDate/') {
            this.handleGetDate(parsed, res);
        } else if (pathname === '/COMP4537/labs/3/writeFile/') {
            this.handleWriteFile(parsed, res);
        } else if (pathname === '/COMP4537/labs/3/readFile/file.txt') {
            this.handleReadFile(res);
        } else {
            this.send(res, 404, 'text/plain', '404 Not Found');
        }

    }

    handleGetDate(parsed, res) {

        const name = parsed.query?.name || 'Guest';
        const message = this.utils.getDate(name);
        
        this.send(res, 200, 'text/html', `<p style="color:blue">${message}</p>`);
    }

    handleWriteFile(parsed, res) {

        const text = parsed.query?.text;

        if (!text || !String(text).trim()) {
            this.send(res, 400, 'text/plain', 'Missing text query parameter');
            
            return;
        }

        this.files.appendLine(String(text), (err) => {
            if (err) this.send(res, 500, 'text/plain', 'Error writing to file');
            
            else this.send(res, 200, 'text/plain', `Appended "${text}" to file.txt`);
        });

    }

    handleReadFile(res) {

        if (!this.files.exists()) {

            this.send(res, 404, 'text/plain', '404 Not Found: file.txt');
            
            return;
        }

        this.files.readAll((err, data) => {

            if (err) this.send(res, 500, 'text/plain', 'Error reading file');
            
            else this.send(res, 200, 'text/plain', data);
        });

    }

    send(res, status, type, body) {
        
        res.writeHead(status, { 'Content-Type': type });
        res.end(body);

    }
}

new ServerApplication().start();
