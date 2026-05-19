import { DomainEventSubscriber } from 'src/modules/common/DomainEventSubscriber';
import { User } from '../../domain/entities/User.aggregate';
import { UserCreated } from '../../domain/event/UserCreated.event';
import { DomainEvent } from 'src/modules/common/DomainEvent';
import { UserEmailProvider } from '../ports/outbound/EmailServiceProvider';

export class NotifyUserCreatedByEmail implements DomainEventSubscriber<User> {
  constructor(private readonly emailProvider: UserEmailProvider) {}

  async onEvent(event: DomainEvent<User>): Promise<void> {
    const user = event.getData();

    await this.emailProvider.send({
      to: user.email,
      message: `Congratulations your username is ${user.username}. you must to complete the register on ....`,
      sent: new Date(),
    });
  }

  suscribeTo(): string {
    return UserCreated.EVENT_NAME;
  }
}
