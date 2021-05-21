import * as mongodb from 'mongodb';
import logger from './logger';
import getMongoClient from './getMongoClient';

const client = getMongoClient();

const db = client.db('test');

db.on('authenticated', () => {
  logger.info('Db authenticated');
});
db.on('close', () => {
  logger.warn('Db close');
});

db.on('error', () => {
  logger.error('Db error');
});

db.on('parseError', () => {
  logger.error('Db parseError');
});

db.on('fullsetup', () => {
  logger.log('state', 'Db fullsetup');
});

db.on('reconnect', () => {
  logger.warn('Db reconnect');
});

db.on('timeout', () => {
  logger.warn('Db timeout');
});

export default (): mongodb.Db => db;
