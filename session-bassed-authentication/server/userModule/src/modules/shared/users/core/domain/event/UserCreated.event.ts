import { DomainEvent } from 'src/modules/common/DomainEvent';
import { User } from '../entities/User.aggregate';

export class UserCreated extends DomainEvent<User> {
  static EVENT_NAME = 'user-ms.user-created';

  constructor(user: User) {
    super(user);
  }

  getName(): string {
    return UserCreated.EVENT_NAME;
  }
}
