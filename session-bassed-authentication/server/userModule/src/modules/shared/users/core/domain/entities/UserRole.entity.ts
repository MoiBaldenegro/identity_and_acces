import { Entity } from 'src/modules/common/Entity';
import { UserModule } from './UserModule.entity';
import { RoleName } from '../vo/RoleName.vo';
import { UserRoleBuilder } from '../builder/RoleBuilder';
import { UserRoleDTO } from '../dtos/UserRole.dto';

export class UserRole extends Entity<UserRole> {
  name!: RoleName;
  modules: UserModule[] = [];

  constructor() {
    super();
  }

  public static create(roleData: UserRoleDTO): UserRole {
    return new UserRoleBuilder()
      .setName(roleData.name)
      .setModules(roleData.modules)
      .setId()
      .build();
  }

  equalsTo(entity: UserRole): boolean {
    return this.name === entity.name;
  }

  toPrimitives(): UserRoleDTO {
    return {
      name: this.name.getValue(),
      modules: this.modules.map((m) => m.toPrimitives()),
    };
  }
}
