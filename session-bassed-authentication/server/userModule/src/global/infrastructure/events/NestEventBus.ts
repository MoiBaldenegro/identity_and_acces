import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEventBus } from '../../../modules/common/DomainEventBus';
import { EventSubscriber } from '../../../modules/common/DomainEventSubscriber';
import { EventBase } from '../../../modules/common/DomainEvent';

export class NestEventBus implements DomainEventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  subscribe(subscriber: EventSubscriber): void {
    const eventName = subscriber.suscribeTo() as string;
    this.eventEmitter.on(eventName, (event: EventBase) => {
      subscriber.onEvent(event);
    });
  }

  unsubscribe(subscriber: EventSubscriber): void {
    const eventName = subscriber.suscribeTo() as string;
    this.eventEmitter.removeListener(eventName, subscriber.onEvent as any);
  }

  publish(event: EventBase): void {
    const eventName = event.getName() as string;
    this.eventEmitter.emitAsync(eventName, event);
  }
}
