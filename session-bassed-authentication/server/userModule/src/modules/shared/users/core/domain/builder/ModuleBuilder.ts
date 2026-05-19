import { Id } from 'src/modules/common/Entity';
import { UserModule } from '../entities/UserModule.entity';
import { ModuleName } from '../vo/ModuleName.vo';
import { Permission } from '../vo/ModulePermission.vo';

export class UserModuleBuilder {
  private _newModule = new UserModule();

  constructor() {}

  setName(name: string | ModuleName): UserModuleBuilder {
    this._newModule.name =
      typeof name === 'string' ? ModuleName.create(name) : name;
    return this;
  }

  setPermissions(permissions: Permission[]): UserModuleBuilder {
    this._newModule.permissions = permissions;
    return this;
  }

  setId(id?: string | Id): UserModuleBuilder {
    if (!id) {
      this._newModule.id = new Id(crypto.randomUUID());
      return this;
    }
    this._newModule.id = typeof id === 'string' ? new Id(id) : id;
    return this;
  }

  build(): UserModule {
    if (!this._newModule.name) {
      throw new Error('Module name is required');
    }
    if (!this._newModule.id) {
      this._newModule.id = new Id(crypto.randomUUID());
    }
    return this._newModule;
  }
}
