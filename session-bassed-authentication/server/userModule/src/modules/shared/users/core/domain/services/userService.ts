import { createUserDTO } from '../dtos/createUser.dto';
import { User } from '../entities/User.aggregate';

export interface UserService {
  create(userData: createUserDTO): Promise<User>;
}
