import * as mongodb from 'mongodb';
import * as userDao from '../DAO/userDAO';
import User from '../model/User';
import { CreateModel, UpdateModel } from '../util';

export async function findById(id: mongodb.ObjectId): Promise<User | null> {
  return userDao.find({ _id: id });
}

export async function findByEmail(email: string): Promise<User | null> {
  return userDao.find({ email });
}

export async function create(user: CreateModel<User>): Promise<User> {
  return userDao.create(user);
}

export async function updateUserById(
  userId: mongodb.ObjectId,
  user: UpdateModel<User>
): Promise<User | void> {
  return userDao.updateById(userId, user);
}

export async function deleteUserById(
  userId: mongodb.ObjectId,
  user: UpdateModel<User>
) {
  return userDao.deleteById(userId, user);
}
