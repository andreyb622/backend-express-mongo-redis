import logger from './helpers/logger';
import createApp from './helpers/createApp';
import createServer from './helpers/createServer';

const app = createApp();
const server = createServer(app);

const PORT = 8080;

server.listen(PORT, () => {
  logger.info(`Server started on ported: ${PORT}`);
});
