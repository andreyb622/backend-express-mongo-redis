import * as express from 'express';
import * as authController from '../controller/authController';

export default () => {
  const router = express.Router();
  router.post('/registration', authController.registration);
  router.post('/login', authController.login);
  return router;
};
