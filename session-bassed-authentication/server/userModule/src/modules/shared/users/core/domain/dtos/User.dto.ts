import { UserRoleDTO } from './UserRole.dto';

export interface UserDto {
  userId: string;
  username: string;
  email: string;
  confirmed: boolean;
  roles: UserRoleDTO[];
}
