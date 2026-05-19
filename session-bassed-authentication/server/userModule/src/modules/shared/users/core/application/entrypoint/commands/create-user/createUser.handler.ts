import { UserService } from '../../../../domain/services/userService';
import { CreateUserCommand } from './createUser.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private userService: UserService) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { data } = command;
    await this.userService.create(data);
  }
}
