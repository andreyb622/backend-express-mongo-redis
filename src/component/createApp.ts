import * as responseTime from 'response-time';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as express from 'express';
import errorHandler from '../middleware/errorHandler';
import logger from '../middleware/logger';
import createBasicRouter from '../router/createBasicRouter';

export default (): express.Express => {
  const app = express();
  const basicRouter = createBasicRouter();
  app.use(helmet());
  app.use(cors());
  app.use(responseTime());
  app.use(express.json());
  app.use(logger());
  app.use('/api/v1', basicRouter);
  app.use(errorHandler());
  return app;
};
