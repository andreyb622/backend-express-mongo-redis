import * as express from 'express';
import * as userController from '../controller/userController';

export default () => {
  const router = express.Router();
  router.put('/:id', userController.updateUser);
  router.delete('/:id', userController.deleteUser);
  return router;
};
