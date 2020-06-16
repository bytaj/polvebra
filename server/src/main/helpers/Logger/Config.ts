import {createLogger, format, transports} from 'winston';

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `[${level.toUpperCase()}] ${timestamp}: ${message}`;
});

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.splat(),
        format.simple(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: './log/error.log', level: 'error' }),
        new transports.File({ filename: './log/info.log'})
    ]
});

export default logger;