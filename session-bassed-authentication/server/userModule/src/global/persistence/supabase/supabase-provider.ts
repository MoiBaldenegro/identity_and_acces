// import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_PROVIDER } from './constants';

export const SupabaseProvider = {
  provide: SUPABASE_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const supabaseUrl = configService.get<string>('SUPABASE_URL');
    const supabaseKey = configService.get<string>('SUPABASE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or Key is missing');
    }

    return createClient(supabaseUrl, supabaseKey);
  },
};
