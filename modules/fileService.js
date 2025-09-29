// main file which handles all the files on server & its logic
const fs = require('fs');
const path = require('path');

class FileService {
    
    constructor() {
        this.filePath = path.join(process.cwd(), 'file.txt');
    }

    appendLine(text, cb) {
        fs.appendFile(this.filePath, `${text}\n`, (err) => cb(err));
    }

    readAll(cb) {
        fs.readFile(this.filePath, 'utf8', (err, data) => cb(err, data));
    }

    exists() {
        return fs.existsSync(this.filePath);
    }
}

module.exports = FileService;
