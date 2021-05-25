import * as express from 'express';
import * as userService from '../service/userService';

export async function updateUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> {
  try {
    console.log(req);
    return res.send('123');
  } catch (err) {
    return next(err);
  }
}

export async function deleteUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> {
  try {
    console.log(req);
    return res.send('123');
  } catch (err) {
    return next(err);
  }
}
