import * as IORedis from 'ioredis';
import logger from './logger';

const redisClient = new IORedis({
  host: 'redis-18852.c55.eu-central-1-1.ec2.cloud.redislabs.com',
  port: 18852,
  password: 'j4Ax0sSKWzYhjseEW3pa0s7ZPzYdveZ7',
});

redisClient.on('connect', () => {
  logger.log('info', 'StartAloneRedis connection open on REDIS_URL');
});

redisClient.on('ready', () => {
  logger.log('info', 'StartAloneRedis is ready');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
redisClient.on('error', (err: any) => {
  logger.error(`StartAloneRedis error: ${err.stack}`);
});

redisClient.on('close', () => {
  logger.warn('StartAloneRedis close');
});

redisClient.on('reconnecting', () => {
  logger.log('state', 'StartAloneRedis reconnecting');
});

redisClient.on('end', () => {
  logger.warn('StartAloneRedis end');
});

redisClient.on('select', () => {
  logger.log('state', 'StartAloneRedis select');
});

export default (): IORedis.Redis => redisClient;
