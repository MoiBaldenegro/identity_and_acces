import { Module } from '@nestjs/common';
import { SupabaseUserRepository } from '../infrastructure/repositories/supabase-user-repository';
import { UserRepository } from './domain/ports/outbound/UserRepository';
import { UserApplicationImpl } from './application/services/UserApplicationImpl';
import { UserDomainService } from './domain/services/UserDomainService';
import { UserService } from './domain/services/userService';
import { SupabaseClientModule } from 'src/global/persistence/supabase/supabase-client.module';
import { NestEventBus } from 'src/global/infrastructure/events/NestEventBus';
import { NotifyUserCreatedByEmail } from './application/event-subcribers/NotifyUserCreatedByEmail';
import { ConsoleUserEmailProvider } from '../infrastructure/providers/ConsoleUserEmailProvider';
import { UserEmailProvider } from './application/ports/outbound/EmailServiceProvider';
import { DomainEventBus } from 'src/modules/common/DomainEventBus';
import { EventEmitter2 } from '@nestjs/event-emitter';

const repository = {
  provide: 'USER_REPOSITORY',
  useClass: SupabaseUserRepository,
};

const emailProvider = {
  provide: 'EMAIL_PROVIDER',
  useClass: ConsoleUserEmailProvider,
};

const eventBusProvider = {
  provide: 'EVENT_BUS',
  useFactory: (eventEmitter: EventEmitter2) => {
    return new NestEventBus(eventEmitter);
  },
  inject: [EventEmitter2],
};

const notifyUserCreatedSubscriber = {
  provide: 'NOTIFY_USER_CREATED_SUBSCRIBER',
  useFactory: (emailProvider: UserEmailProvider, eventBus: DomainEventBus) => {
    const subscriber = new NotifyUserCreatedByEmail(emailProvider);
    eventBus.subscribe(subscriber);
    return subscriber;
  },
  inject: ['EMAIL_PROVIDER', 'EVENT_BUS'],
};

const userService = {
  provide: 'USER_DOMAIN_SERVICE',
  useFactory: (userRepository: UserRepository) => {
    return new UserDomainService(userRepository);
  },
  inject: ['USER_REPOSITORY'],
};

const applicationService = {
  provide: 'USERS_APPLICATION_SERVICE',
  useFactory: (userService: UserService, eventBus: DomainEventBus) => {
    return new UserApplicationImpl(userService, eventBus);
  },
  inject: ['USER_DOMAIN_SERVICE', 'EVENT_BUS'],
};

const eventSubscribers = [notifyUserCreatedSubscriber];

const providers = [
  repository,
  emailProvider,
  eventBusProvider,
  userService,
  applicationService,
  ...eventSubscribers,
];

@Module({
  imports: [SupabaseClientModule],
  providers: [...providers],
  exports: [applicationService],
})
export class CoreModule {}
