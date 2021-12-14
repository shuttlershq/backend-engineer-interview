import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './config/app';
import { Vars } from './config/vars';
import { Server } from 'socket.io';
import { log } from './utils/logger';
import { getDbConfig } from './config/database.config';

createConnection({ type: 'postgres', ...getDbConfig })
  .then(() => {
    app.set('port', Vars.port || 8080);
    const server = app.listen(app.get('port'), '0.0.0.0', () => {
      log.info(`HTTP server listening on port ${Vars.port}`);
    });
    const io = new Server(server);
    io.on('connection', () => {
      console.log('Client connected');
    });
    app.locals.io = io;
  })
  .catch((error) => console.log(error));
