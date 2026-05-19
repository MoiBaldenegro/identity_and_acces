import { ValueObject } from 'src/modules/common/ValueObject';

export class ModuleName extends ValueObject<string> {
  constructor(name: string) {
    super(name, `Invalid Module Name: ${name}`);
  }

  protected validate(name: string): boolean {
    if (!name) return false;
    if (name.trim().length === 0) return false;
    if (name.length > 50) return false;
    return true;
  }

  static create(name: string): ModuleName {
    return new ModuleName(name);
  }
}
