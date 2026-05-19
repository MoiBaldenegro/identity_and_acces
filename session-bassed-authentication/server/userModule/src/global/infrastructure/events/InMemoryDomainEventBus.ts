import { DomainEventBus } from '../../../modules/common/DomainEventBus';
import { EventSubscriber } from '../../../modules/common/DomainEventSubscriber';
import { EventBase } from '../../../modules/common/DomainEvent';

export class InMemoryDomainEventBus implements DomainEventBus {
  private subscribers: Map<string, EventSubscriber[]> = new Map();

  subscribe(subscriber: EventSubscriber): void {
    const eventName = subscriber.suscribeTo() as string;
    const currentSubscribers = this.subscribers.get(eventName) || [];
    this.subscribers.set(eventName, [...currentSubscribers, subscriber]);
  }

  unsubscribe(subscriber: EventSubscriber): void {
    const eventName = subscriber.suscribeTo() as string;
    const currentSubscribers = this.subscribers.get(eventName) || [];
    this.subscribers.set(
      eventName,
      currentSubscribers.filter((sub) => sub !== subscriber),
    );
  }

  publish(event: EventBase): void {
    const eventName = event.getName() as string;
    const eventSubscribers = this.subscribers.get(eventName) || [];

    eventSubscribers.forEach((subscriber) => {
      subscriber.onEvent(event);
    });
  }
}
