import * as mongodb from 'mongodb';

import getMongoDb from '../component/getMongoDb';

import User from '../model/User';
import { CreateModel, UpdateModel } from '../util';

const db = getMongoDb();

function getCollection(): mongodb.Collection<User> {
  return db.collection('user');
}

export function find(query: mongodb.FilterQuery<User>): Promise<User | null> {
  return getCollection().findOne(query);
}

export function create(user: CreateModel<User>): Promise<User> {
  return getCollection()
    .insertOne({
      ...user,
      lastUpdatedAt: new Date(),
      createdAt: new Date(),
      version: 0,
    })
    .then((result) => {
      const foundedUser = result.ops[0];
      return foundedUser;
    });
}

export function updateById(
  userId: mongodb.ObjectId,
  user: UpdateModel<User>
): Promise<User | void> {
  return getCollection()
    .findOneAndUpdate(
      { _id: userId },
      { $set: { ...user, lastUpdatedAt: new Date() }, $inc: { version: 1 } },
      { returnOriginal: false }
    )
    .then((result) => {
      return result.value;
    });
}

export function deleteById(userId: mongodb.ObjectId, user: UpdateModel<User>) {
  return getCollection()
    .findOneAndUpdate({ _id: userId }, { $set: { ...user, deleted: true } })
    .then((result) => {
      return result.value;
    });
}
