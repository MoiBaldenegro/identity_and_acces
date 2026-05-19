import { ValueObject } from 'src/modules/common/ValueObject';

export class RoleName extends ValueObject<string> {
  constructor(private readonly name: string) {
    super(name, `Invalid Role Name: ${name}`);
  }

  protected validate(name: string): boolean {
    if (!name) return false;
    if (name.trim().length === 0) return false;
    if (name.length > 50) return false;
    return !!name && name.trim().length > 0;
  }
}
