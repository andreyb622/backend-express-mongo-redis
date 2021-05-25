import * as express from 'express';
import createAuthRouter from './createAuthRouter';
import createUserRouter from './createUserRouter';
import auth from '../middleware/checkAuthentication';

export default () => {
  const router = express.Router();
  const authRouter = createAuthRouter();
  const userRouter = createUserRouter();
  router.use('/auth', authRouter);
  router.use('/user', auth, userRouter);
  return router;
};
