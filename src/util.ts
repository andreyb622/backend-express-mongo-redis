import * as mongodb from 'mongodb';

export interface Model {
  _id: mongodb.ObjectId;
  lastUpdatedAt: Date;
  createdAt: Date;
  version: number;
}
export declare type Subtract<T, V> = Pick<T, Exclude<keyof T, keyof V>>;
export declare type CreateModel<M> = Subtract<M, Model>;
export declare type UpdateModel<M> = Partial<CreateModel<M>>;

export declare type FindModel<M> = Partial<M>;
