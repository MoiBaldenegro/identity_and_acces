import { Injectable } from '@nestjs/common';
import { DomainEventBus } from '../../../modules/common/DomainEventBus';
import { EventSubscriber } from '../../../modules/common/DomainEventSubscriber';
import { EventBase } from '../../../modules/common/DomainEvent';

@Injectable()
export class RedisEventBus implements DomainEventBus {
  private readonly pubClient: any;
  private readonly subClient: any;

  constructor() {
    // Conceptual: this.pubClient = new Redis();
    // Conceptual: this.subClient = new Redis();
  }

  subscribe(subscriber: EventSubscriber): void {
    const eventName = subscriber.suscribeTo() as string;
    // Conceptual: this.subClient.subscribe(eventName);
    // Conceptual: this.subClient.on('message', (channel, message) => {
    //   if (channel === eventName) { subscriber.onEvent(message as any); }
    // });
  }

  unsubscribe(subscriber: EventSubscriber): void {
    const eventName = subscriber.suscribeTo() as string;
    // Conceptual: this.subClient.unsubscribe(eventName);
  }

  publish(event: EventBase): void {
    const eventName = event.getName() as string;
    // Conceptual: this.pubClient.publish(eventName, JSON.stringify(event));
  }
}
