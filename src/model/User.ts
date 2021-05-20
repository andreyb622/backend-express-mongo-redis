import * as mongodb from 'mongodb';

type User = {
  _id: mongodb.ObjectId;
  lastUpdatedAt: Date;
  createdAt: Date;
  version: number;
  hashPassword: string;
  email: string;
};

export default User;
