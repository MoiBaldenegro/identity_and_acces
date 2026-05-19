import { ValueObject } from 'src/modules/common/ValueObject';

export enum Permission {
  READ = 'READ',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export class ModulePermission extends ValueObject<Permission> {
  constructor(permission: Permission) {
    super(
      permission,
      `Invalid Permission: ${permission}: must be one of ${Object.values(Permission).join(', ')}`,
    );
  }

  protected validate(permission: Permission): boolean {
    return Object.values(Permission).includes(permission);
  }

  static create(permission: Permission): ModulePermission {
    return new ModulePermission(permission);
  }
}
