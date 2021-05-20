import * as expressWinston from 'express-winston';
import logger from '../helpers/logger';

export default () =>
  expressWinston.logger({
    winstonInstance: logger,
  });
