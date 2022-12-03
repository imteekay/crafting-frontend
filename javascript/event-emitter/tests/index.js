import { EventEmitter } from '../index.js';

const eventEmitter = new EventEmitter();

const fn1 = (param1, param2) => console.log('test 1', param1, param2);

// subscribe the fn1 to the `test` event but it should run only once
eventEmitter.once('test', fn1);
eventEmitter.emit('test', 'param1', 'param2'); // log param1, param2
eventEmitter.emit('test', 'param1', 'param2'); // doesn't log anything

const fn2 = (param) => console.log('test 2', param);

// subscribe the fn2 to the `test2` event and it can be called multiple times
eventEmitter.on('test2', fn2);
eventEmitter.emit('test2', 'param1'); // log param1
eventEmitter.emit('test2', 'param2'); // log param2

// unsubscribe the fn2 to the `test2` event so it shouldn't be called anymore
eventEmitter.off('test2', fn2);
eventEmitter.emit('test2', 'param1'); // log param1
