import * as express from 'express';
import * as authMaintainer from '../maintainer/authMaintainer';

export async function registration(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await authMaintainer.registration({
      email,
      password,
    });
    return res.status(201).send({
      user,
      tokens,
    });
  } catch (err) {
    return next(err);
  }
}

export async function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await authMaintainer.login({ email, password });
    return res.status(200).send({
      user,
      tokens,
    });
  } catch (err) {
    return next(err);
  }
}

export async function refreshTokens(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { refreshToken } = req.body;
    const { user, tokens } = await authMaintainer.refreshTokens({
      refreshToken,
    });
    return res.status(200).send({
      user,
      tokens,
    });
  } catch (err) {
    return next(err);
  }
}
