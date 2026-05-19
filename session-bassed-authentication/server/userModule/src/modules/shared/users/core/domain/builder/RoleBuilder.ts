import { Id } from 'src/modules/common/Entity';
import { UserRole } from '../entities/UserRole.entity';
import { RoleName } from '../vo/RoleName.vo';
import { UserModuleDTO } from '../dtos/UserModule.dto';
import { UserModule } from '../entities/UserModule.entity';

export class UserRoleBuilder {
  private _newRole = new UserRole();

  constructor() {}

  setName(name: RoleName | string): UserRoleBuilder {
    this._newRole.name = typeof name === 'string' ? new RoleName(name) : name;
    return this;
  }

  setModules(modules: UserModuleDTO[]): UserRoleBuilder {
    const userModules = modules.map((m) => {
      const mod = UserModule.create(m);
      return mod;
    });
    this._newRole.modules = userModules;
    return this;
  }

  setId(id?: string | Id): UserRoleBuilder {
    if (!id) {
      this._newRole.id = new Id(crypto.randomUUID());
      return this;
    }
    this._newRole.id = typeof id === 'string' ? new Id(id) : id;
    return this;
  }

  build(): UserRole {
    if (!this._newRole.name) {
      throw new Error('Role name is required');
    }
    if (!this._newRole.id) {
      this._newRole.id = new Id(crypto.randomUUID());
    }
    return this._newRole;
  }
}
