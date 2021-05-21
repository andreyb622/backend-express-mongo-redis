import * as expressWinston from 'express-winston';
import logger from '../component/logger';

export default () =>
  expressWinston.logger({
    winstonInstance: logger,
  });
