import { Email } from '../../domain/vo/Email.vo';

export interface EmailMessageDto {
  to: Email;
  message: string;
  sent: Date;
}
