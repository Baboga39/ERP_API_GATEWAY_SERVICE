const winston = require('winston');

// Format đơn giản, kèm service từ defaultMeta
const simpleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, service }) => {
    return `[${timestamp}] ${level} (${service || 'unknown'}): ${message}`;
  })
);

// Tạo logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  defaultMeta: { service: 'api-gateway' }, // << giữ lại như bạn cần
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        simpleFormat
      )
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: simpleFormat
    }),
    new winston.transports.File({
      filename: 'combined.log',
      format: simpleFormat
    })
  ]
});

module.exports = logger;
