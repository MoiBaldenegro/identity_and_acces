import { createUserDTO } from '../../../../domain/dtos/createUser.dto';

export class CreateUserCommand {
  constructor(public readonly data: createUserDTO) {}
}
