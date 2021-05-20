import * as config from 'config';
import * as jsonwebtoken from 'jsonwebtoken';
import { ObjectId } from 'bson';
import getRedis from '../helpers/getRedis';
import JWTRedis from '../helpers/JWTRedis';
import User from '../model/User';
import Payload from '../model/Payload';

const JWT_SECRET: string = config.get<string>('JWT_SECRET');

const redisClient = getRedis();

const jwtRedis = new JWTRedis(redisClient);

async function createAccesToken(payload: Payload): Promise<string> {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

function createRefreshToken(payload: Payload): Promise<string> {
  return jwtRedis.sign(payload, JWT_SECRET, { expiresIn: '240h' });
}

export async function createTokens(user: User): Promise<{
  accesToken: string;
  refreshToken: string;
}> {
  const payload: Payload = {
    jti: new ObjectId().toHexString(),
    userId: user._id.toHexString(),
  };
  const accesToken = await createAccesToken(payload);
  const refreshToken = await createRefreshToken(payload);
  return {
    accesToken,
    refreshToken,
  };
}

export async function desctroyRefreshToken(jti: string): Promise<void> {
  await jwtRedis.destroy(jti);
}

export function verifyRefrshToken(token: string): Promise<Payload> {
  return jwtRedis.verify(token, JWT_SECRET);
}

export async function verifyAccessToken(token: string): Promise<Payload> {
  return jsonwebtoken.verify(token, JWT_SECRET) as Payload;
}
