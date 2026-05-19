import { EmailMessageDto } from '../../dtos/EmailMessage.dto';

export interface UserEmailProvider {
  send(notification: EmailMessageDto): Promise<void>;
}
