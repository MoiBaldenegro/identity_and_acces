import { Permission } from '../vo/ModulePermission.vo';

export interface UserModuleDTO {
  name: string;
  permissions: Permission[];
}
