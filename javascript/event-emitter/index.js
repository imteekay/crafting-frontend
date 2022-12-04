export class EventEmitter {
  events = new Map();

  once(eventName, fn) {
    this._subscribe(eventName, fn, 'once');
  }

  on(eventName, fn) {
    this._subscribe(eventName, fn, 'on');
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

  _subscribe(eventName, fn, type) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, [
        ...this.events.get(eventName),
        { subscriber: type, fn },
      ]);
    } else {
      this.events.set(eventName, [{ subscriber: type, fn }]);
    }
  }
}
