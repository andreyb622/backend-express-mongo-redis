import * as bcrypt from 'bcrypt';
import * as mongodb from 'mongodb';
import * as userService from '../service/userService';
import * as jwtService from '../service/jwtService';
import ConsistencyError from '../error/ConsistencyError';
import User from '../model/User';

export async function registration({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  user: User;
  tokens: { accesToken: string; refreshToken: string };
}> {
  const emailUser = await userService.findByEmail(email);
  if (emailUser) {
    throw new Error('');
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const createdUser = await userService.create({ email, hashPassword });
  const tokens = await jwtService.createTokens(createdUser);
  return {
    user: createdUser,
    tokens,
  };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  user: User;
  tokens: {
    accesToken: string;
    refreshToken: string;
  };
}> {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw new ConsistencyError({});
  }
  const isMatch = bcrypt.compare(password, user.hashPassword);

  if (isMatch) throw new Error('unable to login');

  const tokens = await jwtService.createTokens(user);
  return {
    user,
    tokens,
  };
}

export async function refreshTokens({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<{
  user: User;
  tokens: {
    accesToken: string;
    refreshToken: string;
  };
}> {
  const payload = await jwtService.verifyRefrshToken(refreshToken);
  const user = await userService.findById(new mongodb.ObjectId(payload.userId));
  if (!user) {
    throw new ConsistencyError({});
  }
  await jwtService.desctroyRefreshToken(payload.jti);
  const tokens = await jwtService.createTokens(user);
  return {
    user,
    tokens,
  };
}
