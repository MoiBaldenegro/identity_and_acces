export type EventId = string;
export type EventName = string;

function generateId() {
  return crypto.randomUUID();
}

export abstract class EventBase {
  constructor(
    readonly eventId: EventId,
    readonly ocurredOn: Date,
  ) {}

  abstract getName(): EventName;
}

export abstract class DomainEvent<T> extends EventBase {
  constructor(private readonly data: T) {
    super(generateId(), new Date());
  }

  getData(): T {
    return this.data;
  }
}
