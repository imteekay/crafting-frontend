export class EventEmitter {
  events = {};

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [{ subscriber: 'on', fn }];
    } else {
      this.events[eventName].push({ subscriber: 'on', fn });
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      for (let fnObject of this.events[eventName]) {
        fnObject.fn(...args);

        if (fnObject.subscriber === 'once') {
          this.off(eventName, fnObject.fn);
        }
      }
    }
  }

  off(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (event) => event.fn !== fn
      );
    }
  }

  once(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [{ subscriber: 'once', fn }];
    } else {
      this.events[eventName].push({ subscriber: 'once', fn });
    }
  }
}
