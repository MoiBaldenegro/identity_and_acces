import { Entity } from 'src/modules/common/Entity';
import { UserModuleBuilder } from '../builder/ModuleBuilder';
import { ModuleName } from '../vo/ModuleName.vo';
import { ModulePermission, Permission } from '../vo/ModulePermission.vo';
import { UserModuleDTO } from '../dtos/UserModule.dto';

export class UserModule extends Entity<UserModule> {
  name!: ModuleName;
  permissions: Permission[] = [];

  constructor() {
    super();
  }

  public static create({ name, permissions }: UserModuleDTO): UserModule {
    return new UserModuleBuilder()
      .setName(name)
      .setPermissions(
        permissions.map((p) => ModulePermission.create(p).getValue()),
      )
      .setId()
      .build();
  }

  equalsTo(entity: UserModule): boolean {
    return this.name.getValue() === entity.name.getValue();
  }

  toPrimitives(): UserModuleDTO {
    return {
      name: this.name.getValue(),
      permissions: this.permissions,
    };
  }
}
