import { UserEmailProvider } from '../../core/application/ports/outbound/EmailServiceProvider';
import { EmailMessageDto } from '../../core/application/dtos/EmailMessage.dto';

export class ConsoleUserEmailProvider implements UserEmailProvider {
  async send(message: EmailMessageDto): Promise<void> {
    console.log('Sending email:', message);
  }
}
