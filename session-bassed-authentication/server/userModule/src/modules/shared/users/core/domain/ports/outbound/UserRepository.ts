import { UserDto } from '../../dtos/user.dto';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDto | null>;
  save(user: UserDto): Promise<void>;
}
