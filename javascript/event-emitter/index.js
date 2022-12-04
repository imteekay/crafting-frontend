export class EventEmitter {
  events = new Map();

  once(eventName, fn) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, [
        ...this.events.get(eventName),
        { subscriber: 'once', fn },
      ]);
    } else {
      this.events.set(eventName, [{ subscriber: 'once', fn }]);
    }
  }

  on(eventName, fn) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, [
        ...this.events.get(eventName),
        { subscriber: 'on', fn },
      ]);
    } else {
      this.events.set(eventName, [{ subscriber: 'on', fn }]);
    }
  }

  emit(eventName, ...args) {
    if (this.events.has(eventName)) {
      for (let fnObject of this.events.get(eventName)) {
        fnObject.fn(...args);

        if (fnObject.subscriber === 'once') {
          this.off(eventName, fnObject.fn);
        }
      }
    }
  }

  off(eventName, fn) {
    if (this.events.has(eventName)) {
      this.events.set(
        eventName,
        this.events.get(eventName).filter((event) => event.fn !== fn)
      );
    }
  }
}
