const fs = require('fs');
const path = require('path');

class Log {
    static info(message) {
        this.writeLog('INFO', message);
    }

    static error(message) {
        this.writeLog('ERROR', message);
    }

    static writeLog(level, message) {
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        const logFilePath = path.join(logDir, 'app_log.log');
        const logMessage = `[${new Date().toISOString()}] [${level}] - ${message}\n`;

        fs.appendFileSync(logFilePath, logMessage);
        console.log(logMessage);
    }
}

module.exports = Log;
