import * as mongodb from 'mongodb';
import * as config from 'config';
import * as deasync from 'deasync';
import logger from './logger';

const MONGO_URL = config.get<string>('MONGODB_URL');

const client = new mongodb.MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 80,
});

let done = false;
const timeout = setTimeout(() => {
  done = true;
  logger.error('Mongodb time error');
}, 20000);

client.connect((err) => {
  clearTimeout(timeout);
  if (err) {
    logger.error(err);
  } else {
    logger.info('Mongo connected');
  }
  done = true;
});
deasync.loopWhile(() => {
  return !done;
});

export default (): mongodb.MongoClient => client;
