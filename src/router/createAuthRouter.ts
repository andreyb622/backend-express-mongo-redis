import * as express from 'express';
import * as authController from '../controller/authController';

export default () => {
  const router = express.Router();
  router.post('/registration/email', authController.registration);
  router.post('/login', authController.login);
  router.post('/refreshTokens', authController.refreshTokens);
  return router;
};
