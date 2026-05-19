import { createUserDTO } from '../dtos/createUser.dto';
import { User } from '../entities/User.aggregate';
import { UserRepository } from '../ports/outbound/UserRepository';
import { UserService } from './userService';

export class UserDomainService implements UserService {
  constructor(private userRepository: UserRepository) {}

  async create(userData: createUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const newUser = User.create(userData);
    await this.userRepository.save(newUser.toPrimitives());
    return newUser;
  }
}
