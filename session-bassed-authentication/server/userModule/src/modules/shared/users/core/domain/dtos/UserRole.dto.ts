import { UserModuleDTO } from './UserModule.dto';

export interface UserRoleDTO {
  name: string;
  modules: UserModuleDTO[];
}
