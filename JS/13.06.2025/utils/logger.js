// import fs from 'fs'; // for node.js

export class Logger {
    info(message)
    {
        console.log(`[INFO]: ${message}`);
    }
    error(message)
    {
        console.log(`[ERROR]: ${message}`);
    }
}
export class FileLogger { // for node.js
    constructor(filePath) {
        this.filePath = filePath;
    }
    info(message)
    {
        this.writeToFile(`[INFO]`, message);
    }
    error(message)
    {
        this.writeToFile(`[ERROR]`, message);
    }
    writeToFile(level, data)
    {
        const log = `${level}: ${data}\n`;
        fs.appendFileSync(this.filePath, log, `utf-8`)
    }
}

export class BrowserFileLogger {
    constructor(fileName) {
        this.fileName = fileName;
        this.logs = []
    }
    info(message)
    {
        this.logs.push(`[INFO]`, message)
    }
    error(message)
    {
        this.logs.push(`[ERROR]`, message)
    }
    downloadLOGS()
    {
        const blob = new Blob([this.logs.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = this.fileName;
        link.click();
        URL.revokeObjectURL(url);
    }
}