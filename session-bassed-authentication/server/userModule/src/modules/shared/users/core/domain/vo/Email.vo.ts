import { ValueObject } from 'src/modules/common/ValueObject';
import { EMAIL_REGEX } from './constants/regex';

// Email
export class Email extends ValueObject<string> {
  constructor(email: string) {
    super(email, `Invalid Email Address: ${email}`);
  }

  protected validate(email: string) {
    return EMAIL_REGEX.test(String(email).toLowerCase());
  }

  static create(email: string): Email {
    return new Email(email);
  }
}
