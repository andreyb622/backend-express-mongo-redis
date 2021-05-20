import * as http from 'http';
import * as express from 'express';

export default (app: express.Express): http.Server => http.createServer(app);
