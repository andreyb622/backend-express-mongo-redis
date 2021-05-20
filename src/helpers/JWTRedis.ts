import * as IORedis from 'ioredis';
import * as jsonwebtoken from 'jsonwebtoken';
import {
  Secret,
  SignOptions,
  GetPublicKeyOrSecret,
  VerifyOptions,
} from 'jsonwebtoken';

import TokenInvalidError from '../error/TokenInvalidError';
import TokenDestroyedError from '../error/TokenDestroyedError';

function generateId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export interface Options {
  prefix: string;
}

export default class JWTRedis {
  private readonly options: Options;

  private readonly redisClient: IORedis.Redis;

  constructor(redisClient: IORedis.Redis, options?: Options) {
    this.options = { prefix: 'jwt_label:', ...(options || {}) };
    this.redisClient = redisClient;
  }

  public sign = async <T extends object & { jti?: string }>(
    payload: T,
    secretOrPrivateKey: Secret,
    options?: SignOptions
  ): Promise<string> => {
    const jti = payload.jti ?? generateId(10);
    const token: string = jsonwebtoken.sign(
      { ...payload, jti },
      secretOrPrivateKey,
      options
    );
    const decoded: any = jsonwebtoken.decode(token);
    const key = this.options.prefix + jti;
    if (decoded.exp) {
      await this.redisClient.set(
        key,
        'true',
        'EX',
        Math.floor(decoded.exp - Date.now() / 1000)
      );
    } else {
      await this.redisClient.set(key, 'true');
    }
    return token;
  };

  public destroy = async (jti: string): Promise<boolean> => {
    const key = this.options.prefix + jti;
    return !!(await this.redisClient.del(key));
  };

  public verify<T extends object & { jti?: string }>(
    token: string,
    secretOrPublicKey: string | Buffer | GetPublicKeyOrSecret,
    options?: VerifyOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      return jsonwebtoken.verify(
        token,
        secretOrPublicKey,
        options,
        (err: Error | null, decoded: T) => {
          if (err) {
            return reject(err);
          }
          return resolve(decoded);
        }
      );
    }).then((decoded: T) => {
      if (!decoded.jti) {
        throw new TokenInvalidError();
      }
      const key = this.options.prefix + decoded.jti;
      return this.redisClient.get(key).then((result: string) => {
        if (!result) {
          throw new TokenDestroyedError();
        }
        return decoded;
      });
    });
  }
}
