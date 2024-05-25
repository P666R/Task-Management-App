import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, prettyPrint } = format;

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'backend/logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

export const systemLogs = createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    prettyPrint(),
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      level: 'error',
      filename: 'backend/logs/error.log',
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'backend/logs/exception.log' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'backend/logs/rejections.log' }),
  ],
});

export const morganMiddleware = morgan(
  (tokens, req, res) =>
    JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)),
    }),
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        systemLogs.http(`incoming-request`, data);
      },
    },
  },
);
