import * as config from 'config';
import logger from './component/logger';
import createApp from './component/createApp';
import createServer from './component/createServer';

const app = createApp();
const server = createServer(app);

const PORT = config.get('PORT');

server.listen(PORT, () => {
  logger.info(`Server started on ported: ${PORT}`);
});
