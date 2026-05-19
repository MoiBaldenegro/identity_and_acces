import { createUserDTO } from '../../domain/dtos/createUser.dto';

export interface UserApplicationService {
  registerNewUser(userData: createUserDTO): Promise<void>;
}
