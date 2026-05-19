import { User } from '../entities/User.aggregate';
import { UserId } from '../vo/UserId';
import { Username } from '../vo/Username';
import { Email } from '../vo/Email.vo';
import { UserRole } from '../entities/UserRole.entity';

export class UserBuilder {
  private _newUser = new User();

  constructor() {}

  setUserId(userId: UserId | string): UserBuilder {
    this._newUser.userId =
      typeof userId === 'string' ? new UserId(userId) : userId;
    return this;
  }

  setUsername(username: Username | string): UserBuilder {
    this._newUser.username =
      typeof username === 'string' ? new Username(username) : username;
    return this;
  }

  setEmail(email: Email | string): UserBuilder {
    this._newUser.email = typeof email === 'string' ? new Email(email) : email;
    return this;
  }

  setConfirmed(confirmed: boolean): UserBuilder {
    this._newUser.confirmed = confirmed;
    return this;
  }

  setRoles(roles: UserRole[]): UserBuilder {
    this._newUser.roles = roles;
    return this;
  }

  build(): User {
    if (!this._newUser.userId) throw new Error('UserId is required');
    if (!this._newUser.username) throw new Error('Username is required');
    if (!this._newUser.email) throw new Error('Email is required');

    return this._newUser;
  }
}
