import * as express from 'express';
import createAuthRouter from './createAuthRouter';

export default () => {
  const router = express.Router();
  const authRouter = createAuthRouter();
  router.use('/auth', authRouter);
  return router;
};
