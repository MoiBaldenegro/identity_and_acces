import { Module } from '@nestjs/common';
import { SupabaseClientModule } from 'src/global/persistence/supabase/supabase-client.module';
import { SupabaseUserRepository } from './repositories/supabase-user-repository';
import { UsersController } from './http-server/controllers/users.controller';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [SupabaseClientModule, CoreModule],
  providers: [SupabaseUserRepository],
  controllers: [UsersController],
})
export class InfrastructureModule {}
