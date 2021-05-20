import * as Promise from 'bluebird';
import { ObjectId } from 'bson';
import * as express from 'express';
import logger from '../helpers/logger';
import Payload from '../model/Payload';

export default () =>
  (
    err: Error,
    req: express.Request & { payload: Payload },
    res: express.Response,
    next: express.NextFunction
  ) => {
    const failureId = new ObjectId().toHexString();
    return Promise.reject(err)
      .then(() => {
        logger.warn(err.message, {
          meta: {
            failureId,
            name: err.name,
            message: err.message,
            stack: err.stack,
          },
        });
      })
      .catch((err: Error & { type?: string }) => {
        logger.error(err.message, {
          meta: {
            failureId,
            name: err.name,
            message: err.message,
            stack: err.stack,
          },
        });
        return res.status(500).json({
          error: {
            message: err.message,
            failureId,
          },
        });
      });
  };
