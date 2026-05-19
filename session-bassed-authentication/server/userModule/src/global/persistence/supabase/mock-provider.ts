import { fn } from 'jest-mock';
import { SUPABASE_PROVIDER } from './constants';

const mockClient = {
  from: fn().mockReturnThis(),
  select: fn().mockReturnThis(),
  eq: fn().mockReturnThis(),
  single: fn(),
};

export const mockSupabaseProvider = {
  provide: SUPABASE_PROVIDER,
  useValue: mockClient,
};
