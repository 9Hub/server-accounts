import 'babel-polyfill';
import log4js from 'log4js';
import { System } from './components/system';
import { MongoDB } from './components/mongo';
import { Socket } from './components/socket';

let logger = log4js.getLogger('app');
logger.level = 'debug';

let system = new System();

MongoDB.start()
.then(() => {
  logger.info('database connect successfully');
  return MongoDB.loadModels(__dirname);
})
.then(() => {
  logger.info('mongo models were loaded');
  return system.loadModules(__dirname);
})
.then(() => {
  logger.info('modules were loaded');
  return system.start();
})
.then((server) => {
  Socket.init(server);
  logger.info('server started at port: ' + system.port);
})
.catch((err) => {
  logger.error(err);
});
