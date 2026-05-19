import { Module } from '@nestjs/common';
import { GlobalConfigModule } from './config/global-config.module';
import { SupabaseClientModule } from './persistence/supabase/supabase-client.module';

@Module({
  imports: [GlobalConfigModule, SupabaseClientModule],
  exports: [SupabaseClientModule],
})
export class GlobalModule {}
