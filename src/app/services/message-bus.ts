export class MessageBus {
  private observers: [Object, (obj: any) => any][];

  constructor() {
    this.observers = new Array(0);
  }

  publish<T>(obj: T) {
    this.observers.forEach((observer) => {
      if (obj.constructor.name === observer[0].constructor.name) {
        observer[1](obj);
      }
    });
  }

  observe<T>(obj: T, action: (obj: T) => any) {
    this.observers.push([obj, action]);
  }
}
