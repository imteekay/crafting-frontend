import { EventEmitter } from '../index.js';

const eventEmitter = new EventEmitter();

const fn1 = (param1, param2) => console.log('test 1', param1, param2);

eventEmitter.once('test', fn1);
eventEmitter.emit('test', 'param1', 'param2'); // log param1, param2
eventEmitter.emit('test', 'param1', 'param2'); // doesn't log anything

eventEmitter.on('test2', (param) => console.log('test 2', param));
eventEmitter.emit('test2', 'param1'); // log param1
eventEmitter.emit('test2', 'param2'); // log param2
