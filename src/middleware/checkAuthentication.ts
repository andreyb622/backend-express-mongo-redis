import * as jsonwebtoken from 'jsonwebtoken';
import * as express from 'express';
import * as config from 'config';
import * as userService from '../service/userService';
import * as jwtService from '../service/jwtService';
import JWTRedis from '../component/JWTRedis';
import Payload from '../model/Payload';

const JWT_KEY: string = config.get<string>('JWT_KEY');

export default async function checkAuthentication(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  try {
    const token: string = (req.headers['x-access-token'] ||
      req.headers.authorization?.split(' ')[1]) as string;
    const decoded: any = await jwtService.verifyAccessToken(token);

    const user = await userService.findById(decoded.userId);
    console.log(decoded.userId);
    console.log(123, user);

    // if (!user) {
    //   throw new Error();
    // }

    next();
  } catch {
    res.status(401).send({ message: 'not auth' });
  }
}
