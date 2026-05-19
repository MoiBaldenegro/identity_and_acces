import { Module } from '@nestjs/common';
import { SupabaseProvider } from './supabase-provider';
import { SUPABASE_PROVIDER } from './constants';

@Module({
  providers: [SupabaseProvider],
  exports: [SUPABASE_PROVIDER],
})
export class SupabaseClientModule {}
