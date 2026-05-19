import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js/dist/index.cjs';
import { SUPABASE_PROVIDER } from 'src/global/persistence/supabase/constants';
import { UserRepository } from '../../core/domain/ports/outbound/UserRepository';
import { UserDto } from '../../core/domain/dtos/user.dto';

@Injectable()
export class SupabaseUserRepository implements UserRepository {
  constructor(
    @Inject(SUPABASE_PROVIDER) private readonly client: SupabaseClient,
  ) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }

    return data ?? null;
  }

  async save(user: UserDto): Promise<void> {
    const { error } = await this.client.from('users').insert({
      id: user.userId,
      username: user.username,
      email: user.email,
      passwordHash: 'Se me olvido la contrasenha hahaha',
      roles: user.roles,
    });

    if (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user');
    }
  }
}
