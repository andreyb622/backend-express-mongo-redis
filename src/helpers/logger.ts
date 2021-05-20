import * as winston from 'winston';
import * as config from 'config';

const LOG_LEVEL = config.get<string>('LOG_LEVEL');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
      format: winston.format.json(),
    }),
  ],
});

export default logger;
