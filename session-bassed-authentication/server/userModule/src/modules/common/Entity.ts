import { EventBase } from './DomainEvent';
import { ValidationException } from './exception/ValidationException';

const REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class Id {
  constructor(private readonly value: string) {
    if (!REGEX.test(value)) {
      throw new ValidationException('user id must be a valid UUID');
    }
  }

  getValue(): string {
    return this.value;
  }
}

export abstract class Entity<T> {
  id: Id;
  private events: EventBase[] = [];

  abstract equalsTo(entity: T): boolean;

  record(event: EventBase): void {
    this.events.push(event);
  }

  pullEvents(): EventBase[] {
    const domainEvents = this.events.slice();
    this.events = [];
    return domainEvents;
  }
}
