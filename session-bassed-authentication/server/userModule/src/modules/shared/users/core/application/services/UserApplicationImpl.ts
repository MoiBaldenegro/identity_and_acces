import { DomainEventBus } from 'src/modules/common/DomainEventBus';
import { createUserDTO } from '../../domain/dtos/createUser.dto';
import { UserService } from '../../domain/services/userService';
import { UserApplicationService } from './userApplicationService';

export class UserApplicationImpl implements UserApplicationService {
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: DomainEventBus,
  ) {}

  async registerNewUser(userData: createUserDTO): Promise<void> {
    const user = await this.userService.create(userData);
    user.pullEvents().forEach((event) => {
      this.eventBus.publish(event);
    });
  }
}
