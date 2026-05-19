import { UserRoleDTO } from './UserRole.dto';

export interface createUserDTO {
  userId: string;
  username: string;
  email: string;
  roles?: UserRoleDTO[];
}
